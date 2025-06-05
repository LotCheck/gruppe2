import React from 'react';
import { Mic, Camera, FileText, CheckCircle } from 'lucide-react';
interface StepNavigationProps {
  currentStep: number;
}
const StepNavigation = ({
  currentStep
}: StepNavigationProps) => {
  const steps = [{
    id: 'voice',
    title: 'Schaden beschreiben',
    shortTitle: 'Beschreibung',
    icon: Mic
  }, {
    id: 'photos',
    title: 'Fotos aufnehmen',
    shortTitle: 'Fotos',
    icon: Camera
  }, {
    id: 'analysis',
    title: 'KI-Analyse',
    shortTitle: 'Analyse',
    icon: FileText
  }, {
    id: 'preview',
    title: 'Bestätigung',
    shortTitle: 'Bestätigung',
    icon: CheckCircle
  }];
  return <div className="mb-6 max-w-4xl mx-auto px-2">
      {/* Mobile Progress Bar */}
      <div className="block md:hidden mb-4">
        
        <div className="mt-2 text-center">
          
          
        </div>
      </div>

      {/* Desktop Step Navigation */}
      <div className="hidden md:block">
        <div className="flex justify-between items-center">
          {steps.map((step, index) => <div key={step.id} className="flex items-center">
              <div className={`
                w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all
                ${index <= currentStep ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-gray-300 text-gray-400'}
              `}>
                <step.icon className="h-5 w-5" />
              </div>
              {index < steps.length - 1 && <div className={`
                  w-24 h-1 mx-4 transition-all
                  ${index < currentStep ? 'bg-blue-600' : 'bg-gray-300'}
                `} />}
            </div>)}
        </div>
        <div className="mt-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900">{steps[currentStep].title}</h2>
          <p className="text-gray-600 mt-1">Schritt {currentStep + 1} von {steps.length}</p>
        </div>
      </div>
    </div>;
};
export default StepNavigation;