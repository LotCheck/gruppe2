
import { Smartphone, FileText, HeadphonesIcon, Zap, Shield, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const FeaturesSection = () => {
  const features = [
    {
      icon: Smartphone,
      title: "Mobile App",
      description: "Verwalten Sie alles bequem über Ihr Smartphone - jederzeit und überall."
    },
    {
      icon: FileText,
      title: "Digitale Schadensmeldung",
      description: "Schäden in wenigen Klicks melden. Mit Foto-Upload und GPS-Standort."
    },
    {
      icon: Zap,
      title: "Sofort-Tarife",
      description: "Erhalten Sie in Sekunden personalisierte Angebote für Ihre KFZ-Versicherung."
    },
    {
      icon: Shield,
      title: "Vollkasko-Schutz",
      description: "Umfassender Schutz für Ihr Fahrzeug mit transparenten Konditionen."
    },
    {
      icon: HeadphonesIcon,
      title: "24/7 Support",
      description: "Rund um die Uhr erreichbarer Kundenservice für alle Ihre Anliegen."
    },
    {
      icon: Clock,
      title: "Schnelle Abwicklung",
      description: "Ultraschnelle Schadenregulierung - meist innerhalb von 48 Stunden."
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Alles was Sie brauchen
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Unsere App bietet Ihnen alle wichtigen Funktionen für eine moderne 
            KFZ-Versicherung - einfach, schnell und transparent.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-white"
            >
              <CardContent className="p-8 text-center">
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
