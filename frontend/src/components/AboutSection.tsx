import AgenticHero from './AgenticHero';

const AboutSection = () => {
  // Updated to perfectly match the skills from your PDF Resume
  const skills = [
    "Java", "Spring Boot", "Microservices", "Kafka", "PostgreSQL", 
    "MongoDB", "Docker", "Jenkins", "AWS", "Redis", 
    "OAuth2", "JWT", "System Design", "Python", "C"
  ];

  const duplicatedSkills = [...skills, ...skills];

  return (
    <div id="about" className="pt-32 min-h-[80vh] flex flex-col justify-center">
      
      {/* Top Half: Profile Image (Left) + Intro (Right) */}
      <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
        
        {/* Left Side: Professional Image */}
        <div className="w-full md:w-5/12 flex justify-center md:justify-start shrink-0">
          <div className="relative group">
            {/* White/Zinc Glow Effect */}
            <div className="absolute -inset-1 bg-zinc-600 rounded-full blur opacity-20 group-hover:opacity-60 transition duration-1000"></div>
            
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-2 border-zinc-800 bg-zinc-950">
              <img 
                src="/profile.jpg" 
                alt="Ayush Tripathi" 
                className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            
            {/* Tech brackets */}
            <div className="absolute top-0 -left-4 w-6 h-12 border-t-2 border-l-2 border-white opacity-20"></div>
            <div className="absolute bottom-0 -right-4 w-6 h-12 border-b-2 border-r-2 border-white opacity-20"></div>
          </div>
        </div>

        {/* Right Side: The Static Terminal Intro */}
        <div className="w-full md:w-7/12">
          <AgenticHero />
        </div>

      </div>

      {/* Bottom Half: The Monochrome Infinite Skills Marquee */}
      <div className="w-full overflow-hidden relative border-y border-zinc-800/50 py-6 bg-zinc-950/30">
        <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-background to-transparent z-10"></div>
        <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-background to-transparent z-10"></div>
        
        <div className="flex w-max animate-infinite-scroll hover:[animation-play-state:paused]">
          {duplicatedSkills.map((skill, index) => (
            <div key={index} className="flex items-center mx-4 sm:mx-8 gap-2 group">
              <span className="text-zinc-600 font-mono text-sm">&lt;</span>
              <span className="text-zinc-400 font-mono font-medium whitespace-nowrap group-hover:text-white transition-colors">
                {skill}
              </span>
              <span className="text-zinc-600 font-mono text-sm">/&gt;</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default AboutSection;