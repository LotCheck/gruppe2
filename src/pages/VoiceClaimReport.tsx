import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Mic, MicOff, Send, Play, Pause, Upload, CheckCircle, Heart, User, FileText, Camera, X, Bot } from 'lucide-react';
import Header from '@/components/Header';

interface ClaimData {
  description: string;
  location: string;
  dateTime: string;
  estimatedCost: number;
  severity: 'minor' | 'moderate' | 'severe';
  photos: string[];
}

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  audioUrl?: string;
  images?: string[];
}

const VoiceClaimReport = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hallo! Ich bin Ihr KI-Assistent für die Schadensmeldung. Erzählen Sie mir einfach, was passiert ist. Ich helfe Ihnen dabei, alle wichtigen Informationen zu erfassen.',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [claimData, setClaimData] = useState({
    description: '',
    location: '',
    dateTime: '',
    estimatedCost: 0,
    severity: 'minor' as 'minor' | 'moderate' | 'severe',
    photos: [] as string[]
  });

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const generateClaimId = () => {
    return `CL-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageUrl = e.target?.result as string;
          setUploadedImages(prev => [...prev, imageUrl]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        // Simulate speech-to-text conversion
        setTimeout(() => {
          const transcribedText = "Heute um 14:30 Uhr bin ich auf der Hauptstraße in einen kleinen Unfall verwickelt worden. Ein anderes Auto ist mir hinten reingefahren, als ich an der Ampel gehalten habe.";
          handleSendMessage(transcribedText, audioUrl);
          setIsProcessing(false);
        }, 2000);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      setIsProcessing(true);
    }
  };

  const handleSendMessage = (text: string, audioUrl?: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: text,
      timestamp: new Date(),
      audioUrl,
      images: uploadedImages.length > 0 ? [...uploadedImages] : undefined
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setUploadedImages([]);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Ich verstehe. Das tut mir leid zu hören. Können Sie mir mehr Details zum Unfallhergang erzählen? Wo genau ist der Unfall passiert?",
        "Vielen Dank für die Informationen. Gab es Verletzte bei dem Unfall? Und haben Sie Fotos von den Fahrzeugschäden gemacht?",
        "Das hilft mir sehr weiter. Basierend auf Ihrer Beschreibung schätze ich die Reparaturkosten auf etwa 2.500-3.000 Euro. Möchten Sie die Schadensmeldung jetzt abschließen?"
      ];

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: responses[currentStep] || "Vielen Dank für alle Informationen. Ihre Schadensmeldung wurde erfolgreich erfasst.",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setCurrentStep(prev => prev + 1);
    }, 1000);
  };

  const handleSubmit = () => {
    const claimId = generateClaimId();
    localStorage.setItem('currentClaimId', claimId);
    localStorage.setItem('claimData', JSON.stringify({
      ...claimData,
      messages,
      photos: uploadedImages
    }));
    
    // Show success message
    const successMessage: Message = {
      id: Date.now().toString(),
      type: 'assistant',
      content: `Perfekt! Ihre Schadensmeldung wurde erfolgreich eingereicht. Ihre Referenznummer ist: ${claimId}. Sie erhalten in Kürze eine Bestätigung per E-Mail.`,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, successMessage]);
    
    // Navigate to success page after a short delay
    setTimeout(() => {
      navigate('/claim-report', { state: { claimId, success: true } });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/claim-report')}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Zurück zur Übersicht
          </Button>
        </div>

        <Card className="shadow-lg border-0 h-[600px] flex flex-col">
          <CardContent className="p-6 flex flex-col h-full">
            <div className="flex items-center justify-between mb-4 pb-4 border-b">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Bot className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">KI-Assistent</h2>
                  <p className="text-sm text-gray-500">Schadensmeldung</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">Online</span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                    message.type === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    
                    {/* Audio playback for voice messages */}
                    {message.audioUrl && (
                      <div className="mt-2 flex items-center space-x-2">
                        <audio controls className="w-full h-8">
                          <source src={message.audioUrl} type="audio/wav" />
                        </audio>
                      </div>
                    )}
                    
                    {/* Image display */}
                    {message.images && message.images.length > 0 && (
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        {message.images.map((img, idx) => (
                          <img key={idx} src={img} alt={`Uploaded ${idx}`} className="w-full h-20 object-cover rounded" />
                        ))}
                      </div>
                    )}
                    
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              
              {isProcessing && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-900 px-4 py-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-sm">Verarbeite Spracheingabe...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Image preview */}
            {uploadedImages.length > 0 && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Hochgeladene Bilder:</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {uploadedImages.map((img, index) => (
                    <div key={index} className="relative">
                      <img src={img} alt={`Upload ${index}`} className="w-full h-16 object-cover rounded" />
                      <Button
                        size="sm"
                        variant="destructive"
                        className="absolute -top-1 -right-1 w-5 h-5 p-0"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Input area */}
            <div className="border-t pt-4">
              <div className="flex items-end space-x-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  multiple
                  className="hidden"
                />
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-shrink-0"
                >
                  <Camera className="h-4 w-4" />
                </Button>

                <div className="flex-1 flex items-end space-x-2">
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Beschreiben Sie Ihren Schaden..."
                    className="flex-1 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={1}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage(inputText);
                      }
                    }}
                  />
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`flex-shrink-0 ${isRecording ? 'bg-red-100 text-red-600' : ''}`}
                  disabled={isProcessing}
                >
                  {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>

                <Button
                  onClick={() => handleSendMessage(inputText)}
                  disabled={!inputText.trim() || isProcessing}
                  className="flex-shrink-0"
                  style={{ backgroundColor: '#064E9C' }}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Submit button for completed claims */}
            {currentStep >= 3 && (
              <div className="mt-4 pt-4 border-t">
                <Button
                  onClick={handleSubmit}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Schadensmeldung abschließen
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VoiceClaimReport;
