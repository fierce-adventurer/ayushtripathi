import { useState, useEffect } from 'react';
import axios from 'axios';
import { Briefcase } from 'lucide-react';
import type { Experience } from '../types';

const ExperienceSection = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/experiences`);
        if (Array.isArray(response.data)) {
          setExperiences(response.data);
        }
      } catch (err) {
        console.debug("Could not fetch experiences:", err);
      } finally {
        setLoading(false);
      }
    };
    if (API_URL) {
      fetchExperiences();
    } else {
      setLoading(false);
    }
  }, [API_URL]);

  const parseTechStack = (techStack?: string | string[]): string[] => {
    if (!techStack) return [];
    if (Array.isArray(techStack)) return techStack;
    return techStack.split(',').map(t => t.trim()).filter(Boolean);
  };

  // If there are no experiences from the database or resume, do not display the section
  if (loading || experiences.length === 0) {
    return null;
  }

  return (
    // Changed min-h-[50vh] to something fluid so it doesn't force awkward empty space on small screens
    <div id="experience" className="w-full pt-20 sm:pt-24 min-h-[40vh] sm:min-h-[50vh]">
      <div className="flex items-center gap-2 sm:gap-3 mb-8 sm:mb-12">
        <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-accent shrink-0" />
        <h2 className="text-xl sm:text-2xl font-bold text-textPrimary tracking-tight break-words">Execution_History</h2>
      </div>

      <div className="space-y-8 pl-4 border-l border-zinc-800 ml-2 sm:ml-4">
        {experiences.map((exp) => (
          // Adjusted padding-left on the text block to match the timeline bullet better on mobile
          <div key={exp.id} className="relative pl-6 sm:pl-8 group">
            
            {/* Timeline Node */}
            <div className="absolute w-3 h-3 bg-background border border-accent rounded-full -left-[6.5px] top-1.5 group-hover:bg-accent transition-colors"></div>
            
            {/* Added break-words to the role title */}
            <h3 className="text-lg sm:text-xl font-semibold text-white break-words">{exp.role}</h3>
            
            {/* Added flex-wrap so the company and date stack neatly if the screen is too narrow */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-textSecondary mt-1 mb-3 sm:mb-4 font-mono">
              <span className="text-accent">{exp.company}</span>
              <span className="hidden sm:inline">|</span>
              <span className="text-zinc-500 sm:text-textSecondary">{exp.period || exp.date}</span>
            </div>
            
            <p className="text-textSecondary text-xs sm:text-sm leading-relaxed mb-4 w-full max-w-2xl break-words">
              {exp.description}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {parseTechStack(exp.techStack).map((tech, index) => (
                <span key={index} className="px-2 py-1 text-[10px] sm:text-xs font-mono text-textSecondary bg-surface border border-zinc-800 rounded break-words">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceSection;