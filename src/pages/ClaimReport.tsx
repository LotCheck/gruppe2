
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ClaimStatus from '@/components/claims/ClaimStatus';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Plus, Mic, Camera, FileText, CheckCircle } from 'lucide-react';

const ClaimReport = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [claimId, setClaimId] = useState<string | null>(null);

  useEffect(() => {
    // Check if we're coming from a completed claim
    if (location.state?.claimId) {
      setClaimId(location.state.claimId);
    } else {
      // Check if there's an existing claim in localStorage
      const existingClaimId = localStorage.getItem('currentClaimId');
      if (existingClaimId) {
        setClaimId(existingClaimId);
      }
    }
  }, [location]);

  const steps = [
    { 
      id: 'voice', 
      title: 'Schaden beschreiben', 
      icon: Mic, 
      description: 'Sprechen Sie einfach über Ihren Unfall',
      path: '/claim-report/voice'
    },
    { 
      id: 'photos', 
      title: 'Fotos aufnehmen', 
      icon: Camera, 
      description: 'Dokumentieren Sie den Schaden mit Bildern',
      path: '/claim-report/photos'
    },
    { 
      id: 'analysis', 
      title: 'KI-Analyse', 
      icon: FileText, 
      description: 'Automatische Schadensbewertung und Empfehlungen',
      path: '/claim-report/analysis'
    },
    { 
      id: 'preview', 
      title: 'Bestätigung', 
      icon: CheckCircle, 
      description: 'Überprüfung vor der finalen Übermittlung',
      path: '/claim-report/preview'
    }
  ];

  if (claimId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-6">
          <div className="mb-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Zurück zur Startseite
            </Button>
          </div>
          <ClaimStatus claimId={claimId} />
          
          <div className="mt-8 text-center">
            <Button 
              onClick={() => {
                setClaimId(null);
                localStorage.removeItem('currentClaimId');
              }}
              variant="outline"
            >
              <Plus className="h-4 w-4 mr-2" />
              Neuen Schaden melden
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Zurück zur Startseite
          </Button>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Schaden melden</h1>
            <p className="text-gray-600 text-lg">
              Wählen Sie einen Schritt aus oder starten Sie mit der Schadensbeschreibung
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map((step, index) => (
              <Card 
                key={step.id} 
                className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-blue-300"
                onClick={() => navigate(step.path)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center">
                      <step.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{step.title}</h3>
                      <span className="text-sm text-gray-500">Schritt {index + 1}</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button 
              onClick={() => navigate('/claim-report/voice')}
              className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg"
              size="lg"
            >
              Schadensmeldung starten
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimReport;
