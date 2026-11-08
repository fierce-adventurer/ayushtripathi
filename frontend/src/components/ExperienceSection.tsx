import { useState, useEffect } from 'react';
import axios from 'axios';
import { Briefcase, Layers, Cpu } from 'lucide-react';
import type { Experience } from '../types';

const defaultExperiences: Experience[] = [
  {
    id: 1,
    role: "Virtual Software Engineering Intern",
    company: "IIT Ropar",
    period: "Jan 2026",
    description: "Participated in an intensive 10-week virtual internship focusing on full-stack web development.",
    techStack: ["MongoDB", "Express.js", "React", "Node.js"]
  }
];

// Circular SVG Progress Ring Component (matching reference design)
const CircularProgress = ({ percentage, color = "#38BDF8" }: { percentage: number; color?: string }) => {
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
      <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 48 48">
        {/* Background track */}
        <circle
          cx="24"
          cy="24"
          r={radius}
          stroke="rgba(139, 92, 246, 0.15)"
          strokeWidth="3.5"
          fill="transparent"
        />
        {/* Progress stroke */}
        <circle
          cx="24"
          cy="24"
          r={radius}
          stroke={color}
          strokeWidth="3.5"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <span className="absolute text-[10px] font-bold text-white font-mono">
        {percentage}%
      </span>
    </div>
  );
};

const ExperienceSection = () => {
  const [experiences, setExperiences] = useState<Experience[]>(defaultExperiences);
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/experiences`);
        if (Array.isArray(response.data) && response.data.length > 0) {
          setExperiences(response.data);
        }
      } catch (err) {
        console.debug("Using default experiences state:", err);
      }
    };
    if (API_URL) {
      fetchExperiences();
    }
  }, [API_URL]);

  const parseTechStack = (techStack?: string | string[]): string[] => {
    if (!techStack) return [];
    if (Array.isArray(techStack)) return techStack;
    return techStack.split(',').map(t => t.trim()).filter(Boolean);
  };

  // Curated skills with progress percentage matching the reference card design
  const backendSkills = [
    {
      name: "Java & Spring Boot",
      desc: "Enterprise microservices, Spring AI, Security, and JPA.",
      percentage: 92,
      badge: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg",
      color: "#38BDF8"
    },
    {
      name: "Kafka & Event Streaming",
      desc: "Outbox pattern, asynchronous pipelines, and pub/sub queues.",
      percentage: 85,
      badge: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachekafka/apachekafka-original.svg",
      color: "#818CF8"
    },
    {
      name: "PostgreSQL & PGVector",
      desc: "Relational persistence, vector embeddings, similarity search.",
      percentage: 88,
      badge: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
      color: "#38BDF8"
    }
  ];

  const cloudArchitectureSkills = [
    {
      name: "Docker & Linux",
      desc: "Multi-stage container builds, non-root runtimes, JRE Alpine.",
      percentage: 86,
      badge: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
      color: "#38BDF8"
    },
    {
      name: "Redis & Caffeine Cache",
      desc: "In-memory caching, TTL evictions, semantic response caching.",
      percentage: 84,
      badge: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg",
      color: "#FB923C"
    },
    {
      name: "Full-Stack & React",
      desc: "React 19, TypeScript, Tailwind CSS, SSE streaming chat.",
      percentage: 80,
      badge: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
      color: "#818CF8"
    }
  ];

  return (
    <div id="experience" className="w-full pt-20 sm:pt-28 min-h-[50vh]">
      
      {/* Target Theme: Experiences Heading (Electric cyan-blue gradient with subtitle) */}
      <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-cyan-400 via-indigo-200 to-purple-400 bg-clip-text text-transparent mb-3">
          Experiences
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-lg">
          Specialized systems engineering competencies and documented execution history.
        </p>
      </div>

      {/* --- PART 1: TECHNICAL SKILL CARDS WITH CIRCULAR PERCENTAGE RINGS (From Reference Image) --- */}
      <div className="space-y-10 mb-16 sm:mb-20">
        
        {/* Category 1: Back-end & Distributed Systems */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-semibold text-zinc-200 tracking-wide uppercase">
              Back-end & Distributed Systems
            </h3>
            <div className="flex-1 h-px bg-gradient-to-r from-purple-900/50 to-transparent ml-2"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {backendSkills.map((skill, index) => (
              <div 
                key={index}
                className="glass-card p-5 rounded-2xl flex flex-col justify-between hover:border-cyan-400/40 transition-all duration-300 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] group"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#160E30] border border-purple-900/50 flex items-center justify-center p-2 group-hover:scale-105 transition-transform">
                      <img src={skill.badge} alt={skill.name} className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {skill.name}
                      </h4>
                    </div>
                  </div>
                  
                  {/* Circular progress percentage ring */}
                  <CircularProgress percentage={skill.percentage} color={skill.color} />
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  {skill.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Category 2: Infrastructure & Full-Stack */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Layers className="w-4 h-4 text-purple-400" />
            <h3 className="text-sm font-semibold text-zinc-200 tracking-wide uppercase">
              Cloud, Architecture & Full-Stack
            </h3>
            <div className="flex-1 h-px bg-gradient-to-r from-purple-900/50 to-transparent ml-2"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {cloudArchitectureSkills.map((skill, index) => (
              <div 
                key={index}
                className="glass-card p-5 rounded-2xl flex flex-col justify-between hover:border-purple-400/40 transition-all duration-300 hover:shadow-[0_0_25px_rgba(139,92,246,0.15)] group"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#160E30] border border-purple-900/50 flex items-center justify-center p-2 group-hover:scale-105 transition-transform">
                      <img src={skill.badge} alt={skill.name} className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                        {skill.name}
                      </h4>
                    </div>
                  </div>
                  
                  {/* Circular progress percentage ring */}
                  <CircularProgress percentage={skill.percentage} color={skill.color} />
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  {skill.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* --- PART 2: WORK HISTORY TIMELINE (Dynamically loaded from database / LLM) --- */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <Briefcase className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-semibold text-zinc-200 tracking-wide uppercase">
            Work Experience Timeline
          </h3>
          <div className="flex-1 h-px bg-gradient-to-r from-purple-900/50 to-transparent ml-2"></div>
        </div>

        <div className="space-y-6 pl-4 border-l-2 border-purple-900/40 ml-2 sm:ml-4">
          {experiences.map((exp) => (
            <div key={exp.id} className="relative pl-6 sm:pl-8 group">
              
              {/* Glowing Timeline Node Bullet */}
              <div className="absolute w-3.5 h-3.5 bg-[#0e0a20] border-2 border-cyan-400 rounded-full -left-[8px] top-1.5 shadow-[0_0_10px_rgba(6,182,212,0.8)] group-hover:bg-cyan-400 transition-colors"></div>
              
              <div className="glass-card p-5 sm:p-6 rounded-2xl border border-purple-900/30 group-hover:border-purple-600/40 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {exp.role}
                  </h4>
                  <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 self-start sm:self-auto">
                    {exp.period || exp.date}
                  </span>
                </div>
                
                <p className="text-xs font-semibold text-purple-300 mb-3">
                  @ {exp.company}
                </p>
                
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-4">
                  {exp.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {parseTechStack(exp.techStack).map((tech, idx) => (
                    <span key={idx} className="px-2.5 py-1 text-[10px] sm:text-xs font-mono text-zinc-300 bg-[#160E30] border border-purple-900/50 rounded-lg">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ExperienceSection;