import AgenticHero from './AgenticHero';

const AboutSection = () => {
  const tools = [
    { name: "Java", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
    { name: "Spring", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg" },
    { name: "Docker", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
    { name: "Jenkins", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jenkins/jenkins-original.svg" },
    { name: "AWS", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
    { name: "Kafka", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachekafka/apachekafka-original.svg" },
    { name: "Redis", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg" },
    { name: "PostgreSQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
    { name: "MongoDB", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
    { name: "Python", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
    { name: "React", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
    { name: "Node.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
    { name: "Go", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg" }
  ];

  const duplicatedTools = [...tools, ...tools, ...tools];

  return (
    // FIX: Optimized padding (pt-28 for mobile, pt-32 for PC) pulls it up perfectly
    <div id="about" className="pt-28 md:pt-32 min-h-[85vh] flex flex-col justify-center w-full">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12 sm:mb-16 w-full">
        
        {/* Left Side: Professional Image */}
        <div className="col-span-1 lg:col-span-5 flex justify-center lg:justify-start">
          <div className="relative group w-full flex justify-center lg:justify-start">
            <div className="absolute -inset-1 bg-zinc-600 rounded-full blur opacity-20 group-hover:opacity-60 transition duration-1000"></div>
            
            <div className="relative w-full max-w-[240px] sm:max-w-[300px] lg:max-w-[360px] aspect-square rounded-full overflow-hidden border-2 border-zinc-800 bg-zinc-950">
              <img 
                src="/profile.jpg" 
                alt="Ayush Tripathi" 
                className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            
            <div className="absolute top-0 left-0 sm:-left-4 w-6 h-12 border-t-2 border-l-2 border-white opacity-20 hidden sm:block"></div>
            <div className="absolute bottom-0 right-0 sm:-right-4 w-6 h-12 border-b-2 border-r-2 border-white opacity-20 hidden sm:block"></div>
          </div>
        </div>

        {/* Right Side: The Static Terminal Intro */}
        <div className="col-span-1 lg:col-span-7 w-full min-w-0">
          <AgenticHero />
        </div>

      </div>

      {/* Bottom Half: The Monochrome-to-Color Infinite Tool Marquee */}
      <div className="w-full overflow-hidden relative border-y border-zinc-800/50 py-6 sm:py-8 bg-zinc-950/30">
        <div className="absolute inset-y-0 left-0 w-12 sm:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-12 sm:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>
        
        <div className="flex w-max animate-infinite-scroll hover:[animation-play-state:paused] items-center">
          {duplicatedTools.map((tool, index) => (
            <div key={index} className="flex items-center mx-4 sm:mx-8 gap-2 sm:gap-3 group cursor-pointer">
              <img 
                src={tool.src} 
                alt={tool.name} 
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-[50px] md:h-[50px] object-contain grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
              />
              <span className="text-zinc-500 font-mono text-xs sm:text-sm md:text-base group-hover:text-white transition-colors whitespace-nowrap">
                {tool.name}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default AboutSection;