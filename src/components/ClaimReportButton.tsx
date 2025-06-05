
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ClaimReportButton = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-6 text-center">
      <div className="mb-4">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="h-8 w-8 text-red-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Schaden melden</h3>
        <p className="text-gray-600 mb-6">
          Schnelle und einfache Schadensmeldung mit KI-Unterstützung. 
          Sprechen Sie einfach, was passiert ist - wir kümmern uns um den Rest.
        </p>
      </div>
      
      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>Sprachgesteuerte Erfassung</span>
        </div>
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>Automatische Schadenanalyse</span>
        </div>
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>Sofortige Kostenschätzung</span>
        </div>
      </div>
      
      <Button 
        onClick={() => navigate('/claim-report')}
        size="lg"
        className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 group"
      >
        <FileText className="h-5 w-5 mr-2" />
        Jetzt Schaden melden
        <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
      </Button>
    </div>
  );
};

export default ClaimReportButton;
