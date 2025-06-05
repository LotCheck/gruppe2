
import React, { useState } from 'react';
import ClaimWizard from '@/components/claims/ClaimWizard';
import ClaimStatus from '@/components/claims/ClaimStatus';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ClaimReport = () => {
  const [currentStep, setCurrentStep] = useState<'wizard' | 'status'>('wizard');
  const [claimId, setClaimId] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleClaimSubmitted = (id: string) => {
    setClaimId(id);
    setCurrentStep('status');
  };

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

        {currentStep === 'wizard' ? (
          <ClaimWizard onClaimSubmitted={handleClaimSubmitted} />
        ) : (
          <ClaimStatus claimId={claimId!} />
        )}
      </div>
    </div>
  );
};

export default ClaimReport;
