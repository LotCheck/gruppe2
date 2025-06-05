
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="shadow-sm border-b sticky top-0 z-50" style={{ backgroundColor: '#022D94' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-16">
          {/* Centered Title */}
          <span className="text-xl font-bold text-white">CHECK24 KfZ-Versicherung</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
