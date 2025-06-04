
import { Button } from '@/components/ui/button';
import { Car, Shield, Smartphone } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              KFZ-Versicherung
              <span className="text-blue-600 block">neu gedacht</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Verwalten Sie Ihre Autoversicherung komplett digital. Schnell, transparent und 
              immer in Ihrer Hosentasche - mit der AutoSchild App.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4">
                Jetzt App herunterladen
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-blue-600 border-blue-600 hover:bg-blue-50 text-lg px-8 py-4"
              >
                Mehr erfahren
              </Button>
            </div>
            
            {/* Trust indicators */}
            <div className="mt-12 flex items-center justify-center lg:justify-start space-x-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">50k+</div>
                <div className="text-sm text-gray-600">Zufriedene Kunden</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">4.8★</div>
                <div className="text-sm text-gray-600">App Store Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">24/7</div>
                <div className="text-sm text-gray-600">Support</div>
              </div>
            </div>
          </div>

          {/* Visual Content */}
          <div className="relative">
            <div className="relative mx-auto w-80 h-96 lg:w-96 lg:h-[500px]">
              {/* Phone mockup */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 rounded-[3rem] shadow-2xl transform rotate-2">
                <div className="absolute inset-2 bg-white rounded-[2.5rem] overflow-hidden">
                  <div className="h-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Smartphone className="h-16 w-16 mx-auto mb-4 opacity-80" />
                      <div className="text-lg font-semibold">AutoSchild</div>
                      <div className="text-sm opacity-80">Ihre KFZ-App</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -left-4 bg-white rounded-xl shadow-lg p-4 animate-float">
                <Car className="h-8 w-8 text-blue-600" />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-4 animate-float" style={{animationDelay: '1s'}}>
                <Shield className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 -z-10">
        <div className="w-96 h-96 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
      </div>
      <div className="absolute bottom-0 left-0 -z-10">
        <div className="w-96 h-96 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
      </div>
    </section>
  );
};

export default HeroSection;
