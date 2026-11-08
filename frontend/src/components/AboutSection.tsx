import AgenticHero from './AgenticHero';

const AboutSection = () => {
  const tools = [
    { name: "Java", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
    { name: "Spring Boot", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg" },
    { name: "Docker", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
    { name: "Kafka", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachekafka/apachekafka-original.svg" },
    { name: "Redis", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg" },
    { name: "PostgreSQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
    { name: "AWS", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
    { name: "MongoDB", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
    { name: "React", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
    { name: "Python", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
    { name: "Go", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg" }
  ];

  const duplicatedTools = [...tools, ...tools, ...tools];

  return (
    <div id="about" className="pt-24 sm:pt-32 min-h-[85vh] flex flex-col justify-center w-full">
      
      {/* Top Half: Split Hero Section matching reference image */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16 sm:mb-20 w-full">
        
        {/* Left Side: Bold Futuristic Name, Bio & Pill Action Bar */}
        <div className="col-span-1 lg:col-span-7 w-full order-2 lg:order-1">
          <AgenticHero />
        </div>

        {/* Right Side: Portrait with dual-tone neon ambient lighting & floating experience badge */}
        <div className="col-span-1 lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2">
          <div className="relative group flex justify-center items-center">
            
            {/* Dual-tone Ambient Glow Halos (Amber on left, Cyan on right) */}
            <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/25 via-pink-600/20 to-cyan-500/30 rounded-full blur-2xl opacity-75 group-hover:opacity-100 transition duration-700"></div>
            
            {/* Circular Portrait Frame */}
            <div className="relative w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] lg:w-[340px] lg:h-[340px] rounded-full overflow-hidden border-2 border-purple-500/30 bg-[#0e0a20] shadow-[0_0_50px_rgba(139,92,246,0.3)]">
              <img 
                src="/profile.jpg" 
                alt="Ayush Tripathi" 
                className="w-full h-full object-cover filter contrast-105 hover:scale-105 transition-all duration-700"
              />
            </div>

            {/* Floating Experience Badge (Matching reference image: '4+ years experience') */}
            <div className="absolute -bottom-3 -right-2 sm:-right-4 glass-card px-5 py-3 rounded-2xl shadow-2xl border border-purple-500/30 flex flex-col items-center">
              <span className="text-xl sm:text-2xl font-black text-white font-sans tracking-tight">2+ years</span>
              <span className="text-[10px] sm:text-xs text-cyan-400 font-semibold uppercase tracking-widest">Experience</span>
            </div>

            {/* Subtle decorative curved background lines */}
            <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-cyan-400/30 rounded-tl-2xl hidden sm:block"></div>
          </div>
        </div>

      </div>

      {/* Bottom Half: "Core Technologies & Systems" Section (Matching 'Served Companies' style in reference) */}
      <div className="w-full flex flex-col items-center mb-8">
        <h3 className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-cyan-400 mb-2">
          Core Technologies & Stack
        </h3>
        <p className="text-xs text-zinc-500 mb-6 text-center max-w-md">
          Proven battle-tested systems engineering toolkit
        </p>

        <div className="w-full overflow-hidden relative glass-card border-y border-purple-900/30 py-5 rounded-2xl">
          <div className="absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#080511] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#080511] to-transparent z-10 pointer-events-none"></div>
          
          <div className="flex w-max animate-infinite-scroll hover:[animation-play-state:paused] items-center">
            {duplicatedTools.map((tool, index) => (
              <div key={index} className="flex items-center mx-5 sm:mx-8 gap-3 group cursor-pointer">
                <img 
                  src={tool.src} 
                  alt={tool.name} 
                  className="w-7 h-7 sm:w-9 sm:h-9 object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110"
                />
                <span className="text-zinc-400 text-xs sm:text-sm font-medium group-hover:text-cyan-300 transition-colors whitespace-nowrap">
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default AboutSection;