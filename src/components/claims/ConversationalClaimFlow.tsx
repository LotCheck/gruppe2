
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Mic, MicOff, Send, Camera, Upload, FileText, CheckCircle, Bot, User, ArrowRight, Play, Pause } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  isVoice?: boolean;
}

interface ClaimData {
  description: string;
  location: string;
  dateTime: string;
  involvedParties: string[];
  damages: string[];
  photos: string[];
  completed: boolean;
}

const ConversationalClaimFlow = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hallo! Es tut mir leid zu hören, dass Sie einen Schaden haben. Ich bin hier, um Ihnen zu helfen. Können Sie mir in Ihren eigenen Worten beschreiben, was passiert ist?',
      timestamp: new Date()
    }
  ]);
  
  const [currentInput, setCurrentInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'conversation' | 'upload' | 'report'>('conversation');
  const [claimData, setClaimData] = useState<ClaimData>({
    description: '',
    location: '',
    dateTime: '',
    involvedParties: [],
    damages: [],
    photos: [],
    completed: false
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const getAIResponse = (userInput: string) => {
    const lowerInput = userInput.toLowerCase();
    
    // Mock AI responses based on conversation flow
    if (lowerInput.includes('aufgefahren') || lowerInput.includes('frankreich')) {
      return "Das verstehe ich. Ein Auffahrunfall im Ausland ist besonders ärgerlich. Können Sie mir sagen, wann genau das passiert ist und in welcher Stadt in Frankreich?";
    }
    
    if (lowerInput.includes('gestern') || lowerInput.includes('heute') || lowerInput.includes('uhr')) {
      return "Danke für die Zeitangabe. Waren noch andere Personen oder Fahrzeuge beteiligt? Gab es Verletzte?";
    }
    
    if (lowerInput.includes('nein') || lowerInput.includes('keine')) {
      return "Das ist gut zu hören. Können Sie den Schaden an Ihrem Fahrzeug beschreiben? Welche Teile sind betroffen?";
    }
    
    if (lowerInput.includes('bumper') || lowerInput.includes('front') || lowerInput.includes('vorne')) {
      return "Verstanden. Ich habe alle wichtigen Informationen gesammelt. Können Sie jetzt bitte Fotos vom Schaden hochladen? Das hilft uns bei der schnellen Bearbeitung.";
    }
    
    return "Können Sie mir dazu noch etwas mehr erzählen? Jede Information hilft mir, Ihnen besser zu helfen.";
  };

  const handleSendMessage = () => {
    if (!currentInput.trim()) return;
    
    addMessage(currentInput, 'user');
    const userMessage = currentInput;
    setCurrentInput('');
    
    // Mock AI processing
    simulateTyping(() => {
      const response = getAIResponse(userMessage);
      addMessage(response, 'bot');
      
      // Check if we should move to upload phase
      if (response.includes('Fotos hochladen')) {
        setTimeout(() => {
          setCurrentPhase('upload');
        }, 2000);
      }
    });
  };

  const handleVoiceToggle = () => {
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      // Mock voice input
      setTimeout(() => {
        const mockVoiceInput = "Ich bin gestern Abend um 18:30 in Lyon jemandem aufgefahren. Mein Frontbumper ist beschädigt.";
        setCurrentInput(mockVoiceInput);
        setIsRecording(false);
        addMessage(mockVoiceInput, 'user', true);
        setCurrentInput('');
        
        simulateTyping(() => {
          addMessage("Das verstehe ich. Ein Auffahrunfall in Lyon - das ist wirklich ärgerlich. Waren noch andere Personen beteiligt oder gab es Verletzte?", 'bot');
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
          
          // Mock AI photo analysis
          setTimeout(() => {
            addMessage("Perfekt! Ich kann auf dem Foto den Frontschaden deutlich erkennen. Das sieht nach einem mittleren Schaden aus.", 'bot');
            
            // After first photo, ask for more or offer to continue
            setTimeout(() => {
              if (claimData.photos.length === 0) { // This will be 1 after the photo is added
                addMessage("Haben Sie noch weitere Fotos? Zum Beispiel eine Übersichtsaufnahme des ganzen Fahrzeugs oder vom Unfallort? Falls nicht, können Sie auch direkt fortfahren.", 'bot');
              }
            }, 2000);
          }, 1500);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const generateReport = () => {
    setCurrentPhase('report');
    simulateTyping(() => {
      addMessage("Excellent! Ich erstelle jetzt Ihren vollständigen Schadensbericht. Alle Informationen sind strukturiert und bereit für die Übermittlung an Ihre Versicherung.", 'bot');
    }, 2000);
  };

  const finishPhotoUpload = () => {
    simulateTyping(() => {
      addMessage("Vielen Dank für die Fotos! Ich habe alle Informationen, die ich für Ihren Schadensbericht benötige. Lassen Sie mich das jetzt für Sie zusammenstellen.", 'bot');
      setTimeout(() => {
        generateReport();
      }, 1500);
    });
  };

  // Mock function to show next step
  const handleTestNext = () => {
    if (currentPhase === 'conversation') {
      setCurrentPhase('upload');
      addMessage("Perfekt! Jetzt können Sie Fotos vom Schaden hochladen.", 'bot');
    } else if (currentPhase === 'upload') {
      finishPhotoUpload();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-2 md:px-4 py-4 md:py-6 max-w-4xl">
        
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            AI-Schadensassistent
          </h1>
          <p className="text-gray-600">
            Beschreiben Sie einfach, was passiert ist - ich kümmere mich um den Rest
          </p>
        </div>

        {/* Chat Container */}
        <Card className="mb-4 shadow-lg border-0 h-96 md:h-[500px] flex flex-col">
          <CardContent className="p-4 flex-1 overflow-hidden flex flex-col">
            
            {/* Messages */}
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
              
              {/* Typing Indicator */}
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

            {/* Phase-specific Content */}
            {currentPhase === 'upload' && (
              <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-3 mb-3">
                  <Camera className="h-5 w-5 text-blue-600" />
                  <h4 className="font-medium text-blue-800">Fotos hochladen</h4>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="h-20 border-dashed border-blue-300 text-blue-600"
                  >
                    <div className="text-center">
                      <Camera className="h-6 w-6 mx-auto mb-1" />
                      <span className="text-xs">Foto aufnehmen</span>
                    </div>
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="h-20 border-dashed border-blue-300 text-blue-600"
                  >
                    <div className="text-center">
                      <Upload className="h-6 w-6 mx-auto mb-1" />
                      <span className="text-xs">Galerie</span>
                    </div>
                  </Button>
                </div>
                
                {claimData.photos.length > 0 && (
                  <div className="mb-3">
                    <p className="text-sm text-green-600 mb-2">
                      ✓ {claimData.photos.length} Foto(s) hochgeladen
                    </p>
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      {claimData.photos.map((photo, index) => (
                        <img
                          key={index}
                          src={photo}
                          alt={`Schaden ${index + 1}`}
                          className="w-full h-16 object-cover rounded border"
                        />
                      ))}
                    </div>
                    
                    {/* Fertig Button - appears after photos are uploaded */}
                    <Button 
                      onClick={finishPhotoUpload}
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Fertig - Schadensbericht erstellen
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
              </div>
            )}

            {currentPhase === 'report' && (
              <div className="mb-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center space-x-3 mb-3">
                  <FileText className="h-5 w-5 text-green-600" />
                  <h4 className="font-medium text-green-800">Schadensbericht erstellt</h4>
                </div>
                <p className="text-sm text-green-700 mb-3">
                  Ihr vollständiger Schadensbericht ist bereit zur Übermittlung.
                </p>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Schaden an Versicherung melden
                </Button>
              </div>
            )}

            {/* Input Area */}
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
                    onClick={handleTestNext}
                    className="text-xs bg-yellow-50 border-yellow-300 text-yellow-700"
                  >
                    <Play className="h-3 w-3 mr-1" />
                    Test: Nächste Phase
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* AI Features Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-white rounded-lg border">
            <Mic className="h-6 w-6 mx-auto mb-2 text-blue-600" />
            <h3 className="font-medium text-sm mb-1">Voice-First</h3>
            <p className="text-xs text-gray-600">Sprechen Sie einfach, was passiert ist</p>
          </div>
          
          <div className="p-4 bg-white rounded-lg border">
            <Bot className="h-6 w-6 mx-auto mb-2 text-green-600" />
            <h3 className="font-medium text-sm mb-1">KI-gesteuert</h3>
            <p className="text-xs text-gray-600">Intelligente Nachfragen und Analyse</p>
          </div>
          
          <div className="p-4 bg-white rounded-lg border">
            <FileText className="h-6 w-6 mx-auto mb-2 text-purple-600" />
            <h3 className="font-medium text-sm mb-1">Auto-Bericht</h3>
            <p className="text-xs text-gray-600">Vollständige Dokumentation</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationalClaimFlow;
