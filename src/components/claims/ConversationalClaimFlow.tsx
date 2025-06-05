
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Send, Camera, Upload, FileText, CheckCircle, Bot, User, ArrowRight, Play, Pause, MessageSquare, Euro, Clock, TrendingUp, AlertTriangle } from 'lucide-react';
import AIAssistant from './AIAssistant';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  isVoice?: boolean;
}

interface ClaimData {
  // Fahrzeugdaten
  vehicleMake: string;
  vehicleModel: string;
  licensePlate: string;
  vin: string;
  driverName: string;
  driverRelation: string;
  
  // Unfalldaten
  accidentDate: string;
  accidentTime: string;
  accidentLocation: string;
  weather: string;
  roadConditions: string;
  
  // Dritte Partei
  thirdPartyName: string;
  thirdPartyAddress: string;
  thirdPartyPhone: string;
  thirdPartyVehicle: string;
  thirdPartyLicense: string;
  thirdPartyInsurance: string;
  thirdPartyPolicyNumber: string;
  
  // Unfallhergang
  description: string;
  
  // Schäden
  damages: string[];
  
  // Behördliche Aufnahme
  policeStation: string;
  caseNumber: string;
  officers: string;
  
  // Zeugen
  witnesses: Array<{
    name: string;
    phone: string;
    statement: string;
  }>;
  
  // Uploads
  photos: string[];
  documents: string[];
  
  // Status
  completed: boolean;
  currentStep: string;
}

const ConversationalClaimFlow = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hallo! Es tut mir leid zu hören, dass Sie einen Unfall hatten. Ich bin hier, um Ihnen zu helfen, alle wichtigen Informationen für Ihren Schadensbericht zu sammeln. Können Sie mir zunächst erzählen, was für ein Fahrzeug Sie gefahren sind?',
      timestamp: new Date()
    }
  ]);
  
  const [currentInput, setCurrentInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'conversation' | 'upload' | 'analysis'>('conversation');
  const [claimData, setClaimData] = useState<ClaimData>({
    vehicleMake: '',
    vehicleModel: '',
    licensePlate: '',
    vin: '',
    driverName: '',
    driverRelation: '',
    accidentDate: '',
    accidentTime: '',
    accidentLocation: '',
    weather: '',
    roadConditions: '',
    thirdPartyName: '',
    thirdPartyAddress: '',
    thirdPartyPhone: '',
    thirdPartyVehicle: '',
    thirdPartyLicense: '',
    thirdPartyInsurance: '',
    thirdPartyPolicyNumber: '',
    description: '',
    damages: [],
    policeStation: '',
    caseNumber: '',
    officers: '',
    witnesses: [],
    photos: [],
    documents: [],
    completed: false,
    currentStep: 'vehicle'
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (content: string, type: 'user' | 'bot', isVoice = false) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
      isVoice
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const simulateTyping = (callback: () => void, delay = 1500) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      callback();
    }, delay);
  };

  const updateClaimData = (updates: Partial<ClaimData>) => {
    setClaimData(prev => ({ ...prev, ...updates }));
  };

  const getAIResponse = (userInput: string, currentStep: string) => {
    const lowerInput = userInput.toLowerCase();
    
    switch (currentStep) {
      case 'vehicle':
        if (lowerInput.includes('vw') || lowerInput.includes('golf')) {
          updateClaimData({ 
            vehicleMake: 'VW', 
            vehicleModel: 'Golf',
            currentStep: 'license' 
          });
          return "Ein VW Golf - verstehe. Können Sie mir auch das Kennzeichen Ihres Fahrzeugs nennen?";
        }
        updateClaimData({ currentStep: 'license' });
        return "Danke für die Information zu Ihrem Fahrzeug. Können Sie mir auch das Kennzeichen nennen?";
        
      case 'license':
        if (lowerInput.includes('m-ab') || lowerInput.includes('ab1234')) {
          updateClaimData({ 
            licensePlate: 'M-AB1234',
            currentStep: 'driver' 
          });
          return "Kennzeichen M-AB1234 notiert. Wer war zum Unfallzeitpunkt am Steuer? Waren Sie es selbst oder jemand anderes?";
        }
        updateClaimData({ currentStep: 'driver' });
        return "Kennzeichen notiert. Wer war zum Unfallzeitpunkt am Steuer?";
        
      case 'driver':
        if (lowerInput.includes('ich') || lowerInput.includes('selbst') || lowerInput.includes('lena')) {
          updateClaimData({ 
            driverName: 'Lena Heitmayr',
            driverRelation: 'Versicherungsnehmerin selbst',
            currentStep: 'date' 
          });
          return "Verstanden, Sie waren selbst am Steuer. Wann ist der Unfall passiert? Können Sie mir Datum und ungefähre Uhrzeit nennen?";
        }
        updateClaimData({ currentStep: 'date' });
        return "Danke. Wann ist der Unfall passiert? Datum und ungefähre Uhrzeit?";
        
      case 'date':
        if (lowerInput.includes('samstag') || lowerInput.includes('17') || lowerInput.includes('mai')) {
          updateClaimData({ 
            accidentDate: 'Samstag, 17. Mai 2025',
            accidentTime: 'ca. 16:45 Uhr',
            currentStep: 'location' 
          });
          return "Samstag, 17. Mai gegen 16:45 Uhr - das ist notiert. Wo genau ist der Unfall passiert? Können Sie mir die genaue Adresse oder Kreuzung nennen?";
        }
        updateClaimData({ currentStep: 'location' });
        return "Danke für die Zeitangabe. Wo genau ist der Unfall passiert?";
        
      case 'location':
        if (lowerInput.includes('b15') || lowerInput.includes('neubiberg') || lowerInput.includes('lindenstraße')) {
          updateClaimData({ 
            accidentLocation: 'Kreuzung B15 / Lindenstraße, 85579 Neubiberg',
            currentStep: 'weather' 
          });
          return "Kreuzung B15 / Lindenstraße in Neubiberg - das ist eine bekannte Kreuzung. Wie war das Wetter zum Unfallzeitpunkt? Und wie waren die Straßenverhältnisse?";
        }
        updateClaimData({ currentStep: 'weather' });
        return "Unfallort notiert. Wie war das Wetter und wie waren die Straßenverhältnisse?";
        
      case 'weather':
        if (lowerInput.includes('trocken') || lowerInput.includes('bewölkt')) {
          updateClaimData({ 
            weather: 'trocken, leicht bewölkt',
            roadConditions: 'trocken, gute Sicht',
            currentStep: 'thirdparty' 
          });
          return "Gute Sichtverhältnisse also. War noch ein anderes Fahrzeug am Unfall beteiligt? Wenn ja, können Sie mir Details zum anderen Fahrer und seinem Fahrzeug geben?";
        }
        updateClaimData({ currentStep: 'thirdparty' });
        return "Wetterverhältnisse notiert. War noch ein anderes Fahrzeug beteiligt?";
        
      case 'thirdparty':
        if (lowerInput.includes('bmw') || lowerInput.includes('maximilian') || lowerInput.includes('berger')) {
          updateClaimData({ 
            thirdPartyName: 'Maximilian Berger',
            thirdPartyAddress: 'Schillerstraße 45, 81543 München',
            thirdPartyPhone: '089 / 9876543',
            thirdPartyVehicle: 'BMW 3er, schwarz',
            thirdPartyLicense: 'M-CD5678',
            thirdPartyInsurance: 'Allianz Versicherung',
            thirdPartyPolicyNumber: '87654321-KFZ',
            currentStep: 'accident' 
          });
          return "BMW 3er von Herrn Berger - alle Kontaktdaten sind notiert. Jetzt zum wichtigsten Teil: Können Sie mir genau schildern, wie der Unfall abgelaufen ist? Was ist passiert?";
        }
        updateClaimData({ currentStep: 'accident' });
        return "Daten der anderen Partei notiert. Können Sie mir den Unfallhergang schildern?";
        
      case 'accident':
        if (lowerInput.includes('linksabbiegen') || lowerInput.includes('kreuzung') || lowerInput.includes('vorfahrt')) {
          updateClaimData({ 
            description: 'Linksabbiegeunfall an ampelgeregelter Kreuzung. Eigenes Fahrzeug befand sich bereits im Abbiegevorgang, als BMW mit hoher Geschwindigkeit Vorfahrt missachtete und frontal in rechte Fahrzeugseite kollidierte.',
            currentStep: 'damages' 
          });
          return "Das ist ein klassischer Linksabbiegeunfall mit Vorfahrtsmissachtung. Welche Schäden sind an Ihrem Fahrzeug entstanden? Ist es noch fahrbereit?";
        }
        updateClaimData({ currentStep: 'damages' });
        return "Unfallhergang verstanden. Welche Schäden sind an Ihrem Fahrzeug entstanden?";
        
      case 'damages':
        if (lowerInput.includes('beifahrertür') || lowerInput.includes('nicht fahrbereit') || lowerInput.includes('airbag')) {
          updateClaimData({ 
            damages: [
              'Beifahrertür stark eingedrückt',
              'Seitenteil verbeult', 
              'Rechter Außenspiegel abgerissen',
              'Rechter Seitenairbag ausgelöst',
              'Fahrzeug nicht mehr fahrbereit'
            ],
            currentStep: 'police' 
          });
          return "Das sind erhebliche Schäden, besonders wenn der Airbag ausgelöst hat. War die Polizei vor Ort? Können Sie mir die Details zur polizeilichen Aufnahme geben?";
        }
        updateClaimData({ currentStep: 'police' });
        return "Schäden notiert. War die Polizei vor Ort?";
        
      case 'police':
        if (lowerInput.includes('neubiberg') || lowerInput.includes('wagner') || lowerInput.includes('aktenzeichen')) {
          updateClaimData({ 
            policeStation: 'Polizeiinspektion Neubiberg',
            caseNumber: 'PI-NB/2025/0517/48',
            officers: 'POM Wagner, PKin Schuster',
            currentStep: 'witnesses' 
          });
          return "Polizeiliche Aufnahme durch PI Neubiberg ist notiert. Gab es Zeugen des Unfalls? Das kann für die Schadensregulierung sehr wichtig sein.";
        }
        updateClaimData({ currentStep: 'witnesses' });
        return "Polizeiaufnahme notiert. Gab es Zeugen?";
        
      case 'witnesses':
        if (lowerInput.includes('tobias') || lowerInput.includes('sandra') || lowerInput.includes('fahrrad')) {
          updateClaimData({ 
            witnesses: [
              {
                name: 'Tobias Klein (Fahrradfahrer)',
                phone: '0172 / 1122334',
                statement: 'Bestätigte, dass eigenes Fahrzeug bereits im Abbiegevorgang war'
              },
              {
                name: 'Sandra Lechner (Fußgängerin)', 
                phone: '0151 / 5566778',
                statement: 'Bestätigte überhöhte Geschwindigkeit des BMW'
              }
            ],
            currentStep: 'upload' 
          });
          return "Hervorragend! Zwei Zeugen, die Ihre Version bestätigen - das ist sehr hilfreich. Ich habe jetzt alle wichtigen Informationen gesammelt. Als nächstes brauche ich Fotos vom Unfallort und den Schäden. Haben Sie Fotos gemacht?";
        }
        updateClaimData({ currentStep: 'upload' });
        return "Zeugen sind sehr hilfreich. Haben Sie Fotos vom Unfall gemacht?";
        
      default:
        return "Können Sie mir dazu noch etwas mehr erzählen?";
    }
  };

  const handleSendMessage = () => {
    if (!currentInput.trim()) return;
    
    addMessage(currentInput, 'user');
    const userMessage = currentInput;
    setCurrentInput('');
    
    simulateTyping(() => {
      const response = getAIResponse(userMessage, claimData.currentStep);
      addMessage(response, 'bot');
      
      if (claimData.currentStep === 'upload') {
        setTimeout(() => {
          setCurrentPhase('upload');
        }, 2000);
      }
    });
  };

  const handleVoiceToggle = () => {
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      setTimeout(() => {
        const mockVoiceInput = "Ich bin mit meinem VW Golf an der Kreuzung B15 Lindenstraße in Neubiberg mit einem BMW zusammengestoßen.";
        setCurrentInput(mockVoiceInput);
        setIsRecording(false);
        addMessage(mockVoiceInput, 'user', true);
        setCurrentInput('');
        
        simulateTyping(() => {
          addMessage("Ein Unfall in Neubiberg mit einem BMW - das tut mir leid. Lassen Sie uns alle Details systematisch durchgehen. Zunächst zu Ihrem Fahrzeug: Was für einen VW Golf fahren Sie denn genau und wie ist das Kennzeichen?", 'bot');
          updateClaimData({ currentStep: 'license' });
        });
      }, 3000);
    }
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const photoUrl = e.target?.result as string;
          setClaimData(prev => ({
            ...prev,
            photos: [...prev.photos, photoUrl]
          }));
          
          setTimeout(() => {
            addMessage("Foto erhalten! Ich kann die Schäden deutlich erkennen. Das wird der Versicherung bei der schnellen Bearbeitung helfen.", 'bot');
          }, 1000);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const docUrl = e.target?.result as string;
          setClaimData(prev => ({
            ...prev,
            documents: [...prev.documents, docUrl]
          }));
          
          setTimeout(() => {
            addMessage(`${file.name} erfolgreich hochgeladen! Das ergänzt die Dokumentation perfekt.`, 'bot');
          }, 1000);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const finishDataCollection = () => {
    simulateTyping(() => {
      addMessage("Perfekt! Ich habe alle Informationen und Dokumente erhalten. Lassen Sie mich jetzt eine umfassende KI-Analyse Ihres Falls durchführen.", 'bot');
      setTimeout(() => {
        setCurrentPhase('analysis');
      }, 1500);
    });
  };

  const handleTestComplete = () => {
    // Fill with mock data for testing
    const mockData = {
      vehicleMake: 'VW',
      vehicleModel: 'Golf', 
      licensePlate: 'M-AB1234',
      vin: 'WVWZZZ1JZXW000000',
      driverName: 'Lena Heitmayr',
      driverRelation: 'Versicherungsnehmerin selbst',
      accidentDate: 'Samstag, 17. Mai 2025',
      accidentTime: 'ca. 16:45 Uhr',
      accidentLocation: 'Kreuzung B15 / Lindenstraße, 85579 Neubiberg',
      weather: 'trocken, leicht bewölkt',
      roadConditions: 'trocken, gute Sicht',
      thirdPartyName: 'Maximilian Berger',
      thirdPartyAddress: 'Schillerstraße 45, 81543 München',
      thirdPartyPhone: '089 / 9876543',
      thirdPartyVehicle: 'BMW 3er, schwarz',
      thirdPartyLicense: 'M-CD5678',
      thirdPartyInsurance: 'Allianz Versicherung',
      description: 'Linksabbiegeunfall an ampelgeregelter Kreuzung. Eigenes Fahrzeug befand sich bereits im Abbiegevorgang, als BMW mit hoher Geschwindigkeit Vorfahrt missachtete.',
      damages: ['Beifahrertür stark eingedrückt', 'Seitenteil verbeult', 'Rechter Außenspiegel abgerissen', 'Rechter Seitenairbag ausgelöst'],
      policeStation: 'Polizeiinspektion Neubiberg',
      caseNumber: 'PI-NB/2025/0517/48',
      officers: 'POM Wagner, PKin Schuster',
      witnesses: [
        { name: 'Tobias Klein', phone: '0172 / 1122334', statement: 'Bestätigte Abbiegevorgang' },
        { name: 'Sandra Lechner', phone: '0151 / 5566778', statement: 'Bestätigte überhöhte Geschwindigkeit BMW' }
      ],
      completed: true,
      currentStep: 'analysis'
    };
    
    setClaimData(prev => ({ ...prev, ...mockData }));
    setCurrentPhase('analysis');
    addMessage("Test-Daten geladen - springe zur KI-Analyse.", 'bot');
  };

  const getAnalysisClaimData = () => {
    return {
      description: claimData.description || 'Linksabbiegeunfall mit Vorfahrtsmissachtung',
      photos: claimData.photos,
      location: claimData.accidentLocation || 'Neubiberg',
      dateTime: `${claimData.accidentDate} ${claimData.accidentTime}` || 'Unbekannt',
      estimatedCost: 8500,
      severity: 'severe' as const,
      recommendation: 'Aufgrund der erheblichen Schäden und klaren Rechtslage sollte der Schaden umgehend gemeldet werden.',
      shouldReport: true
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-2 md:px-4 py-4 md:py-6 max-w-4xl">
        
        <div className="mb-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            AI-Schadensassistent
          </h1>
          <p className="text-gray-600">
            Ich sammle alle wichtigen Informationen für Ihren vollständigen Schadensbericht
          </p>
        </div>

        {currentPhase === 'analysis' ? (
          <Card className="shadow-lg border-0">
            <CardContent className="p-8">
              <AIAssistant 
                claimData={getAnalysisClaimData()}
                onAnalysisUpdate={() => {}}
              />
            </CardContent>
          </Card>
        ) : (
          <Card className="mb-4 shadow-lg border-0 h-96 md:h-[500px] flex flex-col">
            <CardContent className="p-4 flex-1 overflow-hidden flex flex-col">
              
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start space-x-3 ${
                      message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}
                  >
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                      ${message.type === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-green-600 text-white'
                      }
                    `}>
                      {message.type === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </div>
                    
                    <div className={`
                      max-w-xs md:max-w-md p-3 rounded-lg text-sm
                      ${message.type === 'user'
                        ? 'bg-blue-600 text-white ml-auto'
                        : 'bg-white border border-gray-200 text-gray-900'
                      }
                    `}>
                      {message.isVoice && (
                        <div className="flex items-center space-x-2 mb-2 text-xs opacity-75">
                          <Mic className="h-3 w-3" />
                          <span>Spracheingabe</span>
                        </div>
                      )}
                      <p>{message.content}</p>
                      <div className={`text-xs mt-1 opacity-75`}>
                        {message.timestamp.toLocaleTimeString('de-DE', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="bg-white border border-gray-200 p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {currentPhase === 'upload' && (
                <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-3 mb-3">
                    <Camera className="h-5 w-5 text-blue-600" />
                    <h4 className="font-medium text-blue-800">Fotos und Dokumente</h4>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <Button
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="h-20 border-dashed border-blue-300 text-blue-600"
                    >
                      <div className="text-center">
                        <Camera className="h-6 w-6 mx-auto mb-1" />
                        <span className="text-xs">Schaden-Fotos</span>
                      </div>
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={() => documentInputRef.current?.click()}
                      className="h-20 border-dashed border-blue-300 text-blue-600"
                    >
                      <div className="text-center">
                        <FileText className="h-6 w-6 mx-auto mb-1" />
                        <span className="text-xs">Unfallbericht</span>
                      </div>
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={() => documentInputRef.current?.click()}
                      className="h-20 border-dashed border-blue-300 text-blue-600"
                    >
                      <div className="text-center">
                        <Upload className="h-6 w-6 mx-auto mb-1" />
                        <span className="text-xs">Polizeiprotokoll</span>
                      </div>
                    </Button>
                  </div>
                  
                  {(claimData.photos.length > 0 || claimData.documents.length > 0) && (
                    <div className="mb-3">
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        {claimData.photos.length > 0 && (
                          <div>
                            <p className="text-sm text-green-600 mb-2">
                              ✓ {claimData.photos.length} Foto(s) hochgeladen
                            </p>
                            <div className="grid grid-cols-2 gap-1">
                              {claimData.photos.slice(0, 4).map((photo, index) => (
                                <img
                                  key={index}
                                  src={photo}
                                  alt={`Schaden ${index + 1}`}
                                  className="w-full h-12 object-cover rounded border"
                                />
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {claimData.documents.length > 0 && (
                          <div>
                            <p className="text-sm text-green-600 mb-2">
                              ✓ {claimData.documents.length} Dokument(e) hochgeladen
                            </p>
                            <div className="space-y-1">
                              {claimData.documents.map((_, index) => (
                                <div key={index} className="flex items-center space-x-2 text-xs">
                                  <FileText className="h-3 w-3" />
                                  <span>Dokument {index + 1}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <Button 
                        onClick={finishDataCollection}
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Alle Daten vollständig - KI-Analyse starten
                      </Button>
                    </div>
                  )}
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    capture="environment"
                    className="hidden"
                    onChange={handlePhotoUpload}
                  />
                  
                  <input
                    ref={documentInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    multiple
                    className="hidden"
                    onChange={handleDocumentUpload}
                  />
                </div>
              )}

              {currentPhase === 'conversation' && (
                <div className="border-t pt-4">
                  <div className="flex space-x-2">
                    <div className="flex-1 relative">
                      <Textarea
                        value={currentInput}
                        onChange={(e) => setCurrentInput(e.target.value)}
                        placeholder="Beschreiben Sie Ihren Schaden..."
                        className="min-h-12 resize-none pr-12"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`absolute right-1 top-1 ${
                          isRecording ? 'text-red-500 animate-pulse' : 'text-gray-400'
                        }`}
                        onClick={handleVoiceToggle}
                      >
                        {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                      </Button>
                    </div>
                    
                    <Button
                      onClick={handleSendMessage}
                      disabled={!currentInput.trim()}
                      className="px-4"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex justify-center mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleTestComplete}
                      className="text-xs bg-yellow-50 border-yellow-300 text-yellow-700"
                    >
                      <Play className="h-3 w-3 mr-1" />
                      Test: Komplett-Daten laden
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-white rounded-lg border">
            <Mic className="h-6 w-6 mx-auto mb-2 text-blue-600" />
            <h3 className="font-medium text-sm mb-1">Vollständige Datensammlung</h3>
            <p className="text-xs text-gray-600">Alle relevanten Unfalldaten werden erfasst</p>
          </div>
          
          <div className="p-4 bg-white rounded-lg border">
            <Bot className="h-6 w-6 mx-auto mb-2 text-green-600" />
            <h3 className="font-medium text-sm mb-1">Intelligente Nachfragen</h3>
            <p className="text-xs text-gray-600">KI fragt systematisch alle Details ab</p>
          </div>
          
          <div className="p-4 bg-white rounded-lg border">
            <FileText className="h-6 w-6 mx-auto mb-2 text-purple-600" />
            <h3 className="font-medium text-sm mb-1">Professionelle Analyse</h3>
            <p className="text-xs text-gray-600">Umfassende Bewertung und Empfehlungen</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationalClaimFlow;
