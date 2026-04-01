const AgenticHero = () => {
  return (
    // Used w-full, min-w-0, and responsive padding (p-4 to p-12)
    <div className="w-full min-w-0 bg-zinc-950 border border-zinc-800 rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-12 shadow-2xl flex flex-col justify-center relative overflow-hidden">
      
      {/* Responsive Text Sizing with tracking adjustments for tiny screens. Added break-words to handle extremely narrow screens without breaking viewport */}
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight sm:tracking-tighter mb-4 sm:mb-6 font-mono break-words hyphens-auto">
        Ayush Tripathi
      </h1>
      
      {/* Added break-words to ensure long text wraps safely */}
      <div className="font-mono text-sm sm:text-base md:text-lg text-zinc-400 leading-relaxed whitespace-pre-wrap break-words">
        &gt; Role: Backend Developer
        <br />
        &gt; Education: B.Tech in CSE @ Gurukul Kangri Deemed to be University
        <br /><br />
        Experienced in building scalable backend systems and event-driven architectures. My core stack includes Java, Spring Boot, Microservices, Kafka, and Docker. 
        <br /><br />
        Currently seeking hands-on internship opportunities to engineer robust solutions.
        
        {/* The permanent blinking cursor to keep the terminal vibe alive */}
        <span className="inline-block w-2 h-4 sm:h-5 ml-1 bg-white animate-cursor-blink align-middle"></span>
      </div>

    </div>
  );
};

export default AgenticHero;