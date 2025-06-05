
import { Button } from '@/components/ui/button';
import { ArrowRight, Download } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-20" style={{ background: `linear-gradient(135deg, #022D94 0%, #064E9C 100%)` }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Bereit für eine bessere KFZ-Versicherung?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Laden Sie jetzt die AutoSchild App herunter und erleben Sie, 
            wie einfach Versicherung sein kann. Kostenlos und unverbindlich.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-white hover:bg-gray-100 text-lg px-8 py-4 group"
              style={{ color: '#022D94' }}
            >
              <Download className="h-5 w-5 mr-2 group-hover:animate-bounce" />
              App herunterladen
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white text-lg px-8 py-4 group"
              style={{ '--tw-hover-bg': 'white', '--tw-hover-text': '#022D94' } as any}
            >
              Kostenlos registrieren
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="mt-12 flex justify-center items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm opacity-80">Kostenlos</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm opacity-80">Unverbindlich</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm opacity-80">Jederzeit kündbar</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
