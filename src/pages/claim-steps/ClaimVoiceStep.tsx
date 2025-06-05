
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Mic } from 'lucide-react';
import VoiceInput from '@/components/claims/VoiceInput';
import StepNavigation from '@/components/claims/StepNavigation';

const ClaimVoiceStep = () => {
  const navigate = useNavigate();

  const handleDescriptionUpdate = (description: string) => {
    // Store in localStorage or context for now
    localStorage.setItem('claimDescription', description);
  };

  const currentDescription = localStorage.getItem('claimDescription') || '';

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
            Zurück zur Übersicht
          </Button>
        </div>

        <StepNavigation currentStep={0} />

        <Card className="mb-6 shadow-lg border-0 max-w-4xl mx-auto">
          <CardContent className="p-8">
            <VoiceInput 
              onDescriptionUpdate={handleDescriptionUpdate}
              currentDescription={currentDescription}
            />
          </CardContent>
        </Card>

        <div className="flex justify-between max-w-4xl mx-auto">
          <Button 
            variant="outline" 
            onClick={() => navigate('/claim-report')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Abbrechen
          </Button>
          <Button 
            onClick={() => navigate('/claim-report/photos')}
            className="bg-blue-600 hover:bg-blue-700 px-8"
            disabled={!currentDescription}
          >
            Weiter zu Fotos
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClaimVoiceStep;
