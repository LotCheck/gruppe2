
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
      <div className="container mx-auto px-2 md:px-4 py-4 md:py-6">
        <div className="mb-4 md:mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/claim-report')}
            className="text-gray-600 hover:text-gray-900 p-2 md:p-3"
          >
            <ArrowLeft className="h-4 w-4 mr-1 md:mr-2" />
            <span className="hidden sm:inline">Zurück zur Übersicht</span>
            <span className="sm:hidden">Zurück</span>
          </Button>
        </div>

        <StepNavigation currentStep={1} />

        <Card className="mb-4 md:mb-6 shadow-lg border-0 max-w-4xl mx-auto">
          <CardContent className="p-4 md:p-8">
            <PhotoAnalysis 
              onPhotosUpdate={handlePhotosUpdate}
              currentPhotos={currentPhotos}
            />
          </CardContent>
        </Card>

        {/* Mobile-optimized fixed bottom navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 md:relative md:border-t-0 md:bg-transparent md:p-0">
          <div className="flex justify-between max-w-4xl mx-auto">
            <Button 
              variant="outline" 
              onClick={() => navigate('/claim-report/voice')}
              className="flex-1 mr-2 md:flex-none md:mr-0"
            >
              <ArrowLeft className="h-4 w-4 mr-1 md:mr-2" />
              <span className="hidden sm:inline">Zurück</span>
              <span className="sm:hidden">Zurück</span>
            </Button>
            <Button 
              onClick={() => navigate('/claim-report/analysis')}
              className="bg-blue-600 hover:bg-blue-700 flex-1 ml-2 md:flex-none md:ml-0 md:px-8"
              disabled={currentPhotos.length === 0}
            >
              <span className="hidden sm:inline">Weiter zur Analyse</span>
              <span className="sm:hidden">Weiter</span>
              <ArrowRight className="h-4 w-4 ml-1 md:ml-2" />
            </Button>
          </div>
        </div>

        {/* Add bottom padding on mobile to account for fixed navigation */}
        <div className="h-20 md:hidden" />
      </div>
    </div>
  );
};

export default ClaimPhotosStep;
