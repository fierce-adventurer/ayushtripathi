import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const DashboardNav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    // Changed w-[95%] to a safer w-[calc(100%-1rem)] sm:w-[95%] to prevent edge clipping on very small phones
    <nav className="fixed top-4 sm:top-6 left-1/2 transform -translate-x-1/2 z-50 w-[calc(100%-1rem)] sm:w-[95%] max-w-5xl">
      <div className="bg-zinc-950/90 backdrop-blur-md border border-zinc-800 rounded-xl p-2 flex items-center shadow-2xl relative">
        
        <button 
          onClick={toggleMenu}
          className="md:hidden px-2 sm:px-3 py-2 text-zinc-400 hover:text-white transition-colors focus:outline-none shrink-0"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <div className="hidden md:flex flex-1 items-center justify-evenly px-2">
          <a href="#about" className="px-3 py-2 rounded-lg text-sm font-mono font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors whitespace-nowrap">~/about</a>
          <a href="#experience" className="px-3 py-2 rounded-lg text-sm font-mono font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors whitespace-nowrap">~/experience</a>
          <a href="#projects" className="px-3 py-2 rounded-lg text-sm font-mono font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors whitespace-nowrap">~/projects</a>
          <a href="#metrics" className="px-3 py-2 rounded-lg text-sm font-mono font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors whitespace-nowrap">~/metrics</a>
          
          <button 
            onClick={() => window.dispatchEvent(new Event('open-payment-gateway'))}
            className="px-3 py-2 rounded-lg text-sm font-mono font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors whitespace-nowrap cursor-pointer"
          >
            ~/sponsor
          </button>

          <a href="#contact" className="px-3 py-2 rounded-lg text-sm font-mono font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors whitespace-nowrap">~/contact</a>
        </div>
        
        {/* Adjusted padding and font size for the AI button on very small screens to prevent overlap */}
        <div className="flex items-center pl-2 sm:pl-4 border-l border-zinc-800 ml-auto md:ml-2">
          <button 
            onClick={() => {
              window.dispatchEvent(new Event('open-ai-chat'));
              closeMenu(); 
            }}
            className="px-3 sm:px-4 py-2 bg-white text-zinc-950 text-[10px] sm:text-xs md:text-sm font-mono font-bold rounded-lg hover:bg-zinc-200 transition-all cursor-pointer shadow-sm whitespace-nowrap"
          >
            ./talk_to_ai.sh
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 mt-2 bg-zinc-950/95 backdrop-blur-md border border-zinc-800 rounded-xl p-2 flex flex-col shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <a href="#about" onClick={closeMenu} className="px-4 py-3 text-sm font-mono font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors">~/about</a>
          <a href="#experience" onClick={closeMenu} className="px-4 py-3 text-sm font-mono font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors">~/experience</a>
          <a href="#projects" onClick={closeMenu} className="px-4 py-3 text-sm font-mono font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors">~/projects</a>
          <a href="#metrics" onClick={closeMenu} className="px-4 py-3 text-sm font-mono font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors">~/metrics</a>
          
          <button 
            onClick={() => {
              window.dispatchEvent(new Event('open-payment-gateway'));
              closeMenu();
            }}
            className="w-full text-left px-4 py-3 text-sm font-mono font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors"
          >
            ~/sponsor
          </button>

          <a href="#contact" onClick={closeMenu} className="px-4 py-3 text-sm font-mono font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors">~/contact</a>
        </div>
      )}
    </nav>
  );
};

export default DashboardNav;