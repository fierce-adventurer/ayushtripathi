const DashboardNav = () => {
  return (
    <nav className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-surface/70 backdrop-blur-md border border-zinc-800/80 rounded-full px-8 py-3 flex items-center gap-8 shadow-2xl shadow-black/50">
        
        {/* Navigation Links */}
        <a href="#about" className="text-sm font-medium text-textSecondary hover:text-white transition-colors">~/about</a>
        <a href="#experience" className="text-sm font-medium text-textSecondary hover:text-white transition-colors">~/experience</a>
        <a href="#metrics" className="text-sm font-medium text-textSecondary hover:text-white transition-colors">~/metrics</a>
        <a href="#projects" className="text-sm font-medium text-textSecondary hover:text-white transition-colors">~/projects</a>
        <a href="#sponsor" className="text-sm font-medium text-accent hover:text-blue-400 transition-colors">~/sponsor_me</a>
        
        {/* The Chat Button (Styled like an executable) */}
        <a 
          href="#chat" 
          className="ml-4 px-4 py-1.5 bg-accent/10 border border-accent/50 text-accent text-sm font-mono rounded-full hover:bg-accent hover:text-white transition-all"
        >
          ./talk_to_ai.sh
        </a>
      </div>
    </nav>
  );
};

export default DashboardNav;