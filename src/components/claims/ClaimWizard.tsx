
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import VoiceInput from './VoiceInput';
import PhotoAnalysis from './PhotoAnalysis';
import AIAssistant from './AIAssistant';
import ClaimPreview from './ClaimPreview';
import { Mic, Camera, FileText, CheckCircle } from 'lucide-react';

interface ClaimWizardProps {
  onClaimSubmitted: (claimId: string) => void;
}

const ClaimWizard = ({ onClaimSubmitted }: ClaimWizardProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [claimData, setClaimData] = useState({
    description: '',
    photos: [] as string[],
    location: '',
    dateTime: '',
    estimatedCost: 0,
    severity: 'minor' as 'minor' | 'moderate' | 'severe',
    recommendation: '',
    shouldReport: true
  });

  const steps = [
    { id: 'voice', title: 'Schaden beschreiben', icon: Mic },
    { id: 'photos', title: 'Fotos aufnehmen', icon: Camera },
    { id: 'analysis', title: 'KI-Analyse', icon: FileText },
    { id: 'preview', title: 'Bestätigung', icon: CheckCircle }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit claim
      const claimId = `CL-${Date.now()}`;
      onClaimSubmitted(claimId);
    }
  };

  const updateClaimData = (updates: Partial<typeof claimData>) => {
    setClaimData(prev => ({ ...prev, ...updates }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`
                w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all
                ${index <= currentStep 
                  ? 'bg-blue-600 border-blue-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-400'
                }
              `}>
                <step.icon className="h-5 w-5" />
              </div>
              {index < steps.length - 1 && (
                <div className={`
                  w-24 h-1 mx-4 transition-all
                  ${index < currentStep ? 'bg-blue-600' : 'bg-gray-300'}
                `} />
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900">{steps[currentStep].title}</h2>
          <p className="text-gray-600 mt-1">Schritt {currentStep + 1} von {steps.length}</p>
        </div>
      </div>

      {/* Step Content */}
      <Card className="mb-6 shadow-lg border-0">
        <CardContent className="p-8">
          {currentStep === 0 && (
            <VoiceInput 
              onDescriptionUpdate={(description) => updateClaimData({ description })}
              currentDescription={claimData.description}
            />
          )}
          
          {currentStep === 1 && (
            <PhotoAnalysis 
              onPhotosUpdate={(photos) => updateClaimData({ photos })}
              currentPhotos={claimData.photos}
            />
          )}
          
          {currentStep === 2 && (
            <AIAssistant 
              claimData={claimData}
              onAnalysisUpdate={updateClaimData}
            />
          )}
          
          {currentStep === 3 && (
            <ClaimPreview 
              claimData={claimData}
            />
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
        >
          Zurück
        </Button>
        <Button 
          onClick={handleNext}
          className="bg-blue-600 hover:bg-blue-700 px-8"
        >
          {currentStep === steps.length - 1 ? 'Schaden melden' : 'Weiter'}
        </Button>
      </div>
    </div>
  );
};

export default ClaimWizard;
