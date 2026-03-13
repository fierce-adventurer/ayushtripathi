const DashboardNav = () => {
  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-4xl">
      <div className="bg-zinc-950/90 backdrop-blur-md border border-zinc-800 rounded-xl p-2 flex items-center justify-between shadow-2xl">
        
        {/* Left/Center Navigation Links */}
        {/* We use overflow-x-auto so it doesn't break on slightly smaller screens */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          <a href="#about" className="px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-mono font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors">~/about</a>
          <a href="#experience" className="px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-mono font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors">~/experience</a>
          <a href="#metrics" className="px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-mono font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors">~/metrics</a>
          <a href="#projects" className="px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-mono font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors">~/projects</a>
        </div>
        
        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 pl-2 border-l border-zinc-800 ml-2">
          
          {/* Sponsor Button */}
          <button 
            onClick={() => window.dispatchEvent(new Event('open-payment-gateway'))}
            className="hidden sm:block px-3 py-2 rounded-lg text-sm font-mono font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
          >
            ~/sponsor
          </button>
          
          {/* AI Chat Button (High Contrast) */}
          <button 
            onClick={() => window.dispatchEvent(new Event('open-ai-chat'))}
            className="px-4 py-2 bg-white text-zinc-950 text-xs sm:text-sm font-mono font-bold rounded-lg hover:bg-zinc-200 transition-all cursor-pointer"
          >
            ./talk_to_ai.sh
          </button>

        </div>
      </div>
    </nav>
  );
};

export default DashboardNav;