const DashboardNav = () => {
  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-5xl">
      <div className="bg-zinc-950/90 backdrop-blur-md border border-zinc-800 rounded-xl p-2 flex items-center shadow-2xl">
        
        {/* Left: Section Links - Using flex-1 and justify-evenly to remove empty space */}
        <div className="flex-1 flex items-center justify-evenly overflow-x-auto [&::-webkit-scrollbar]:hidden px-2">
          <a href="#about" className="px-3 py-2 rounded-lg text-xs sm:text-sm font-mono font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors whitespace-nowrap">~/about</a>
          <a href="#experience" className="px-3 py-2 rounded-lg text-xs sm:text-sm font-mono font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors whitespace-nowrap">~/experience</a>
          <a href="#projects" className="px-3 py-2 rounded-lg text-xs sm:text-sm font-mono font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors whitespace-nowrap">~/projects</a>
          <a href="#metrics" className="px-3 py-2 rounded-lg text-xs sm:text-sm font-mono font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors whitespace-nowrap">~/metrics</a>
          
          <button 
            onClick={() => window.dispatchEvent(new Event('open-payment-gateway'))}
            className="px-3 py-2 rounded-lg text-xs sm:text-sm font-mono font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors whitespace-nowrap cursor-pointer"
          >
            ~/sponsor
          </button>

          <a href="#contact" className="px-3 py-2 rounded-lg text-xs sm:text-sm font-mono font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors whitespace-nowrap">~/contact</a>
        </div>
        
        {/* Right: Action Area (AI Agent) - Anchored to the right with a divider */}
        <div className="flex items-center pl-4 border-l border-zinc-800 ml-2">
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