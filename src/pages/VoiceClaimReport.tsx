import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mic, MicOff, Bot, Upload, FileText, Camera, Image, X, Check, User, Play, Star, Menu, MoreVertical, ZoomIn } from 'lucide-react';
import AccidentSequenceSlideshow from '@/components/claims/AccidentSequenceSlideshow';
import TypingEffect from '@/components/claims/TypingEffect';
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
  const [messages, setMessages] = useState<Message[]>([{
    id: '1',
    type: 'bot',
    content: 'Hallo! Es tut mir leid zu hören, dass Sie einen Unfall hatten. Um Ihnen schnell und bestmöglich helfen zu können, schildern Sie mir bitte kurz, was passiert ist.',
    timestamp: new Date()
  }]);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState<ConversationStep>('initial');
  const [showUploadOptions, setShowUploadOptions] = useState(false);
  const [showPhotoUpload, setShowPhotoUpload] = useState(false);
  const [showLoadingBubble, setShowLoadingBubble] = useState(false);
  const [uploadedPhotos, setUploadedPhotos] = useState<UploadedPhoto[]>([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [showConfirmButton, setShowConfirmButton] = useState(false);
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock images for upload simulation with new uploaded images
  const mockDamagePhotos = [{
    id: 'mock-1',
    url: '/lovable-uploads/e5bbd045-296f-438b-bffe-9e0433d45079.png',
    name: '01_black_classic_car.jpg'
  }, {
    id: 'mock-2',
    url: '/lovable-uploads/4d07d859-cf82-4945-be96-ffbf67421699.png',
    name: '02_green_hybrid_car.jpg'
  }];

  // Accident sequence images in correct order
  const accidentSequenceImages = ['/lovable-uploads/4d8ee763-cf2f-45d0-9a34-a8eaa6b0163f.png', '/lovable-uploads/bc1200d7-2f85-4909-918b-0718fd42a4e5.png', '/lovable-uploads/2096a279-c90f-4f61-9ccf-90c875843604.png', '/lovable-uploads/e73f4214-e52e-4867-9334-a77b7b788ddd.png', '/lovable-uploads/6244cf06-9a58-4bbc-aaaa-f5d059f116f1.png', '/lovable-uploads/cbc97717-2e69-4ec4-9962-452d1ae6c6cd.png', '/lovable-uploads/f2dea51a-ca15-4236-bfde-e554e342cbbd.png', '/lovable-uploads/2e592004-f68d-4323-b3f3-ca1b75d67e36.png', '/lovable-uploads/ca101aa7-87b8-4d2c-ab04-927e230103da.png', '/lovable-uploads/96147a7c-2171-4316-8bac-0f85dc89794a.png'];
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Force scroll when upload-related state changes
  useEffect(() => {
    if (showPhotoUpload || uploadedPhotos.length > 0) {
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  }, [showPhotoUpload, uploadedPhotos.length]);

  // Force scroll when loading bubble appears/disappears
  useEffect(() => {
    if (showLoadingBubble) {
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  }, [showLoadingBubble]);

  // Force scroll when upload options appear
  useEffect(() => {
    if (showUploadOptions) {
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  }, [showUploadOptions]);

  // Force scroll when confirmation button appears
  useEffect(() => {
    if (showConfirmButton) {
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  }, [showConfirmButton]);

  // Play sound for the very first bot message
  useEffect(() => {
    if (messages.length === 1 && messages[0].type === 'bot' && messages[0].content.startsWith('Hallo! Es tut mir leid zu hören, dass Sie einen Unfall hatten')) {
      setTimeout(() => {
        const audio = new Audio('/sound/1.m4a');
        audio.play();
      }, 1500);
    }
    // Play sound for the second bot message
    if (messages.length > 1 && messages[messages.length - 1].type === 'bot' && messages[messages.length - 1].content.startsWith('Vielen Dank für Ihre Schilderung. Können Sie mir bitte sagen')) {
      const audio = new Audio('/sound/2.m4a');
      audio.play();
    }
    // Play sound for the third bot message
    if (messages.length > 1 && messages[messages.length - 1].type === 'bot' && messages[messages.length - 1].content.startsWith('Danke für die Information. Gab es außer Ihnen noch')) {
      const audio = new Audio('/sound/3.m4a');
      audio.play();
    }
    // Play sound for the fourth bot message
    if (messages.length > 1 && messages[messages.length - 1].type === 'bot' && messages[messages.length - 1].content.startsWith('Das hilft uns schon sehr weiter. Um Ihre Schadensmeldung')) {
      const audio = new Audio('/sound/4.m4a');
      audio.play();
    }
  }, [messages]);

  // New state to track if a message has completed typing
  const [completedTyping, setCompletedTyping] = useState<{
    [key: string]: boolean;
  }>({});
  const addBotMessage = (content: string, slideshow?: UploadedPhoto[], photos?: UploadedPhoto[], isVideo?: boolean) => {
    const messageId = Date.now().toString();
    const newMessage: Message = {
      id: messageId,
      type: 'bot',
      content,
      timestamp: new Date(),
      slideshow,
      photos,
      isVideo
    };
    setMessages(prev => [...prev, newMessage]);

    // Mark this message as not completed typing yet
    setCompletedTyping(prev => ({
      ...prev,
      [messageId]: false
    }));

    // Force scroll after adding message
    setTimeout(() => {
      scrollToBottom();
    }, 50);

    // Mark as completed after estimated typing time
    const typingTime = Math.min(content.length * 30, 3000); // Cap at 3 seconds
    setTimeout(() => {
      setCompletedTyping(prev => ({
        ...prev,
        [messageId]: true
      }));
    }, typingTime);
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

    // Force scroll after adding message
    setTimeout(() => {
      scrollToBottom();
    }, 50);
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

    // Add user message first with longer voice duration (50 seconds to 1:30)
    const userMessage = getUserMessageForStep(currentStep);
    const mockDuration = 50 + Math.random() * 40; // Random duration between 50-90 seconds
    addUserMessage(userMessage, true, Math.floor(mockDuration));
    setTimeout(() => {
      setIsProcessing(false);
      if (currentStep === 'slideshow_confirm') {
        setCurrentStep('completed');
        addBotMessage('Vielen Dank für die Bestätigung! Ihre Schadensmeldung wurde erfolgreich übermittelt. Sie erhalten in Kürze eine Bestätigung und weitere Informationen zum Bearbeitungsstatus per E-Mail.');
        setTimeout(() => {
          navigate('/claim-report/analysis');
        }, 1500);
      } else {
        const response = getResponseForStep(currentStep);
        addBotMessage(response);
      }
    }, 1500);
  };
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true
      });
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
    Array.from(files).forEach(file => {
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
    addBotMessage('Vielen Dank für die Bestätigung! Ihre Schadensmeldung wurde erfolgreich übermittelt.');

    // Navigate directly after a short delay without showing the green completion card
    setTimeout(() => {
      navigate('/claim-report/analysis');
    }, 1500);
  };
  const canRecord = currentStep !== 'upload_options' && currentStep !== 'photo_upload' && currentStep !== 'confirmation' && currentStep !== 'slideshow' && currentStep !== 'slideshow_confirm' && currentStep !== 'completed';
  const handleImageClick = (imageUrl: string) => {
    setEnlargedImage(imageUrl);
  };
  const closeEnlargedImage = () => {
    setEnlargedImage(null);
  };
  return <div className="h-full bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="h-full max-w-md mx-auto flex flex-col">
        
        {/* Updated Header - Full Width */}
        <div className="h-[56px] flex items-center justify-between px-4 bg-white shadow-sm">
          {/* Close Button - Left */}
          <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="p-2 hover:bg-gray-100">
            <X className="h-6 w-6 text-gray-600" />
          </Button>

          {/* Center - Sterne und Sophie für Versicherungen */}
          <div className="flex items-center flex-1 justify-center">
            {/* Orange Stern */}
            <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 10 10" width="18"><g><path d="M4.905 0.176L5.577 2.409c.187.622.681 1.108 1.312 1.293l2.266.662c.238.07.238.401 0 .471l-2.266.662c-.631.185-1.125.672-1.312 1.294l-.672 2.233c-.07.234-.407.234-.477 0l-.672-2.233c-.187-.622-.681-1.108-1.312-1.293l-2.266-.662c-.238-.07-.238-.401 0-.471l2.266-.662c.631-.185 1.125-.672 1.312-1.294l.672-2.233c.07-.234.407-.234.477 0z" fill="#F07C00" /></g></svg>
            {/* Blauer Stern */}
            
            <span className="text-base font-medium text-gray-900 ml-1">Sophie für Versicherungen</span>
          </div>

          {/* Menu Button - Right (3 vertical dots) */}
          <Button variant="ghost" size="sm" className="p-2 hover:bg-gray-100">
            <MoreVertical className="h-6 w-6 text-gray-600" />
          </Button>
        </div>

        {/* Unterzeile: ID */}
        <div className="text-center text-xs text-gray-400 pb-1 pt-0.5" style={{
        letterSpacing: '0.5px'
      }}>2.45.4/8c39439</div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 p-4">
          {messages.map(message => <div key={message.id} className={`flex items-start space-x-3 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.type === 'bot' ? 'bg-blue-600 text-white' : 'bg-gray-600 text-white'}`}>
                {message.type === 'bot' ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
              </div>
              
              {message.isVoice && message.type === 'user' ?
          // Voice message bubble for user
          <Card className="flex-1 p-3 bg-blue-600 text-white border-0 max-w-xs">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full">
                      <Mic className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <div className="flex space-x-1">
                          {[...Array(8)].map((_, i) => <div key={i} className="w-1 bg-white rounded-full" style={{
                      height: `${8 + Math.sin(i * 0.5) * 4}px`
                    }} />)}
                        </div>
                        <span className="text-xs font-medium">
                          {message.voiceDuration ? formatVoiceDuration(message.voiceDuration) : '1:15'}
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
                </Card> :
          // Regular message bubble - Modified for typing effect
          <Card className={`flex-1 p-3 border border-gray-200 ${message.type === 'bot' ? 'bg-white' : 'bg-blue-50 border-blue-200'}`}>
                  <p className="text-sm text-gray-900">
                    {message.type === 'bot' ? completedTyping[message.id] ? message.content : <TypingEffect text={message.content} typingSpeed={20} /> : message.content}
                  </p>
                  
                  {/* Uploaded Photos Display */}
                  {message.photos && message.photos.length > 0 && <div className="mt-3">
                      <div className="grid grid-cols-3 gap-2">
                        {message.photos.map(photo => <div key={photo.id} className="relative group cursor-pointer" onClick={() => handleImageClick(photo.url)}>
                            <img src={photo.url} alt={photo.name} className="w-full h-16 object-cover rounded-md border border-gray-200 hover:opacity-90 transition-opacity" />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-md flex items-center justify-center">
                              <ZoomIn className="h-4 w-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b-md truncate">
                              {photo.name}
                            </div>
                          </div>)}
                      </div>
                    </div>}

                  {/* Accident Sequence Slideshow Display */}
                  {message.isVideo && <div className="mt-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <Play className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-gray-700">Unfallsequenz</span>
                      </div>
                      <AccidentSequenceSlideshow images={accidentSequenceImages} onComplete={() => {
                console.log('Slideshow completed');
              }} />
                    </div>}

                  <div className="text-xs text-gray-500 mt-2">
                    {message.timestamp.toLocaleTimeString('de-DE', {
                hour: '2-digit',
                minute: '2-digit'
              })}
                  </div>
                </Card>}
            </div>)}
          
          {/* Processing Indicator */}
          {isProcessing && <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                <Bot className="h-4 w-4" />
              </div>
              <Card className="p-3 bg-white border border-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{
                  animationDelay: '0.1s'
                }}></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{
                  animationDelay: '0.2s'
                }}></div>
                  </div>
                  <span className="text-sm text-gray-600">Ich höre zu und verarbeite Ihre Eingabe...</span>
                </div>
              </Card>
            </div>}

          {/* Loading Bubble */}
          {showLoadingBubble && <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                <Bot className="h-4 w-4" />
              </div>
              <Card className="p-4 bg-white border border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{
                  animationDelay: '0.1s'
                }}></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{
                  animationDelay: '0.2s'
                }}></div>
                  </div>
                  <span className="text-sm text-gray-600">Analysiere Unfallsequenz...</span>
                </div>
              </Card>
            </div>}

          {/* Upload Options */}
          {showUploadOptions && <div className="space-y-3">
              <Card className="p-4 bg-white border border-gray-200">
                <div className="space-y-3">
                  <Button onClick={handlePhotoUpload} className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center space-x-2">
                    <Upload className="h-4 w-4" />
                    <span>Unfallfotos hochladen</span>
                  </Button>
                  
                  <Button onClick={handlePoliceReportUpload} variant="outline" className="w-full border-blue-300 text-blue-700 hover:bg-blue-50 flex items-center justify-center space-x-2">
                    <FileText className="h-4 w-4" />
                    <span>Polizeibericht hochladen</span>
                  </Button>
                </div>
              </Card>
            </div>}

          {/* Photo Upload Interface */}
          {showPhotoUpload && <div className="space-y-4">
              <Card className="p-4 bg-white border border-gray-200">
                <div className="space-y-4">
                  {/* Upload Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <Button onClick={() => cameraInputRef.current?.click()} className="bg-blue-600 hover:bg-blue-700 text-white flex flex-col items-center justify-center h-20 space-y-1">
                      <Camera className="h-6 w-6" />
                      <span className="text-xs">Kamera</span>
                    </Button>
                    
                    <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50 flex flex-col items-center justify-center h-20 space-y-1">
                      <Image className="h-6 w-6" />
                      <span className="text-xs">Galerie</span>
                    </Button>
                  </div>

                  {/* Uploaded Photos */}
                  {uploadedPhotos.length > 0 && <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Hochgeladene Fotos ({uploadedPhotos.length})
                      </h4>
                      <div className="grid grid-cols-3 gap-2">
                        {uploadedPhotos.map(photo => <div key={photo.id} className="relative group cursor-pointer" onClick={() => handleImageClick(photo.url)}>
                            <img src={photo.url} alt={photo.name} className="w-full h-20 object-cover rounded-md border border-gray-200 hover:opacity-90 transition-opacity" />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-md flex items-center justify-center">
                              <ZoomIn className="h-4 w-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <button onClick={e => {
                      e.stopPropagation();
                      removePhoto(photo.id);
                    }} className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                              <X className="h-3 w-3" />
                            </button>
                            {uploadSuccess && uploadedPhotos.indexOf(photo) === uploadedPhotos.length - 1 && <div className="absolute inset-0 bg-green-500 bg-opacity-20 rounded-md flex items-center justify-center">
                                <Check className="h-6 w-6 text-green-600" />
                              </div>}
                          </div>)}
                      </div>
                    </div>}

                  {/* Continue Button */}
                  {uploadedPhotos.length > 0 && <Button onClick={handleContinueFromPhotos} className="w-full text-white bg-[#0563c1]">
                      Weiter
                    </Button>}
                </div>
              </Card>

              {/* Hidden File Inputs */}
              <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={e => handleFileSelect(e, false)} className="hidden" />
              <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" onChange={e => handleFileSelect(e, true)} className="hidden" />
            </div>}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Voice Input Interface - Updated with reduced spacing */}
        {canRecord && <div className="p-4">
            <Button onClick={isRecording ? stopRecording : startRecording} disabled={isProcessing} className={`
                w-full h-16 rounded-full transition-all duration-300 flex flex-col items-center justify-center
                ${isRecording ? 'bg-red-500 hover:bg-red-600 animate-pulse text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}
              `}>
              <div className="flex items-center space-x-2">
                {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                <span className="text-lg font-medium">
                  {isRecording ? 'Stoppen' : 'Sprechen'}
                </span>
              </div>
              <span className="text-xs opacity-80 mt-0.5">
                Tippen Sie, um zu sprechen.
              </span>
            </Button>

            {/* Status Text */}
            {(isRecording || isProcessing) && <div className="text-center mt-3">
                {isRecording ? <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-red-600 font-medium">Ich höre zu...</span>
                  </div> : isProcessing ? <span className="text-xs text-blue-600">Verarbeite Ihre Nachricht...</span> : null}
              </div>}

            {/* Voice Waves Animation */}
            {isRecording && <div className="flex items-center justify-center space-x-1 mt-3">
                {[...Array(5)].map((_, i) => <div key={i} className="w-1 bg-red-500 rounded-full animate-pulse" style={{
            height: `${12 + Math.sin(Date.now() * 0.01 + i) * 8}px`,
            animationDelay: `${i * 0.1}s`,
            animationDuration: '0.8s'
          }}></div>)}
              </div>}
          </div>}

        {/* Confirmation Button - Changed to blue color */}
        {showConfirmButton && <div className="flex justify-center p-4">
            <Button onClick={handleConfirmAccident} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-medium">
              Bestätigen
            </Button>
          </div>}

        {/* Trust Indicators */}
        <div className="p-4 text-center">
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

      {/* Image Enlargement Modal */}
      {enlargedImage && <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4" onClick={closeEnlargedImage}>
          <div className="relative max-w-full max-h-full">
            <Button variant="ghost" size="sm" onClick={closeEnlargedImage} className="absolute top-2 right-2 z-10 bg-black bg-opacity-50 text-white hover:bg-opacity-70">
              <X className="h-5 w-5" />
            </Button>
            <img src={enlargedImage} alt="Vergrößertes Foto" className="max-w-full max-h-full object-contain rounded-md" onClick={e => e.stopPropagation()} />
          </div>
        </div>}
    </div>;
};
export default VoiceClaimReport;