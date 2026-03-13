import AgenticHero from './AgenticHero';

const AboutSection = () => {
  // Your actual tech stack pulled from our previous conversations
  const skills = [
    "Java", "Spring Boot", "Microservices", "Kafka", "TypeScript", 
    "React", "Node.js", "Express.js", "MongoDB", "PostgreSQL", 
    "Docker", "Jenkins", "AWS", "Data Structures", "Algorithms"
  ];

  // We duplicate the array once so the marquee can scroll seamlessly without snapping
  const duplicatedSkills = [...skills, ...skills];

  return (
    <div id="about" className="pt-32 min-h-[80vh] flex flex-col justify-center">
      
      {/* Top Half: Terminal + Profile Image Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
        
        {/* Left Side: The AI Terminal (Takes up 7 columns) */}
        <div className="lg:col-span-7">
          <AgenticHero />
        </div>

        {/* Right Side: Professional Image (Takes up 5 columns) */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative group">
            {/* The Glowing Border Effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-accent to-blue-900 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-1000"></div>
            
            {/* The Actual Image Container */}
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full overflow-hidden border border-zinc-700 bg-surface">
              {/* NOTE: Put your actual photo in the public folder and name it 'profile.jpg' */}
              <img 
                src="/profile.jpg" 
                alt="Mohit Kumar" 
                className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            
            {/* Cyberpunk-style decorative brackets */}
            <div className="absolute top-0 -left-4 w-4 h-8 border-t-2 border-l-2 border-accent opacity-50"></div>
            <div className="absolute bottom-0 -right-4 w-4 h-8 border-b-2 border-r-2 border-accent opacity-50"></div>
          </div>
        </div>
      </div>

      {/* Bottom Half: The Infinite Skills Marquee */}
      <div className="w-full overflow-hidden relative border-y border-zinc-800/50 py-6 bg-surface/30">
        {/* Gradient overlays to fade the edges of the scrolling bar */}
        <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-background to-transparent z-10"></div>
        <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-background to-transparent z-10"></div>
        
        <div className="flex w-max animate-infinite-scroll hover:[animation-play-state:paused]">
          {duplicatedSkills.map((skill, index) => (
            <div 
              key={index} 
              className="flex items-center mx-4 sm:mx-8 gap-2 group"
            >
              <span className="text-accent/50 font-mono text-sm">&lt;</span>
              <span className="text-textSecondary font-mono font-medium whitespace-nowrap group-hover:text-accent transition-colors">
                {skill}
              </span>
              <span className="text-accent/50 font-mono text-sm">/&gt;</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default AboutSection;