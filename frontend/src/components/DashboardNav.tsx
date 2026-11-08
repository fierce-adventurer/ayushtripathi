import { useState } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';

const DashboardNav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="fixed top-4 sm:top-6 left-1/2 transform -translate-x-1/2 z-50 w-[calc(100%-1.5rem)] sm:w-[95%] max-w-5xl">
      <div className="bg-[#0e0a20]/80 backdrop-blur-xl border border-purple-900/40 rounded-2xl p-2.5 sm:px-5 flex items-center justify-between shadow-[0_10px_35px_rgba(0,0,0,0.5)]">
        
        {/* Brand / Logo (matching reference style) */}
        <a href="#about" className="flex items-center gap-1.5 text-base sm:text-lg font-bold tracking-tight text-white group shrink-0">
          <span className="font-mono text-cyan-400 group-hover:text-purple-400 transition-colors">&lt;</span>
          <span className="bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent">Ayush</span>
          <span className="font-mono text-purple-400 group-hover:text-cyan-400 transition-colors">/&gt;</span>
        </a>

        {/* Mobile menu hamburger button */}
        <button 
          onClick={toggleMenu}
          className="md:hidden px-2.5 py-1.5 text-zinc-400 hover:text-white transition-colors focus:outline-none shrink-0"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2">
          <a href="#about" className="px-3 py-1.5 rounded-lg text-xs lg:text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 transition-colors">
            About Me
          </a>
          <a href="#experience" className="px-3 py-1.5 rounded-lg text-xs lg:text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 transition-colors">
            Experiences
          </a>
          <a href="#projects" className="px-3 py-1.5 rounded-lg text-xs lg:text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 transition-colors">
            Projects
          </a>
          <a href="#metrics" className="px-3 py-1.5 rounded-lg text-xs lg:text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 transition-colors">
            Metrics
          </a>
          <button 
            onClick={() => window.dispatchEvent(new Event('open-payment-gateway'))}
            className="px-3 py-1.5 rounded-lg text-xs lg:text-sm font-medium text-zinc-300 hover:text-cyan-400 hover:bg-white/5 transition-colors cursor-pointer"
          >
            Sponsor
          </button>
          <a href="#contact" className="px-3 py-1.5 rounded-lg text-xs lg:text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 transition-colors">
            Contact
          </a>
        </div>
        
        {/* Right Action: AI Chat Button */}
        <div className="hidden md:flex items-center">
          <button 
            onClick={() => {
              window.dispatchEvent(new Event('open-ai-chat'));
              closeMenu(); 
            }}
            className="neon-gradient-btn px-4 py-2 text-white text-xs lg:text-sm font-medium rounded-xl flex items-center gap-2 cursor-pointer shadow-lg"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <span>Talk to AI</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 mt-2 bg-[#0e0a20]/95 backdrop-blur-2xl border border-purple-900/50 rounded-2xl p-3 flex flex-col shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          <a href="#about" onClick={closeMenu} className="px-4 py-2.5 text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">About Me</a>
          <a href="#experience" onClick={closeMenu} className="px-4 py-2.5 text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Experiences</a>
          <a href="#projects" onClick={closeMenu} className="px-4 py-2.5 text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Projects</a>
          <a href="#metrics" onClick={closeMenu} className="px-4 py-2.5 text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Metrics</a>
          <button 
            onClick={() => {
              window.dispatchEvent(new Event('open-payment-gateway'));
              closeMenu();
            }}
            className="w-full text-left px-4 py-2.5 text-sm font-medium text-zinc-300 hover:text-cyan-400 hover:bg-white/5 rounded-lg transition-colors"
          >
            Sponsor
          </button>
          <a href="#contact" onClick={closeMenu} className="px-4 py-2.5 text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Contact</a>
          
          <button 
            onClick={() => {
              window.dispatchEvent(new Event('open-ai-chat'));
              closeMenu(); 
            }}
            className="neon-gradient-btn mt-2 w-full py-2.5 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <span>Talk to AI</span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default DashboardNav;