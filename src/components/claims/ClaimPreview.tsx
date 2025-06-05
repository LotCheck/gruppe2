
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, FileText, Camera, MessageSquare, User, Car, Clock, MapPin, Users, AlertTriangle, Euro } from 'lucide-react';

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

  // Mock data - in a real app this would come from the form or API
  const mockPolicyholderData = {
    name: "Max Mustermann",
    policyNumber: "VN-2024-001234",
    address: "Musterstraße 123, 12345 Musterstadt",
    phone: "+49 151 12345678",
    email: "max.mustermann@email.de"
  };

  const mockVehicleData = {
    licensePlate: "M-AB 1234",
    make: "BMW",
    model: "320d",
    year: "2020",
    vin: "WBA1234567890123",
    color: "Schwarz Metallic"
  };

  const mockThirdParties = [
    {
      name: "Lisa Schmidt",
      licensePlate: "B-CD 5678",
      insurance: "DEVK Versicherung",
      phone: "+49 160 98765432"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">Schadensmeldung - Vollständige Zusammenfassung</h3>
        <p className="text-gray-600">
          Überprüfen Sie alle Angaben vor der finalen Übermittlung an Ihre Versicherung.
        </p>
      </div>

      {/* Versicherungsnehmer */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5 text-blue-600" />
            <span>Angaben zum Versicherungsnehmer</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-gray-600">Name:</span>
              <p className="font-medium">{mockPolicyholderData.name}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Versicherungsnummer:</span>
              <p className="font-medium">{mockPolicyholderData.policyNumber}</p>
            </div>
            <div className="md:col-span-2">
              <span className="text-sm text-gray-600">Adresse:</span>
              <p className="font-medium">{mockPolicyholderData.address}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Telefon:</span>
              <p className="font-medium">{mockPolicyholderData.phone}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">E-Mail:</span>
              <p className="font-medium">{mockPolicyholderData.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fahrzeugdaten */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Car className="h-5 w-5 text-blue-600" />
            <span>Angaben zum Fahrzeug</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <span className="text-sm text-gray-600">Kennzeichen:</span>
              <p className="font-medium">{mockVehicleData.licensePlate}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Marke:</span>
              <p className="font-medium">{mockVehicleData.make}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Modell:</span>
              <p className="font-medium">{mockVehicleData.model}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Baujahr:</span>
              <p className="font-medium">{mockVehicleData.year}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Farbe:</span>
              <p className="font-medium">{mockVehicleData.color}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Fahrgestellnummer:</span>
              <p className="font-medium text-xs">{mockVehicleData.vin}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Unfallzeitpunkt und Ort */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-blue-600" />
            <span>Unfallzeitpunkt und Ort</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-gray-600">Datum und Uhrzeit:</span>
              <p className="font-medium">{claimData.dateTime || "15.01.2024, 14:30 Uhr"}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Unfallort:</span>
              <p className="font-medium">{claimData.location || "Kreuzung Hauptstraße / Bahnhofstraße, 12345 Musterstadt"}</p>
            </div>
            <div className="md:col-span-2">
              <span className="text-sm text-gray-600">Wetterbedingungen:</span>
              <p className="font-medium">Trocken, gute Sicht</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Beteiligte Dritte */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-blue-600" />
            <span>Beteiligte Dritte</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {mockThirdParties.map((party, index) => (
            <div key={index} className="border-l-4 border-blue-200 pl-4 mb-4 last:mb-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-600">Name:</span>
                  <p className="font-medium">{party.name}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Kennzeichen:</span>
                  <p className="font-medium">{party.licensePlate}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Versicherung:</span>
                  <p className="font-medium">{party.insurance}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Telefon:</span>
                  <p className="font-medium">{party.phone}</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Unfallhergang */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5 text-blue-600" />
            <span>Unfallhergang / Unfallbericht</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-gray-800 leading-relaxed">{claimData.description}</p>
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-md">
            <h5 className="font-medium text-blue-800 mb-2">Zusätzliche Informationen:</h5>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Geschwindigkeit zum Unfallzeitpunkt: ca. 30 km/h</li>
              <li>• Bremsspuren vorhanden: Ja</li>
              <li>• Polizei vor Ort: Nein</li>
              <li>• Zeugen vorhanden: Ja (siehe Anlage)</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Schadenszusammenfassung mit Fotos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Camera className="h-5 w-5 text-blue-600" />
            <span>Schadenszusammenfassung inkl. Fotos</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <h5 className="font-medium mb-3">Schadensbeschreibung:</h5>
            <div className="bg-gray-50 p-4 rounded-md">
              <ul className="space-y-2 text-sm">
                <li>• <strong>Linker Kotflügel:</strong> Lackschäden und Dellen (ca. 15cm x 8cm)</li>
                <li>• <strong>Linke Fahrzeugtür:</strong> Verformung, Tür schließt schwergängig</li>
                <li>• <strong>Außenspiegel links:</strong> Gehäuse beschädigt, Glas gesprungen</li>
                <li>• <strong>Schwellerbereich:</strong> Leichte Kratzer und Schrammen</li>
              </ul>
            </div>
          </div>

          {claimData.photos.length > 0 && (
            <div>
              <h5 className="font-medium mb-3">Schadenfotos ({claimData.photos.length})</h5>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {claimData.photos.map((photo, index) => (
                  <div key={index} className="relative">
                    <img 
                      src={photo} 
                      alt={`Schaden ${index + 1}`}
                      className="w-full h-24 object-cover rounded-md border"
                    />
                    <div className="absolute top-1 right-1 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                      {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Schlussfolgerung */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-blue-800">
            <AlertTriangle className="h-5 w-5" />
            <span>Schlussfolgerung und Bewertung</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Geschätzter Schaden */}
            <div>
              <h5 className="font-medium mb-3 text-blue-800">Geschätzter Schaden</h5>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Badge className={severityColors[claimData.severity]}>
                    {severityLabels[claimData.severity]}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Euro className="h-4 w-4 text-blue-600" />
                  <span className="text-lg font-bold text-blue-600">€{claimData.estimatedCost}</span>
                </div>
                <div className="text-sm text-blue-700">
                  <p>Aufschlüsselung:</p>
                  <ul className="mt-1 space-y-1">
                    <li>• Lackierung: €800</li>
                    <li>• Ausbeularbeiten: €600</li>
                    <li>• Spiegelersatz: €150</li>
                    <li>• Arbeitszeit: €450</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Empfehlung */}
            <div>
              <h5 className="font-medium mb-3 text-blue-800">Empfehlung</h5>
              <div className={`p-4 rounded-md ${claimData.shouldReport ? 'bg-green-100' : 'bg-yellow-100'}`}>
                <p className={`text-sm mb-3 ${claimData.shouldReport ? 'text-green-700' : 'text-yellow-700'}`}>
                  {claimData.recommendation}
                </p>
                <div className="text-sm space-y-1">
                  <h6 className="font-medium">Nächste Schritte:</h6>
                  <ul className="space-y-1">
                    <li>• Sachverständigengutachten einholen</li>
                    <li>• Reparatur in Vertragswerkstatt</li>
                    <li>• Mietwagen bei Bedarf</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Was passiert als Nächstes */}
      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800">Was passiert als Nächstes?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-sm font-bold">1</span>
              </div>
              <div>
                <h5 className="font-medium text-green-800">Sofortige Bestätigung (jetzt)</h5>
                <p className="text-green-700 text-sm">Sie erhalten eine Bestätigung und Ihre Schadennummer CL-{Date.now()} per E-Mail.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-sm font-bold">2</span>
              </div>
              <div>
                <h5 className="font-medium text-green-800">Automatische Weiterleitung (24h)</h5>
                <p className="text-green-700 text-sm">Ihr Schaden wird automatisch an Ihre Versicherung und die Gegenseite übermittelt.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-sm font-bold">3</span>
              </div>
              <div>
                <h5 className="font-medium text-green-800">Sachverständigentermin (2-3 Werktage)</h5>
                <p className="text-green-700 text-sm">Ein Gutachter wird sich mit Ihnen in Verbindung setzen.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-sm font-bold">4</span>
              </div>
              <div>
                <h5 className="font-medium text-green-800">Schadensregulierung (5-10 Werktage)</h5>
                <p className="text-green-700 text-sm">Nach dem Gutachten erfolgt die Freigabe der Reparatur und Kostenübernahme.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClaimPreview;
