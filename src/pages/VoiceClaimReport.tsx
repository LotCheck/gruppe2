import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mic, MicOff, Bot, Upload, FileText, Camera, Image, X, Check, User, Play, Star, Menu, MoreVertical } from 'lucide-react';
import AccidentSequenceSlideshow from '@/components/claims/AccidentSequenceSlideshow';

interface Message {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
  slideshow?: UploadedPhoto[];
  photos?: UploadedPhoto[];
  isVoice?: boolean;
  voiceDuration?: number;
  isVideo?: boolean;
}

interface UploadedPhoto {
  id: string;
  file?: File;
  url: string;
  name: string;
}

type ConversationStep = 'initial' | 'location_time' | 'other_parties' | 'upload_options' | 'photo_upload' | 'confirmation' | 'slideshow' | 'slideshow_confirm' | 'completed';

const VoiceClaimReport = () => {
  const navigate = useNavigate();
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hallo! Es tut mir leid zu hören, dass Sie einen Unfall hatten. Um Ihnen schnell und bestmöglich helfen zu können, schildern Sie mir bitte kurz, was passiert ist.',
      timestamp: new Date()
    }
  ]);
  
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState<ConversationStep>('initial');
  const [showUploadOptions, setShowUploadOptions] = useState(false);
  const [showPhotoUpload, setShowPhotoUpload] = useState(false);
  const [showLoadingBubble, setShowLoadingBubble] = useState(false);
  const [uploadedPhotos, setUploadedPhotos] = useState<UploadedPhoto[]>([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [showConfirmButton, setShowConfirmButton] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock images for upload simulation with ordered names - updated with new images
  const mockDamagePhotos = [
    {
      id: 'mock-1',
      url: '/lovable-uploads/0ca5fba2-a303-4a1d-8436-56a3bbbacb28.png',
      name: '01_green_car.jpg'
    },
    {
      id: 'mock-2', 
      url: '/lovable-uploads/358f46be-5f38-448a-bbc8-2fc6de6af917.png',
      name: '02_black_classic_car.jpg'
    }
  ];

  // Accident sequence images in correct order
  const accidentSequenceImages = [
    '/lovable-uploads/4d8ee763-cf2f-45d0-9a34-a8eaa6b0163f.png',
    '/lovable-uploads/bc1200d7-2f85-4909-918b-0718fd42a4e5.png',
    '/lovable-uploads/2096a279-c90f-4f61-9ccf-90c875843604.png',
    '/lovable-uploads/e73f4214-e52e-4867-9334-a77b7b788ddd.png',
    '/lovable-uploads/6244cf06-9a58-4bbc-aaaa-f5d059f116f1.png',
    '/lovable-uploads/cbc97717-2e69-4ec4-9962-452d1ae6c6cd.png',
    '/lovable-uploads/f2dea51a-ca15-4236-bfde-e554e342cbbd.png',
    '/lovable-uploads/2e592004-f68d-4323-b3f3-ca1b75d67e36.png',
    '/lovable-uploads/ca101aa7-87b8-4d2c-ab04-927e230103da.png',
    '/lovable-uploads/96147a7c-2171-4316-8bac-0f85dc89794a.png'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addBotMessage = (content: string, slideshow?: UploadedPhoto[], photos?: UploadedPhoto[], isVideo?: boolean) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'bot',
      content,
      timestamp: new Date(),
      slideshow,
      photos,
      isVideo
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addUserMessage = (content: string, isVoice: boolean = false, duration?: number) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date(),
      isVoice,
      voiceDuration: duration
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const getResponseForStep = (step: ConversationStep): string => {
    switch (step) {
      case 'initial':
        setCurrentStep('location_time');
        return "Vielen Dank für Ihre Schilderung. Können Sie mir bitte sagen, wann und wo genau der Unfall passiert ist?";
        
      case 'location_time':
        setCurrentStep('other_parties');
        return "Danke für die Information. Gab es außer Ihnen noch weitere beteiligte Personen, Fahrzeuge oder wurden andere Sachen beschädigt?";
        
      case 'other_parties':
        setTimeout(() => setShowUploadOptions(true), 1000);
        setCurrentStep('upload_options');
        return "Das hilft uns schon sehr weiter. Um Ihre Schadensmeldung zügig bearbeiten zu können, nutzen Sie bitte die folgenden Optionen:";
        
      default:
        return "Vielen Dank für Ihre Angaben.";
    }
  };

  const getUserMessageForStep = (step: ConversationStep): string => {
    switch (step) {
      case 'initial':
        return "🎤 Es gab einen Auffahrunfall auf der A1. Das andere Auto ist mir hinten reingefahren.";
      case 'location_time':
        return "🎤 Das war heute Morgen gegen 8:30 Uhr auf der A1 Richtung Hamburg, kurz vor der Ausfahrt Harburg.";
      case 'other_parties':
        return "🎤 Ja, es war noch ein anderes Fahrzeug beteiligt. Zum Glück wurde niemand verletzt.";
      case 'slideshow_confirm':
        return "🎤 Ja, genau so ist der Unfall passiert.";
      default:
        return "🎤 Sprachnachricht";
    }
  };

  const simulateVoiceProcessing = () => {
    setIsProcessing(true);
    
    // Add user message first with voice duration
    const userMessage = getUserMessageForStep(currentStep);
    const mockDuration = 2 + Math.random() * 3; // Random duration between 2-5 seconds
    addUserMessage(userMessage, true, Math.floor(mockDuration));
    
    setTimeout(() => {
      setIsProcessing(false);
      
      if (currentStep === 'slideshow_confirm') {
        setCurrentStep('completed');
        addBotMessage('Vielen Dank für die Bestätigung! Ihre Schadensmeldung wurde erfolgreich übermittelt. Sie erhalten in Kürze eine Bestätigung und weitere Informationen zum Bearbeitungsstatus per E-Mail.');
        
        setTimeout(() => {
          navigate('/claim-report/analysis');
        }, 3000);
      } else {
        const response = getResponseForStep(currentStep);
        addBotMessage(response);
      }
    }, 1500);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      setIsRecording(true);
      mediaRecorder.start();
      
      // Simulate recording duration (2-4 seconds)
      setTimeout(() => {
        stopRecording();
        simulateVoiceProcessing();
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

  const formatVoiceDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (minutes > 0) {
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return `0:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handlePhotoUpload = () => {
    setCurrentStep('photo_upload');
    setShowUploadOptions(false);
    
    // Mock upload of the attached images
    setTimeout(() => {
      addBotMessage('Bitte laden Sie nun noch Fotos vom Schaden hoch! So können wir Ihnen schneller helfen.');
      setShowPhotoUpload(true);
      
      // Simulate automatic upload of mock images
      setTimeout(() => {
        mockDamagePhotos.forEach((photo, index) => {
          setTimeout(() => {
            setUploadedPhotos(prev => [...prev, photo]);
            
            // Show success animation
            setUploadSuccess(true);
            setTimeout(() => setUploadSuccess(false), 1500);
            
            // Bot feedback after first photo
            if (index === 0) {
              setTimeout(() => {
                addBotMessage('Super, danke! Das hilft uns sehr. Sie können gerne weitere Fotos hinzufügen.');
              }, 800);
            }
          }, index * 1000);
        });
      }, 1000);
      
    }, 500);
  };

  const handlePoliceReportUpload = () => {
    // Simulate police report upload
    addBotMessage('Der Polizeibericht wurde erfolgreich hochgeladen.');
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>, isCamera: boolean = false) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        const newPhoto: UploadedPhoto = {
          id: Date.now().toString() + Math.random(),
          file,
          url,
          name: file.name
        };
        
        setUploadedPhotos(prev => [...prev, newPhoto]);
        
        // Show success animation
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 2000);
        
        // Bot feedback after first photo
        if (uploadedPhotos.length === 0) {
          setTimeout(() => {
            addBotMessage('Super, danke! Das hilft uns sehr. Sie können gerne weitere Fotos hinzufügen.');
          }, 500);
        }
      }
    });
    
    // Reset input
    event.target.value = '';
  };

  const removePhoto = (photoId: string) => {
    setUploadedPhotos(prev => {
      const photoToRemove = prev.find(p => p.id === photoId);
      if (photoToRemove && photoToRemove.file) {
        URL.revokeObjectURL(photoToRemove.url);
      }
      return prev.filter(p => p.id !== photoId);
    });
  };

  const handleContinueFromPhotos = () => {
    setCurrentStep('confirmation');
    setShowPhotoUpload(false);
    
    // Add uploaded photos to chat history
    const sortedPhotos = [...uploadedPhotos].sort((a, b) => a.name.localeCompare(b.name));
    addBotMessage('Hier sind die hochgeladenen Fotos:', undefined, sortedPhotos);
    
    addBotMessage('Perfekt! Ich habe nun alle relevanten Informationen erhalten. Lassen Sie mich kurz die Unfallsequenz basierend auf Ihren Angaben und Fotos analysieren...');
    
    // Show loading bubble after short delay
    setTimeout(() => {
      setShowLoadingBubble(true);
    }, 1000);
    
    // Start slideshow after loading
    setTimeout(() => {
      setShowLoadingBubble(false);
      startSlideshow();
    }, 2500);
  };

  const startSlideshow = () => {
    const sortedPhotos = [...uploadedPhotos].sort((a, b) => a.name.localeCompare(b.name));
    
    // Add slideshow to chat history instead of video placeholder
    addBotMessage('Basierend auf Ihren Angaben und den Fotos, ist der Unfall so abgelaufen:', undefined, undefined, true);
    
    // Show confirmation question after slideshow completes
    setTimeout(() => {
      addBotMessage('Bestätigen Sie bitte, dass der Unfall so abgelaufen ist, wie in der Sequenz gezeigt, damit wir Ihre Schadensmeldung weiterleiten können.');
      setCurrentStep('slideshow_confirm');
      setShowConfirmButton(true);
    }, accidentSequenceImages.length * 200 + 1000); // Wait for slideshow to complete + 1 second
  };

  const handleConfirmAccident = () => {
    setShowConfirmButton(false);
    setCurrentStep('completed');
    addBotMessage('Vielen Dank für die Bestätigung! Ihre Schadensmeldung wurde erfolgreich übermittelt. Sie erhalten in Kürze eine Bestätigung und weitere Informationen zum Bearbeitungsstatus per E-Mail.');
    
    setTimeout(() => {
      navigate('/claim-report/analysis');
    }, 3000);
  };

  const canRecord = currentStep !== 'upload_options' && 
                   currentStep !== 'photo_upload' && 
                   currentStep !== 'confirmation' && 
                   currentStep !== 'slideshow' && 
                   currentStep !== 'slideshow_confirm' &&
                   currentStep !== 'completed';

  return (
    <div className="h-full bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="h-full px-4 py-4 max-w-md mx-auto flex flex-col">
        
        {/* Updated Header to match reference */}
        <div className="h-[50px] flex items-center justify-between mb-4 bg-white rounded-lg shadow-sm px-4">
          {/* Close Button - Left */}
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/')}
            className="p-2 hover:bg-gray-100"
          >
            <X className="h-5 w-5 text-gray-600" />
          </Button>

          {/* Center - Sophie für Versicherungen with star icon and phone */}
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-blue-600 fill-blue-600" />
              <h1 className="text-sm font-semibold text-gray-900">
                Sophie für Versicherungen
              </h1>
            </div>
            <p className="text-xs text-gray-500">
              +49.40.7823949
            </p>
          </div>

          {/* Menu Button - Right (3 vertical dots) */}
          <Button 
            variant="ghost" 
            size="sm"
            className="p-2 hover:bg-gray-100"
          >
            <MoreVertical className="h-5 w-5 text-gray-600" />
          </Button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex items-start space-x-3 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.type === 'bot' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-600 text-white'
              }`}>
                {message.type === 'bot' ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
              </div>
              
              {message.isVoice && message.type === 'user' ? (
                // Voice message bubble for user
                <Card className="flex-1 p-3 bg-blue-600 text-white border-0 max-w-xs">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full">
                      <Mic className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className="w-1 bg-white rounded-full"
                              style={{
                                height: `${8 + Math.sin(i * 0.5) * 4}px`
                              }}
                            />
                          ))}
                        </div>
                        <span className="text-xs font-medium">
                          {message.voiceDuration ? formatVoiceDuration(message.voiceDuration) : '0:03'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs mt-2 opacity-75">
                    {message.timestamp.toLocaleTimeString('de-DE', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </Card>
              ) : (
                // Regular message bubble
                <Card className={`flex-1 p-3 border border-gray-200 ${
                  message.type === 'bot' 
                    ? 'bg-white' 
                    : 'bg-blue-50 border-blue-200'
                }`}>
                  <p className="text-sm text-gray-900">{message.content}</p>
                  
                  {/* Uploaded Photos Display */}
                  {message.photos && message.photos.length > 0 && (
                    <div className="mt-3">
                      <div className="grid grid-cols-3 gap-2">
                        {message.photos.map((photo) => (
                          <div key={photo.id} className="relative">
                            <img
                              src={photo.url}
                              alt={photo.name}
                              className="w-full h-16 object-cover rounded-md border border-gray-200"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b-md truncate">
                              {photo.name}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Accident Sequence Slideshow Display */}
                  {message.isVideo && (
                    <div className="mt-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <Play className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-gray-700">Unfallsequenz</span>
                      </div>
                      <AccidentSequenceSlideshow 
                        images={accidentSequenceImages}
                        onComplete={() => {
                          console.log('Slideshow completed');
                        }}
                      />
                    </div>
                  )}

                  <div className="text-xs text-gray-500 mt-2">
                    {message.timestamp.toLocaleTimeString('de-DE', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </Card>
              )}
            </div>
          ))}
          
          {/* Processing Indicator */}
          {isProcessing && (
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                <Bot className="h-4 w-4" />
              </div>
              <Card className="p-3 bg-white border border-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-sm text-gray-600">Ich höre zu und verarbeite Ihre Eingabe...</span>
                </div>
              </Card>
            </div>
          )}

          {/* Loading Bubble */}
          {showLoadingBubble && (
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                <Bot className="h-4 w-4" />
              </div>
              <Card className="p-4 bg-white border border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-sm text-gray-600">Analysiere Unfallsequenz...</span>
                </div>
              </Card>
            </div>
          )}

          {/* Upload Options */}
          {showUploadOptions && (
            <div className="space-y-3">
              <Card className="p-4 bg-white border border-gray-200">
                <div className="space-y-3">
                  <Button
                    onClick={handlePhotoUpload}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center space-x-2"
                  >
                    <Upload className="h-4 w-4" />
                    <span>Unfallfotos hochladen</span>
                  </Button>
                  
                  <Button
                    onClick={handlePoliceReportUpload}
                    variant="outline"
                    className="w-full border-blue-300 text-blue-700 hover:bg-blue-50 flex items-center justify-center space-x-2"
                  >
                    <FileText className="h-4 w-4" />
                    <span>Polizeibericht hochladen</span>
                  </Button>
                </div>
              </Card>
              
              <Card className="p-3 bg-blue-50 border border-blue-200">
                <p className="text-xs text-blue-700">
                  Laden Sie bitte Fotos vom Unfallort und den Schäden hoch. Falls ein Polizeibericht vorliegt, fügen Sie diesen ebenfalls hinzu.
                </p>
              </Card>
            </div>
          )}

          {/* Photo Upload Interface */}
          {showPhotoUpload && (
            <div className="space-y-4">
              <Card className="p-4 bg-white border border-gray-200">
                <div className="space-y-4">
                  {/* Upload Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      onClick={() => cameraInputRef.current?.click()}
                      className="bg-blue-600 hover:bg-blue-700 text-white flex flex-col items-center justify-center h-20 space-y-1"
                    >
                      <Camera className="h-6 w-6" />
                      <span className="text-xs">Kamera</span>
                    </Button>
                    
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      variant="outline"
                      className="border-blue-300 text-blue-700 hover:bg-blue-50 flex flex-col items-center justify-center h-20 space-y-1"
                    >
                      <Image className="h-6 w-6" />
                      <span className="text-xs">Galerie</span>
                    </Button>
                  </div>

                  {/* Uploaded Photos */}
                  {uploadedPhotos.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Hochgeladene Fotos ({uploadedPhotos.length})
                      </h4>
                      <div className="grid grid-cols-3 gap-2">
                        {uploadedPhotos.map((photo) => (
                          <div key={photo.id} className="relative group">
                            <img
                              src={photo.url}
                              alt={photo.name}
                              className="w-full h-20 object-cover rounded-md border border-gray-200"
                            />
                            <button
                              onClick={() => removePhoto(photo.id)}
                              className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-3 w-3" />
                            </button>
                            {uploadSuccess && uploadedPhotos.indexOf(photo) === uploadedPhotos.length - 1 && (
                              <div className="absolute inset-0 bg-green-500 bg-opacity-20 rounded-md flex items-center justify-center">
                                <Check className="h-6 w-6 text-green-600" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Continue Button */}
                  {uploadedPhotos.length > 0 && (
                    <Button
                      onClick={handleContinueFromPhotos}
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                    >
                      Weiter
                    </Button>
                  )}
                </div>
              </Card>

              {/* Hidden File Inputs */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleFileSelect(e, false)}
                className="hidden"
              />
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={(e) => handleFileSelect(e, true)}
                className="hidden"
              />
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Voice Input Interface - Full Width CTA */}
        {canRecord && (
          <Card className="p-4 bg-white border-0 shadow-lg">
            <div className="space-y-3">
              
              {/* Full Width Microphone Button */}
              <Button
                onClick={isRecording ? stopRecording : startRecording}
                disabled={isProcessing}
                className={`
                  w-full h-12 rounded-full transition-all duration-300 flex items-center justify-center space-x-2
                  ${isRecording 
                    ? 'bg-red-500 hover:bg-red-600 animate-pulse text-white' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }
                `}
              >
                {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                <span className="text-sm font-medium">
                  {isRecording ? 'Stoppen' : 'Sprechen'}
                </span>
              </Button>

              {/* Centered Text Below */}
              <div className="text-center">
                <span className="text-xs text-gray-500">Tippen Sie, um zu sprechen.</span>
              </div>

              {/* Status Text */}
              {(isRecording || isProcessing) && (
                <div className="text-center">
                  {isRecording ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-red-600 font-medium">Ich höre zu...</span>
                    </div>
                  ) : isProcessing ? (
                    <span className="text-xs text-blue-600">Verarbeite Ihre Nachricht...</span>
                  ) : null}
                </div>
              )}

              {/* Voice Waves Animation */}
              {isRecording && (
                <div className="flex items-center justify-center space-x-1">
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
            </div>
          </Card>
        )}

        {/* Completion State */}
        {currentStep === 'completed' && (
          <Card className="p-6 bg-green-50 border-green-200">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-green-800 mb-2">Meldung übermittelt</h3>
              <p className="text-sm text-green-700">
                Sie werden automatisch zur Analyse weitergeleitet...
              </p>
            </div>
          </Card>
        )}

        {/* Trust Indicators */}
        <div className="mt-4 text-center">
          <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Sichere Übertragung</span>
            </div>
            <div className="flex items-center space-x-1">
              <Bot className="h-3 w-3" />
              <span>KI-unterstützt</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Confirmation Button */}
      {showConfirmButton && (
        <div className="flex justify-center p-4">
          <Button
            onClick={handleConfirmAccident}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg font-medium"
          >
            Bestätigen
          </Button>
        </div>
      )}
    </div>
  );
};

export default VoiceClaimReport;
