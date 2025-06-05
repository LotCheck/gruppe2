
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Edit3, XCircle, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ContractOverview = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Contract Information Card */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold" style={{ color: '#333333' }}>
            Ihre KFZ-Versicherung
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-sm uppercase tracking-wide" style={{ color: '#0563C1' }}>
                  Versicherungsnehmer
                </h3>
                <p className="text-lg" style={{ color: '#333333' }}>Max Mustermann</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-sm uppercase tracking-wide" style={{ color: '#0563C1' }}>
                  Versicherungsstart
                </h3>
                <p className="text-lg" style={{ color: '#333333' }}>01.01.2024</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-sm uppercase tracking-wide" style={{ color: '#0563C1' }}>
                  Tarifname
                </h3>
                <p className="text-lg" style={{ color: '#333333' }}>Vollkasko Plus</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-sm uppercase tracking-wide" style={{ color: '#0563C1' }}>
                  Versicherungsgesellschaft
                </h3>
                <p className="text-lg" style={{ color: '#333333' }}>AutoSchild Versicherung AG</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-sm uppercase tracking-wide" style={{ color: '#0563C1' }}>
                  Schutzlevel
                </h3>
                <p className="text-lg" style={{ color: '#333333' }}>Premium</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-sm uppercase tracking-wide" style={{ color: '#0563C1' }}>
                  Deckungssumme
                </h3>
                <p className="text-lg" style={{ color: '#333333' }}>100 Mio. €</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-sm uppercase tracking-wide" style={{ color: '#0563C1' }}>
                  Selbstbeteiligung
                </h3>
                <p className="text-lg" style={{ color: '#333333' }}>500 €</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-sm uppercase tracking-wide" style={{ color: '#0563C1' }}>
                  Fahrzeug
                </h3>
                <p className="text-lg" style={{ color: '#333333' }}>BMW 3er, 2022</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-4">
        {/* Primary CTA - Schaden melden */}
        <Button 
          onClick={() => navigate('/claim-report')}
          size="lg"
          className="w-full text-white text-lg py-4 hover:opacity-90"
          style={{ backgroundColor: '#0563C1' }}
        >
          <FileText className="h-6 w-6 mr-3" />
          Schaden melden
        </Button>
        
        {/* Secondary CTAs */}
        <div className="grid md:grid-cols-3 gap-4">
          <Button 
            variant="outline"
            size="lg"
            className="py-3 border-2 hover:bg-gray-50"
            style={{ borderColor: '#0563C1', color: '#0563C1' }}
            disabled
          >
            <Edit3 className="h-5 w-5 mr-2" />
            Informationen bearbeiten
          </Button>
          
          <Button 
            variant="outline"
            size="lg"
            className="py-3 border-2 hover:bg-gray-50"
            style={{ borderColor: '#0563C1', color: '#0563C1' }}
            disabled
          >
            <XCircle className="h-5 w-5 mr-2" />
            Vertrag kündigen
          </Button>
          
          <Button 
            variant="outline"
            size="lg"
            className="py-3 border-2 hover:bg-gray-50"
            style={{ borderColor: '#0563C1', color: '#0563C1' }}
            disabled
          >
            <HelpCircle className="h-5 w-5 mr-2" />
            Hilfe & Support
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContractOverview;
