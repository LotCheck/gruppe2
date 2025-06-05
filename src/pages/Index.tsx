
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { User, Calendar, FileText, Building, Edit3, XCircle, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Contract Overview */}
        <Card className="mb-8 shadow-lg">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-6" style={{ color: '#333333' }}>
              Ihre Vertragsübersicht
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5" style={{ color: '#0563C1' }} />
                  <div>
                    <p className="text-sm text-gray-500">Versicherungsnehmer</p>
                    <p className="font-medium" style={{ color: '#333333' }}>Max Mustermann</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5" style={{ color: '#0563C1' }} />
                  <div>
                    <p className="text-sm text-gray-500">Versicherungsbeginn</p>
                    <p className="font-medium" style={{ color: '#333333' }}>01.01.2024</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5" style={{ color: '#0563C1' }} />
                  <div>
                    <p className="text-sm text-gray-500">Tarifname</p>
                    <p className="font-medium" style={{ color: '#333333' }}>Vollkasko Premium</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Building className="h-5 w-5" style={{ color: '#0563C1' }} />
                  <div>
                    <p className="text-sm text-gray-500">Versicherungsgesellschaft</p>
                    <p className="font-medium" style={{ color: '#333333' }}>Cosmos Direkt</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5" style={{ color: '#0563C1' }} />
                  <div>
                    <p className="text-sm text-gray-500">Vertragsnummer</p>
                    <p className="font-medium" style={{ color: '#333333' }}>KFZ-2024-001234</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTAs */}
        <div className="space-y-4">
          {/* Primary CTA - Schaden melden */}
          <Button 
            onClick={() => navigate('/claim-report')}
            size="lg"
            className="w-full h-16 text-lg font-semibold text-white shadow-lg hover:opacity-90"
            style={{ backgroundColor: '#0563C1' }}
          >
            <FileText className="h-6 w-6 mr-3" />
            Schaden melden
          </Button>
          
          {/* Secondary CTAs */}
          <div className="grid md:grid-cols-3 gap-4">
            <Button 
              variant="outline"
              className="h-14 font-medium border-2 hover:bg-gray-50"
              style={{ borderColor: '#0563C1', color: '#0563C1' }}
            >
              <Edit3 className="h-5 w-5 mr-2" />
              Informationen bearbeiten
            </Button>
            
            <Button 
              variant="outline"
              className="h-14 font-medium border-2 hover:bg-gray-50"
              style={{ borderColor: '#0563C1', color: '#0563C1' }}
            >
              <XCircle className="h-5 w-5 mr-2" />
              Vertrag kündigen
            </Button>
            
            <Button 
              variant="outline"
              className="h-14 font-medium border-2 hover:bg-gray-50"
              style={{ borderColor: '#0563C1', color: '#0563C1' }}
            >
              <HelpCircle className="h-5 w-5 mr-2" />
              Hilfe & Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
