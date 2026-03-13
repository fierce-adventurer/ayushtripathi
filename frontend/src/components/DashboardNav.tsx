const DashboardNav = () => {
  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-5xl">
      <div className="bg-zinc-950/90 backdrop-blur-md border border-zinc-800 rounded-xl p-2 flex items-center justify-between shadow-2xl">
        
        {/* Left: Navigation Links Section */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          <a href="#about" className="px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-mono font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors whitespace-nowrap">~/about</a>
          <a href="#experience" className="px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-mono font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors whitespace-nowrap">~/experience</a>
          <a href="#metrics" className="px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-mono font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors whitespace-nowrap">~/metrics</a>
          <a href="#projects" className="px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-mono font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors whitespace-nowrap">~/projects</a>
          <a href="#contact" className="px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-mono font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors whitespace-nowrap">~/contact</a>
        </div>
        
        {/* Right: Action Buttons Section */}
        <div className="flex items-center gap-2 pl-2 border-l border-zinc-800 ml-2">
          
          {/* Sponsor Button (Hidden on very small screens) */}
          <button 
            onClick={() => window.dispatchEvent(new Event('open-payment-gateway'))}
            className="hidden md:block px-3 py-2 rounded-lg text-sm font-mono font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer whitespace-nowrap"
          >
            ~/sponsor
          </button>
          
          {/* AI Chat Button (Primary High Contrast) */}
          <button 
            onClick={() => window.dispatchEvent(new Event('open-ai-chat'))}
            className="px-4 py-2 bg-white text-zinc-950 text-xs sm:text-sm font-mono font-bold rounded-lg hover:bg-zinc-200 transition-all cursor-pointer shadow-sm whitespace-nowrap"
          >
            ./talk_to_ai.sh
          </button>
        </div>

      </div>
    </nav>
  );
};

export default DashboardNav;