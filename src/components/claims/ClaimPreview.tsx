
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, FileText, Camera, MessageSquare } from 'lucide-react';

interface ClaimData {
  description: string;
  photos: string[];
  estimatedCost: number;
  severity: 'minor' | 'moderate' | 'severe';
  recommendation: string;
  shouldReport: boolean;
}

interface ClaimPreviewProps {
  claimData: ClaimData;
}

const ClaimPreview = ({ claimData }: ClaimPreviewProps) => {
  const severityColors = {
    minor: 'bg-green-100 text-green-800',
    moderate: 'bg-yellow-100 text-yellow-800', 
    severe: 'bg-red-100 text-red-800'
  };

  const severityLabels = {
    minor: 'Geringer Schaden',
    moderate: 'Mittlerer Schaden',
    severe: 'Schwerer Schaden'
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">Schadensmeldung bestätigen</h3>
        <p className="text-gray-600">
          Überprüfen Sie alle Angaben vor der finalen Übermittlung an Ihre Versicherung.
        </p>
      </div>

      {/* Summary Card */}
      <Card className="border-2 border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="h-6 w-6 text-blue-600" />
            <span>Zusammenfassung</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Schadendetails</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Badge className={severityColors[claimData.severity]}>
                    {severityLabels[claimData.severity]}
                  </Badge>
                </div>
                <div>
                  <span className="text-gray-600">Geschätzte Kosten:</span>
                  <span className="ml-2 font-medium text-blue-600">€{claimData.estimatedCost}</span>
                </div>
                <div>
                  <span className="text-gray-600">Anzahl Fotos:</span>
                  <span className="ml-2 font-medium">{claimData.photos.length}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Empfehlung</h4>
              <div className={`p-3 rounded-md ${claimData.shouldReport ? 'bg-green-100' : 'bg-yellow-100'}`}>
                <p className={`text-sm ${claimData.shouldReport ? 'text-green-700' : 'text-yellow-700'}`}>
                  {claimData.recommendation}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Description Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5" />
            <span>Schadensbeschreibung</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-gray-800">{claimData.description}</p>
          </div>
        </CardContent>
      </Card>

      {/* Photos Preview */}
      {claimData.photos.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Camera className="h-5 w-5" />
              <span>Schadenfotos ({claimData.photos.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {claimData.photos.map((photo, index) => (
                <div key={index} className="relative">
                  <img 
                    src={photo} 
                    alt={`Schaden ${index + 1}`}
                    className="w-full h-24 object-cover rounded-md border"
                  />
                  <div className="absolute top-1 right-1 bg-black bg-opacity-50 text-white text-xs px-1 rounded">
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Generated Report Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Automatisch generierter Bericht</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-4 rounded-md space-y-4">
            <div>
              <h5 className="font-medium mb-2">Schadenshergang:</h5>
              <p className="text-sm text-gray-700">
                Basierend auf der Beschreibung und Fotoanalyse wurde ein Kotflügelschaden an der linken Fahrzeugseite 
                festgestellt. Der Schaden entstand vermutlich durch einen Spurwechsel-Unfall mit einem anderen Fahrzeug.
              </p>
            </div>
            
            <div>
              <h5 className="font-medium mb-2">Technische Analyse:</h5>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Lackschäden am linken Kotflügel (ca. 15cm x 8cm)</li>
                <li>• Leichte Verformung der Karosserie</li>
                <li>• Türfunktion beeinträchtigt</li>
                <li>• Keine strukturellen Schäden erkennbar</li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-medium mb-2">Empfohlene Maßnahmen:</h5>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Professionelle Begutachtung durch Kfz-Sachverständigen</li>
                <li>• Reparatur in zertifizierter Fachwerkstatt</li>
                <li>• Lackierung im Originalfarbton</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* What happens next */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800">Was passiert als Nächstes?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs">1</span>
              </div>
              <div>
                <h5 className="font-medium text-blue-800">Sofortige Bestätigung</h5>
                <p className="text-blue-700">Sie erhalten eine Bestätigung und Ihre Schadennummer per E-Mail.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs">2</span>
              </div>
              <div>
                <h5 className="font-medium text-blue-800">Automatische Weiterleitung</h5>
                <p className="text-blue-700">Ihr Schaden wird automatisch an Ihre Versicherung übermittelt.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs">3</span>
              </div>
              <div>
                <h5 className="font-medium text-blue-800">Proaktive Updates</h5>
                <p className="text-blue-700">Sie werden automatisch über jeden Bearbeitungsschritt informiert.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClaimPreview;
