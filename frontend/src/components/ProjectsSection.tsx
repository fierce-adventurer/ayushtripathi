import { useState, useEffect } from 'react';
import axios from 'axios';
import { ExternalLink, Github, FolderGit2, X, TerminalSquare } from 'lucide-react';

// 1. DEFINED LOCALLY: Safely marks techStack and URLs as optional (?) so it doesn't crash if null
interface Project {
  id: string;
  title: string;
  description: string;
  techStack?: string | null;
  githubUrl?: string | null;
  liveUrl?: string | null;
}

const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/projects`);
        if (Array.isArray(response.data)) {
          setProjects(response.data);
        } else {
          throw new Error('Database returned an invalid format.');
        }
      } catch (err) {
        console.error("Project fetch error:", err);
        setError('Failed to establish connection to the backend database.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [API_URL]);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedProject]);

  if (loading) {
    return (
      <div className="w-full font-mono text-textSecondary text-sm animate-pulse min-h-[30vh]">
        &gt; SYSTEM: Fetching projects from secure database...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full font-mono text-red-500 text-sm min-h-[30vh]">
        &gt; ERROR: {error}
      </div>
    );
  }

  return (
    // REMOVED id="projects" and pt-24 here because App.tsx already wraps this in a padded container
    <div className="w-full relative">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div className="flex items-center gap-2 sm:gap-3">
          <FolderGit2 className="w-5 h-5 sm:w-6 sm:h-6 text-accent shrink-0" />
          <h2 className="text-xl sm:text-2xl font-bold text-textPrimary tracking-tight">Deployed_Modules</h2>
        </div>
        <span className="text-[10px] sm:text-xs text-textSecondary font-mono hidden sm:block">
          [ SCROLL HORIZONTALLY ]
        </span>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="flex overflow-x-auto gap-4 sm:gap-6 pb-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {projects.map((project) => (
          <div 
            key={project.id} 
            // FIX: Shrunk to 280px on mobile to fit narrow screens, expands to 320px on tablets/PCs
            className="group flex flex-col w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] shrink-0 snap-center bg-zinc-950 border border-zinc-800 rounded-xl p-5 sm:p-6 hover:border-accent transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]"
          >
            <h3 className="text-lg sm:text-xl font-semibold text-textPrimary mb-2 group-hover:text-accent transition-colors line-clamp-1 break-all">
              {project.title}
            </h3>
            
            <p className="text-textSecondary text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
              {project.description}
            </p>

            {/* CRASH FIX: Safely checks if techStack exists before splitting it */}
            <div className="flex flex-wrap gap-2 mb-2 overflow-hidden max-h-[60px]">
              {project.techStack ? (
                <>
                  {project.techStack.split(',').slice(0, 3).map((tech, index) => (
                    <span key={index} className="px-2 py-1 text-[10px] sm:text-xs font-mono text-textSecondary bg-background border border-zinc-800 rounded-md whitespace-nowrap">
                      {tech.trim()}
                    </span>
                  ))}
                  {project.techStack.split(',').length > 3 && (
                    <span className="px-2 py-1 text-[10px] sm:text-xs font-mono text-textSecondary bg-background border border-zinc-800 rounded-md">
                      +{project.techStack.split(',').length - 3}
                    </span>
                  )}
                </>
              ) : (
                <span className="px-2 py-1 text-[10px] sm:text-xs font-mono text-zinc-600 bg-background border border-zinc-800 rounded-md border-dashed">
                  No stack data
                </span>
              )}
            </div>

            <div className="mt-auto pt-4 border-t border-zinc-800/50 flex items-center justify-between">
              <button 
                onClick={() => setSelectedProject(project)}
                className="flex items-center gap-2 text-xs sm:text-sm text-accent hover:text-blue-400 font-mono transition-colors"
              >
                <TerminalSquare className="w-4 h-4" />
                <span>[ READ_SPEC ]</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {projects.length === 0 && !loading && !error && (
        <div className="w-full font-mono text-textSecondary text-sm border border-dashed border-zinc-800 rounded-lg p-8 text-center">
          &gt; SYSTEM: No modules detected in active memory.
        </div>
      )}

      {/* --- EXPANDED PROJECT MODAL --- */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-sm">
          <div 
            className="absolute inset-0 cursor-pointer" 
            onClick={() => setSelectedProject(null)}
          ></div>
          
          <div className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-700 rounded-xl shadow-2xl p-6 sm:p-10 max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden">
            
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-3 sm:top-4 right-3 sm:right-4 p-2 bg-background border border-zinc-800 rounded-md text-textSecondary hover:text-white hover:border-red-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 pr-8 break-words">
              {selectedProject.title}
            </h2>
            
            <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
              {selectedProject.techStack && selectedProject.techStack.split(',').map((tech, index) => (
                <span key={index} className="px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-mono text-accent bg-accent/10 border border-accent/20 rounded-md">
                  {tech.trim()}
                </span>
              ))}
            </div>

            <div className="mb-6 sm:mb-8">
              <h4 className="text-[10px] sm:text-xs font-mono text-textSecondary mb-2 uppercase tracking-wider">Module Description</h4>
              <p className="text-textPrimary text-sm sm:text-base leading-relaxed whitespace-pre-wrap break-words">
                {selectedProject.description}
              </p>
            </div>

            {/* FIX: Changed to flex-col on mobile so long URLs don't break the modal width */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 pt-6 border-t border-zinc-800">
              {selectedProject.githubUrl && (
                <a 
                  href={selectedProject.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs sm:text-sm font-medium text-white hover:text-accent transition-colors"
                >
                  <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>View Source Code</span>
                </a>
              )}
              {selectedProject.liveUrl && (
                <a 
                  href={selectedProject.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs sm:text-sm font-medium text-accent hover:text-blue-400 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Launch Live Build</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsSection;