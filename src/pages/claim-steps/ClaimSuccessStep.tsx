
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, FileText, Download, Home, Clock, MessageSquare } from 'lucide-react';

const ClaimSuccessStep = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [claimId, setClaimId] = useState<string>('');

  useEffect(() => {
    // Get claim ID from location state or localStorage
    const id = location.state?.claimId || localStorage.getItem('currentClaimId') || `CL-${Date.now()}`;
    setClaimId(id);
    
    // Store the claim ID for later use
    localStorage.setItem('currentClaimId', id);
  }, [location]);

  const handleViewStatus = () => {
    navigate('/claim-report', { state: { claimId } });
  };

  const handleNewClaim = () => {
    // Clear current claim data
    localStorage.removeItem('currentClaimId');
    localStorage.removeItem('claimDescription');
    localStorage.removeItem('claimPhotos');
    localStorage.removeItem('claimLocation');
    localStorage.removeItem('claimDateTime');
    localStorage.removeItem('claimEstimatedCost');
    localStorage.removeItem('claimSeverity');
    localStorage.removeItem('claimRecommendation');
    localStorage.removeItem('claimShouldReport');
    
    navigate('/claim-report');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-green-800 mb-2">
              Schaden erfolgreich gemeldet!
            </h1>
            <p className="text-green-700 text-lg">
              Ihre Schadensmeldung wurde erfolgreich übermittelt.
            </p>
          </div>

          {/* Claim Details Card */}
          <Card className="mb-6 border-green-200 shadow-lg">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Ihre Schadennummer
                </h2>
                <div className="bg-green-100 border-2 border-green-300 rounded-lg p-4">
                  <span className="text-2xl font-bold text-green-800">{claimId}</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Notieren Sie sich diese Nummer für Ihre Unterlagen
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-800">Automatische Weiterleitung</p>
                    <p className="text-sm text-green-600">Wird an Ihre Versicherung übermittelt</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-800">Bearbeitungszeit</p>
                    <p className="text-sm text-blue-600">Sachbearbeiter kontaktiert Sie innerhalb von 24h</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                  <MessageSquare className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="font-medium text-orange-800">E-Mail Bestätigung</p>
                    <p className="text-sm text-orange-600">Bestätigung wird an Ihre E-Mail-Adresse gesendet</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps Card */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Was passiert als Nächstes?</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                    1
                  </div>
                  <div>
                    <p className="font-medium">E-Mail Bestätigung (sofort)</p>
                    <p className="text-sm text-gray-600">Sie erhalten eine Bestätigung mit allen Details</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Sachbearbeiter Zuweisung (24h)</p>
                    <p className="text-sm text-gray-600">Ein persönlicher Ansprechpartner wird Ihnen zugewiesen</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Gutachtertermin (2-3 Tage)</p>
                    <p className="text-sm text-gray-600">Bei Bedarf wird ein Gutachtertermin vereinbart</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              onClick={handleViewStatus}
              className="w-full bg-blue-600 hover:bg-blue-700 py-3 text-lg"
              size="lg"
            >
              <FileText className="h-5 w-5 mr-2" />
              Schadenstatus verfolgen
            </Button>
            
            <Button 
              onClick={handleNewClaim}
              variant="outline"
              className="w-full py-3"
              size="lg"
            >
              Neuen Schaden melden
            </Button>
            
            <Button 
              onClick={() => navigate('/')}
              variant="ghost"
              className="w-full py-3"
              size="lg"
            >
              <Home className="h-5 w-5 mr-2" />
              Zur Startseite
            </Button>
          </div>

          {/* Document Download */}
          <Card className="mt-6 bg-gray-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-800">Schadensmeldung als PDF</p>
                    <p className="text-sm text-gray-600">Vollständige Dokumentation zum Download</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Herunterladen
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClaimSuccessStep;
