
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import ClaimPreview from '@/components/claims/ClaimPreview';
import StepNavigation from '@/components/claims/StepNavigation';
import Header from '@/components/Header';

const ClaimPreviewStep = () => {
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

  const handleSubmit = () => {
    // Generate claim ID and redirect to status page
    const claimId = `CL-${Date.now()}`;
    localStorage.setItem('currentClaimId', claimId);
    
    // Clear the form data
    localStorage.removeItem('claimDescription');
    localStorage.removeItem('claimPhotos');
    localStorage.removeItem('claimLocation');
    localStorage.removeItem('claimDateTime');
    localStorage.removeItem('claimEstimatedCost');
    localStorage.removeItem('claimSeverity');
    localStorage.removeItem('claimRecommendation');
    localStorage.removeItem('claimShouldReport');
    
    // Navigate to the main claim page which will show status
    navigate('/claim-report', { state: { claimId } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      <div className="container mx-auto px-4 py-4 md:py-6">
        <div className="mb-4 md:mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/claim-report')}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Zurück zur Übersicht
          </Button>
        </div>

        <StepNavigation currentStep={3} />

        <Card className="mb-4 md:mb-6 shadow-lg border-0 max-w-4xl mx-auto">
          <CardContent className="p-4 md:p-8">
            <ClaimPreview claimData={getClaimData()} />
          </CardContent>
        </Card>

        <div className="flex flex-col space-y-3 md:flex-row md:justify-between md:space-y-0 max-w-4xl mx-auto px-4">
          <Button 
            variant="outline" 
            onClick={() => navigate('/claim-report/analysis')}
            className="w-full md:w-auto"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Zurück
          </Button>
          <Button 
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700 px-8 w-full md:w-auto"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Schaden melden
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClaimPreviewStep;
