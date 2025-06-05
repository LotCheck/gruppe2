
import { Shield, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="shadow-sm border-b sticky top-0 z-50" style={{ backgroundColor: '#022D94' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-white" />
            <span className="text-xl font-bold text-white">AutoSchild</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-white/80 hover:text-white transition-colors">
              Leistungen
            </a>
            <a href="#about" className="text-white/80 hover:text-white transition-colors">
              Über uns
            </a>
            <a href="#contact" className="text-white/80 hover:text-white transition-colors">
              Kontakt
            </a>
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-[#022D94]">
              Anmelden
            </Button>
            <Button style={{ backgroundColor: '#064E9C' }} className="hover:opacity-90 text-white">
              Kostenlos testen
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:bg-white/10"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/20 absolute left-0 right-0 shadow-lg" style={{ backgroundColor: '#022D94' }}>
            <div className="px-4 py-4 space-y-4">
              <a href="#features" className="block text-white/80 hover:text-white transition-colors">
                Leistungen
              </a>
              <a href="#about" className="block text-white/80 hover:text-white transition-colors">
                Über uns
              </a>
              <a href="#contact" className="block text-white/80 hover:text-white transition-colors">
                Kontakt
              </a>
              <div className="pt-4 space-y-2">
                <Button variant="outline" className="w-full text-white border-white hover:bg-white hover:text-[#022D94]">
                  Anmelden
                </Button>
                <Button style={{ backgroundColor: '#064E9C' }} className="w-full hover:opacity-90 text-white">
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
