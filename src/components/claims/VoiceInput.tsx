
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Mic, MicOff, Play, Pause } from 'lucide-react';

interface VoiceInputProps {
  onDescriptionUpdate: (description: string) => void;
  currentDescription: string;
}

const VoiceInput = ({ onDescriptionUpdate, currentDescription }: VoiceInputProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [transcription, setTranscription] = useState(currentDescription);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.start();
      setIsRecording(true);
      
      // Simulate real-time transcription
      const mockTranscription = () => {
        const phrases = [
          "Ich hatte heute Morgen einen Unfall auf der A1...",
          "Es war gegen 8:30 Uhr, als ich zur Arbeit gefahren bin...",
          "Ein anderer Fahrer ist mir in die Seite gefahren beim Spurwechsel...",
          "Mein linker Kotflügel ist beschädigt und die Tür klemmt..."
        ];
        
        let currentPhrase = 0;
        const interval = setInterval(() => {
          if (currentPhrase < phrases.length && isRecording) {
            setTranscription(phrases[currentPhrase]);
            onDescriptionUpdate(phrases[currentPhrase]);
            currentPhrase++;
          } else {
            clearInterval(interval);
          }
        }, 2000);
      };
      
      mockTranscription();
      
    } catch (error) {
      console.error('Fehler beim Zugriff auf das Mikrofon:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-4">Beschreiben Sie Ihren Schaden</h3>
        <p className="text-gray-600 mb-6">
          Sprechen Sie einfach in natürlicher Sprache über Ihren Unfall. 
          Unsere KI versteht Sie und stellt die richtigen Fragen.
        </p>
      </div>

      {/* Voice Recording Interface */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <div className="text-center">
          <div className={`
            w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center transition-all duration-300
            ${isRecording 
              ? 'bg-red-500 animate-pulse shadow-lg shadow-red-200' 
              : 'bg-blue-600 hover:bg-blue-700'
            }
          `}>
            <Button
              variant="ghost"
              size="lg"
              onClick={isRecording ? stopRecording : startRecording}
              className="w-full h-full text-white hover:text-white hover:bg-transparent"
            >
              {isRecording ? <MicOff className="h-8 w-8" /> : <Mic className="h-8 w-8" />}
            </Button>
          </div>
          
          <div className="text-sm text-gray-600 mb-4">
            {isRecording ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span>Aufnahme läuft... Klicken Sie zum Stoppen</span>
              </div>
            ) : (
              "Klicken Sie zum Starten der Aufnahme"
            )}
          </div>
        </div>
      </Card>

      {/* Live Transcription */}
      {transcription && (
        <Card className="p-4 bg-green-50 border-green-200">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-green-800 mb-2">Live-Transkription</h4>
              <p className="text-green-700 text-sm">{transcription}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Manual Input Alternative */}
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-gray-500 text-sm">oder manuell eingeben</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>
        
        <Textarea
          placeholder="Beschreiben Sie hier Ihren Schaden in eigenen Worten..."
          value={transcription}
          onChange={(e) => {
            setTranscription(e.target.value);
            onDescriptionUpdate(e.target.value);
          }}
          className="min-h-32"
        />
      </div>

      {/* AI Suggestions */}
      {transcription && (
        <Card className="p-4 bg-blue-50 border-blue-200">
          <h4 className="font-medium text-blue-800 mb-3">KI-Assistent Fragen</h4>
          <div className="space-y-2">
            <Button variant="outline" size="sm" className="text-blue-700 border-blue-300 hover:bg-blue-100">
              Waren andere Fahrzeuge beteiligt?
            </Button>
            <Button variant="outline" size="sm" className="text-blue-700 border-blue-300 hover:bg-blue-100">
              Gab es Verletzte?
            </Button>
            <Button variant="outline" size="sm" className="text-blue-700 border-blue-300 hover:bg-blue-100">
              Haben Sie die Polizei gerufen?
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default VoiceInput;
