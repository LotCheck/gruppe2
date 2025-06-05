
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, FileText, Download, Home, Clock, MessageSquare, ArrowLeft } from 'lucide-react';

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
    navigate('/claim-report', {
      state: {
        claimId
      }
    });
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/claim-report')}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Zurück
          </Button>
        </div>

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
              </div>
            </CardContent>
          </Card>

          {/* Status Card - Updated to show current status */}
          <Card className="mb-6 shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Aktueller Status Ihres Schadenantrag</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-green-800">E-Mail Bestätigung erhalten ✓</p>
                    <p className="text-sm text-green-600">Bestätigung mit allen Details wurde gesendet</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-500">Sachbearbeiter Zuweisung</p>
                    <p className="text-sm text-gray-400">Ein persönlicher Ansprechpartner wird Ihnen zugewiesen</p>
                    <p className="text-xs text-gray-400 mt-1">Erwartet innerhalb von 24h</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-gray-500">Gutachtertermin</p>
                    <p className="text-sm text-gray-400">Bei Bedarf wird ein Gutachtertermin vereinbart</p>
                    <p className="text-xs text-gray-400 mt-1">Erwartet in 2-3 Tagen nach Sachbearbeiter-Zuweisung</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Document Download */}
          <Card className="bg-gray-50 shadow-lg">
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
