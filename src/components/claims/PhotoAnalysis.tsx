
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Camera, Upload, X, CheckCircle, AlertTriangle } from 'lucide-react';

interface PhotoAnalysisProps {
  onPhotosUpdate: (photos: string[]) => void;
  currentPhotos: string[];
}

const PhotoAnalysis = ({ onPhotosUpdate, currentPhotos }: PhotoAnalysisProps) => {
  const [photos, setPhotos] = useState<string[]>(currentPhotos);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<{[key: string]: any}>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const photoUrl = e.target?.result as string;
          const newPhotos = [...photos, photoUrl];
          setPhotos(newPhotos);
          onPhotosUpdate(newPhotos);
          
          // Simulate AI analysis
          analyzePhoto(photoUrl, photos.length);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const analyzePhoto = async (photoUrl: string, index: number) => {
    setAnalyzing(true);
    
    // Simulate AI analysis delay
    setTimeout(() => {
      const mockAnalysis = {
        damageType: 'Kotflügelschaden',
        severity: 'Mittel',
        estimatedCost: '€1.200 - €2.400',
        repairTime: '3-5 Tage',
        confidence: 0.92,
        recommendations: [
          'Werkstattbesuch empfohlen',
          'Gutachten erforderlich',
          'Sofortige Reparatur nicht kritisch'
        ]
      };
      
      setAnalysisResults(prev => ({
        ...prev,
        [index]: mockAnalysis
      }));
      setAnalyzing(false);
    }, 2000);
  };

  const removePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    setPhotos(newPhotos);
    onPhotosUpdate(newPhotos);
    
    const newResults = { ...analysisResults };
    delete newResults[index];
    setAnalysisResults(newResults);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-4">Schaden dokumentieren</h3>
        <p className="text-gray-600 mb-6">
          Machen Sie Fotos vom Schaden. Unsere KI analysiert diese automatisch 
          und erstellt eine erste Kostenschätzung.
        </p>
      </div>

      {/* Photo Upload Interface */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card 
          className="p-6 border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="text-center">
            <Camera className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h4 className="font-medium mb-2">Foto aufnehmen</h4>
            <p className="text-sm text-gray-600">Kamera öffnen</p>
          </div>
        </Card>

        <Card 
          className="p-6 border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="text-center">
            <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h4 className="font-medium mb-2">Foto hochladen</h4>
            <p className="text-sm text-gray-600">Aus Galerie wählen</p>
          </div>
        </Card>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        capture="environment"
        className="hidden"
        onChange={handlePhotoUpload}
      />

      {/* Photo Gallery with Analysis */}
      {photos.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-medium text-lg">Aufgenommene Fotos</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {photos.map((photo, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="relative">
                  <img 
                    src={photo} 
                    alt={`Schaden ${index + 1}`}
                    className="w-full h-48 object-cover"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => removePhoto(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  
                  {analyzing && !analysisResults[index] && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-2"></div>
                        <p className="text-sm">KI analysiert...</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {analysisResults[index] && (
                  <div className="p-4 space-y-3">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="font-medium">Analyse abgeschlossen</span>
                      <span className="text-sm text-gray-500">
                        ({Math.round(analysisResults[index].confidence * 100)}% Genauigkeit)
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Schadensart:</span>
                        <p className="font-medium">{analysisResults[index].damageType}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Schweregrad:</span>
                        <p className="font-medium">{analysisResults[index].severity}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Kosten:</span>
                        <p className="font-medium text-blue-600">{analysisResults[index].estimatedCost}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Reparaturdauer:</span>
                        <p className="font-medium">{analysisResults[index].repairTime}</p>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 p-3 rounded-md">
                      <h5 className="font-medium text-blue-800 mb-2">Empfehlungen:</h5>
                      <ul className="text-sm text-blue-700 space-y-1">
                        {analysisResults[index].recommendations.map((rec: string, i: number) => (
                          <li key={i} className="flex items-center space-x-2">
                            <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* AI Photo Suggestions */}
      <Card className="p-4 bg-yellow-50 border-yellow-200">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mt-1" />
          <div>
            <h4 className="font-medium text-yellow-800 mb-2">Foto-Tipps von der KI</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Fotografieren Sie den Schaden aus verschiedenen Winkeln</li>
              <li>• Nehmen Sie eine Übersichtsaufnahme des gesamten Fahrzeugs auf</li>
              <li>• Dokumentieren Sie auch das Kennzeichen und die Fahrzeugpapiere</li>
              <li>• Bei Fremdschäden: Fotografieren Sie auch das andere Fahrzeug</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PhotoAnalysis;
