
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import AIAssistant from '@/components/claims/AIAssistant';
import StepNavigation from '@/components/claims/StepNavigation';
import Header from '@/components/Header';

const ClaimAnalysisStep = () => {
  const navigate = useNavigate();

  const getClaimData = () => {
    return {
      description: localStorage.getItem('claimDescription') || '',
      photos: JSON.parse(localStorage.getItem('claimPhotos') || '[]'),
      location: localStorage.getItem('claimLocation') || '',
      dateTime: localStorage.getItem('claimDateTime') || '',
      estimatedCost: parseInt(localStorage.getItem('claimEstimatedCost') || '0'),
      severity: (localStorage.getItem('claimSeverity') || 'minor') as 'minor' | 'moderate' | 'severe',
      recommendation: localStorage.getItem('claimRecommendation') || '',
      shouldReport: localStorage.getItem('claimShouldReport') === 'true'
    };
  };

  const handleAnalysisUpdate = (updates: any) => {
    Object.entries(updates).forEach(([key, value]) => {
      if (key === 'photos') {
        localStorage.setItem(`claim${key.charAt(0).toUpperCase() + key.slice(1)}`, JSON.stringify(value));
      } else {
        localStorage.setItem(`claim${key.charAt(0).toUpperCase() + key.slice(1)}`, String(value));
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
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

        <StepNavigation currentStep={2} />

        <Card className="mb-6 shadow-lg border-0 max-w-4xl mx-auto">
          <CardContent className="p-8">
            <AIAssistant 
              claimData={getClaimData()}
              onAnalysisUpdate={handleAnalysisUpdate}
            />
          </CardContent>
        </Card>

        <div className="flex justify-between max-w-4xl mx-auto">
          <Button 
            variant="outline" 
            onClick={() => navigate('/claim-report/photos')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Zurück
          </Button>
          <Button 
            onClick={() => navigate('/claim-report/preview')}
            className="bg-blue-600 hover:bg-blue-700 px-8"
          >
            Zur Vorschau
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClaimAnalysisStep;
