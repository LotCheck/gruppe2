
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import PhotoAnalysis from '@/components/claims/PhotoAnalysis';
import StepNavigation from '@/components/claims/StepNavigation';

const ClaimPhotosStep = () => {
  const navigate = useNavigate();

  const handlePhotosUpdate = (photos: string[]) => {
    localStorage.setItem('claimPhotos', JSON.stringify(photos));
  };

  const currentPhotos = JSON.parse(localStorage.getItem('claimPhotos') || '[]');

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

        <StepNavigation currentStep={1} />

        <Card className="mb-6 shadow-lg border-0 max-w-4xl mx-auto">
          <CardContent className="p-8">
            <PhotoAnalysis 
              onPhotosUpdate={handlePhotosUpdate}
              currentPhotos={currentPhotos}
            />
          </CardContent>
        </Card>

        <div className="flex justify-between max-w-4xl mx-auto">
          <Button 
            variant="outline" 
            onClick={() => navigate('/claim-report/voice')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Zurück
          </Button>
          <Button 
            onClick={() => navigate('/claim-report/analysis')}
            className="bg-blue-600 hover:bg-blue-700 px-8"
            disabled={currentPhotos.length === 0}
          >
            Weiter zur Analyse
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClaimPhotosStep;
