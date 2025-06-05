
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, MapPin, MessageSquare, Camera } from 'lucide-react';

interface ClaimData {
  description: string;
  photos: string[];
  location?: string;
  dateTime?: string;
  estimatedCost: number;
  severity: 'minor' | 'moderate' | 'severe';
  recommendation: string;
  shouldReport: boolean;
}

interface ClaimPreviewProps {
  claimData: ClaimData;
}

const ClaimPreview = ({ claimData }: ClaimPreviewProps) => {
  return (
    <div className="space-y-2 md:space-y-3">
      <div className="text-left px-4">
        <h3 className="text-xl md:text-2xl font-bold mb-2">Zusammenfassung</h3>
      </div>

      {/* Unfallzeitpunkt, Ort und Hergang - Combined */}
      <Card>
        <CardHeader className="pb-2 md:pb-3">
          <CardTitle className="flex items-center space-x-2 text-lg md:text-xl text-left">
            <Clock className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
            <span>Unfalldetails</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <span className="text-xs md:text-sm text-gray-600">Datum und Uhrzeit:</span>
                <p className="font-medium text-sm md:text-base">{claimData.dateTime || "15.01.2024, 14:30 Uhr"}</p>
              </div>
              <div>
                <span className="text-xs md:text-sm text-gray-600">Unfallort:</span>
                <p className="font-medium text-sm md:text-base">{claimData.location || "Kreuzung Hauptstraße / Bahnhofstraße, 12345 Musterstadt"}</p>
              </div>
            </div>
            
            <div className="mt-4">
              <span className="text-xs md:text-sm text-gray-600">Unfallhergang:</span>
              <div className="bg-gray-50 p-3 md:p-4 rounded-md mt-2">
                <p className="text-gray-800 leading-relaxed text-sm md:text-base text-left">{claimData.description}</p>
              </div>
            </div>

            {claimData.photos.length > 0 && (
              <div className="mt-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Camera className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                  <span className="text-xs md:text-sm font-medium text-gray-600">Schadenfotos ({claimData.photos.length})</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                  {claimData.photos.map((photo, index) => (
                    <div key={index} className="relative">
                      <img 
                        src={photo} 
                        alt={`Schaden ${index + 1}`}
                        className="w-full h-20 md:h-24 object-cover rounded-md border"
                      />
                      <div className="absolute top-1 right-1 bg-black bg-opacity-50 text-white text-xs px-1.5 py-0.5 md:px-2 md:py-1 rounded">
                        {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClaimPreview;
