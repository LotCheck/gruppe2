
import { Shield, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">AutoSchild</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">
              Leistungen
            </a>
            <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">
              Über uns
            </a>
            <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">
              Kontakt
            </a>
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
              Anmelden
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Kostenlos testen
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-white absolute left-0 right-0 shadow-lg">
            <div className="px-4 py-4 space-y-4">
              <a href="#features" className="block text-gray-600 hover:text-blue-600 transition-colors">
                Leistungen
              </a>
              <a href="#about" className="block text-gray-600 hover:text-blue-600 transition-colors">
                Über uns
              </a>
              <a href="#contact" className="block text-gray-600 hover:text-blue-600 transition-colors">
                Kontakt
              </a>
              <div className="pt-4 space-y-2">
                <Button variant="outline" className="w-full text-blue-600 border-blue-600 hover:bg-blue-50">
                  Anmelden
                </Button>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Kostenlos testen
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
