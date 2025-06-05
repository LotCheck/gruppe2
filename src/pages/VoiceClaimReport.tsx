
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Mic, MicOff, Bot, MessageCircle, Heart } from 'lucide-react';

interface Message {
  id: string;
  type: 'bot';
  content: string;
  timestamp: Date;
}

const VoiceClaimReport = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hallo! Ich bin hier, um Ihnen bei Ihrer Schadensmeldung zu helfen. Es tut mir leid zu hören, dass Sie einen Schaden hatten. Erzählen Sie mir einfach, was passiert ist - ich höre zu.',
      timestamp: new Date()
    }
  ]);
  
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState<string>('initial');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addBotMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'bot',
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const getContextualResponse = (step: string, voiceInput: string) => {
    const input = voiceInput.toLowerCase();
    
    switch (step) {
      case 'initial':
        if (input.includes('unfall') || input.includes('zusammenstoß') || input.includes('kollidiert')) {
          setCurrentStep('accident_details');
          return "Das klingt wirklich belastend für Sie. Können Sie mir erzählen, wann und wo dieser Unfall passiert ist?";
        } else if (input.includes('kratzer') || input.includes('delle') || input.includes('parkschaden')) {
          setCurrentStep('damage_details'); 
          return "Verstehe, ein Parkschaden ist immer ärgerlich. Wo ist das passiert und wie groß ist der Schaden ungefähr?";
        } else if (input.includes('diebstahl') || input.includes('gestohlen') || input.includes('einbruch')) {
          setCurrentStep('theft_details');
          return "Oh nein, das ist wirklich schlimm! Wann haben Sie bemerkt, dass etwas gestohlen wurde?";
        }
        setCurrentStep('clarification');
        return "Ich verstehe. Können Sie mir etwas genauer beschreiben, was für eine Art von Schaden aufgetreten ist?";
        
      case 'accident_details':
        if (input.includes('heute') || input.includes('gestern') || input.includes('samstag')) {
          setCurrentStep('location_details');
          return "Danke für die Zeitangabe. An welchem Ort ist der Unfall passiert? War noch ein anderes Fahrzeug beteiligt?";
        }
        setCurrentStep('location_details');
        return "Verstehe. Können Sie mir auch den genauen Ort nennen wo es passiert ist?";
        
      case 'location_details':
        if (input.includes('kreuzung') || input.includes('ampel') || input.includes('straße')) {
          setCurrentStep('other_party');
          return "Eine Kreuzung also. War noch jemand anderes an dem Unfall beteiligt? Falls ja, haben Sie Kontaktdaten ausgetauscht?";
        }
        setCurrentStep('other_party');
        return "Okay, der Ort ist notiert. Waren noch andere Personen oder Fahrzeuge beteiligt?";
        
      case 'other_party':
        if (input.includes('ja') || input.includes('bmw') || input.includes('anderer fahrer')) {
          setCurrentStep('damage_assessment');
          return "Gut dass Sie die Daten haben. Welche Schäden sind an Ihrem Fahrzeug entstanden? Ist es noch fahrbereit?";
        } else if (input.includes('nein') || input.includes('allein') || input.includes('niemand')) {
          setCurrentStep('damage_assessment');
          return "Verstehe, Sie waren allein betroffen. Welche Schäden sind an Ihrem Fahrzeug entstanden?";
        }
        setCurrentStep('damage_assessment');
        return "Okay. Können Sie mir die Schäden an Ihrem Fahrzeug beschreiben?";
        
      case 'damage_assessment':
        if (input.includes('nicht fahrbereit') || input.includes('abschleppen') || input.includes('kaputt')) {
          setCurrentStep('police_witnesses');
          return "Das klingt nach erheblichen Schäden. War die Polizei vor Ort? Gab es Zeugen des Unfalls?";
        } else if (input.includes('kratzer') || input.includes('kleine') || input.includes('oberflächlich')) {
          setCurrentStep('completion');
          return "Das klingt nach einem überschaubaren Schaden. Haben Sie Fotos gemacht? Dann können wir Ihre Schadensmeldung abschließen.";
        }
        setCurrentStep('police_witnesses');
        return "Verstehe. War die Polizei vor Ort oder gab es Zeugen?";
        
      case 'police_witnesses':
        setCurrentStep('completion');
        return "Sehr gut, das sind wichtige Informationen für die Schadensregulierung. Haben Sie Fotos vom Schaden gemacht? Dann haben wir alle wichtigen Details zusammen.";
        
      case 'completion':
        return "Perfekt! Ich habe alle wichtigen Informationen erhalten. Ihre Schadensmeldung wird nun bearbeitet. Sie erhalten in Kürze eine Bestätigung und weitere Informationen zum Ablauf.";
        
      default:
        return "Können Sie mir dazu noch etwas mehr erzählen?";
    }
  };

  const simulateVoiceProcessing = (mockInput: string) => {
    setIsProcessing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      setIsProcessing(false);
      const response = getContextualResponse(currentStep, mockInput);
      addBotMessage(response);
    }, 1500);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      setIsRecording(true);
      mediaRecorder.start();
      
      // Mock voice input simulation for demo
      const mockInputs = [
        "Ich hatte einen Unfall an der Kreuzung B15 Lindenstraße heute um halb fünf",
        "Ein BMW ist mir beim Linksabbiegen in die Seite gefahren",
        "Ja wir haben Daten ausgetauscht, Maximilian Berger heißt er", 
        "Meine Beifahrertür ist eingedrückt und der Airbag ist raus, nicht mehr fahrbereit",
        "Ja die Polizei war da und es gab auch Zeugen",
        "Ja ich habe Fotos gemacht vom ganzen Schaden"
      ];
      
      const stepIndex = ['initial', 'accident_details', 'location_details', 'other_party', 'damage_assessment', 'police_witnesses'].indexOf(currentStep);
      const mockInput = mockInputs[stepIndex] || mockInputs[0];
      
      // Simulate recording duration
      setTimeout(() => {
        stopRecording();
        simulateVoiceProcessing(mockInput);
      }, 2000 + Math.random() * 2000);
      
    } catch (error) {
      console.error('Fehler beim Zugriff auf das Mikrofon:', error);
      addBotMessage('Entschuldigung, ich konnte nicht auf Ihr Mikrofon zugreifen. Bitte überprüfen Sie Ihre Berechtigungen.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-6 max-w-md">
        
        {/* Header */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-900 p-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Zurück
          </Button>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Schadensmeldung
          </h1>
          <p className="text-gray-600 text-sm">
            Erzählen Sie mir einfach, was passiert ist. Ich höre aufmerksam zu.
          </p>
        </div>

        {/* Chat Messages */}
        <div className="mb-6 h-80 overflow-y-auto space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center flex-shrink-0">
                <Bot className="h-4 w-4" />
              </div>
              <Card className="flex-1 p-3 bg-white border border-gray-200">
                <p className="text-sm text-gray-900">{message.content}</p>
                <div className="text-xs text-gray-500 mt-2">
                  {message.timestamp.toLocaleTimeString('de-DE', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </Card>
            </div>
          ))}
          
          {/* Processing Indicator */}
          {isProcessing && (
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center">
                <Bot className="h-4 w-4" />
              </div>
              <Card className="p-3 bg-white border border-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-sm text-gray-600">Ich verarbeite Ihre Eingabe...</span>
                </div>
              </Card>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Voice Input Interface */}
        <Card className="p-6 bg-white border-0 shadow-lg">
          <div className="text-center">
            
            {/* Microphone Button */}
            <div className="relative mb-4">
              <div className={`
                w-20 h-20 mx-auto rounded-full flex items-center justify-center transition-all duration-300
                ${isRecording 
                  ? 'bg-red-500 shadow-lg animate-pulse' 
                  : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
                }
              `}>
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={isRecording ? stopRecording : startRecording}
                  disabled={isProcessing}
                  className="w-full h-full text-white hover:text-white hover:bg-transparent"
                >
                  {isRecording ? <MicOff className="h-8 w-8" /> : <Mic className="h-8 w-8" />}
                </Button>
              </div>
              
              {/* Recording Animation */}
              {isRecording && (
                <div className="absolute inset-0 w-20 h-20 mx-auto rounded-full border-4 border-red-300 animate-ping opacity-75"></div>
              )}
            </div>

            {/* Status Text */}
            <div className="mb-4">
              {isRecording ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-red-600 font-medium">Ich höre zu...</span>
                </div>
              ) : isProcessing ? (
                <span className="text-sm text-blue-600">Verarbeite Ihre Nachricht...</span>
              ) : (
                <span className="text-sm text-gray-600">Tippen Sie, um zu sprechen</span>
              )}
            </div>

            {/* Voice Waves Animation */}
            {isRecording && (
              <div className="flex items-center justify-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-red-500 rounded-full animate-pulse"
                    style={{
                      height: `${12 + Math.sin(Date.now() * 0.01 + i) * 8}px`,
                      animationDelay: `${i * 0.1}s`,
                      animationDuration: '0.8s'
                    }}
                  ></div>
                ))}
              </div>
            )}

            {/* Progress Indicator */}
            <div className="text-xs text-gray-500">
              Schritt {Math.min(['initial', 'accident_details', 'location_details', 'other_party', 'damage_assessment', 'police_witnesses', 'completion'].indexOf(currentStep) + 1, 6)} von 6
            </div>
          </div>
        </Card>

        {/* Trust Indicators */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Sichere Übertragung</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle className="h-3 w-3" />
              <span>Vertraulich</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceClaimReport;
