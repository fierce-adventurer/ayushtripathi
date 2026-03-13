const AgenticHero = () => {
  return (
    <div className="w-full bg-zinc-950 border border-zinc-800 rounded-3xl p-8 sm:p-12 shadow-2xl min-h-[350px] flex flex-col justify-center relative overflow-hidden">
      
      {/* The Static Name Heading */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight mb-6 font-mono">
        Ayush Tripathi
      </h1>
      
      {/* The Static Bio Paragraph */}
      <div className="font-mono text-base sm:text-lg text-zinc-400 leading-relaxed whitespace-pre-wrap">
        &gt; Role: Backend Developer
        <br />
        &gt; Education: B.Tech in CSE @ Gurukul Kangri Deemed to be University
        <br /><br />
        Experienced in building scalable backend systems and event-driven architectures. My core stack includes Java, Spring Boot, Microservices, Kafka, and Docker. 
        <br /><br />
        Currently seeking hands-on internship opportunities to engineer robust solutions.
        
        {/* The permanent blinking cursor to keep the terminal vibe alive */}
        <span className="inline-block w-2 h-5 ml-1 bg-white animate-cursor-blink align-middle"></span>
      </div>

    </div>
  );
};

export default AgenticHero;