import { useState, useEffect } from 'react';
import axios from 'axios';
import { ExternalLink, Github, FolderGit2, X, TerminalSquare } from 'lucide-react';
import type { Project } from '../types';

const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // State to control the Expanded Modal
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/projects`);
        setProjects(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to establish connection to the backend database.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Prevent background scrolling when modal is open
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
      <div className="w-full pt-24 font-mono text-textSecondary text-sm animate-pulse">
        &gt; SYSTEM: Fetching projects from secure database...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full pt-24 font-mono text-red-500 text-sm">
        &gt; ERROR: {error}
      </div>
    );
  }

  return (
    <div id="projects" className="w-full pt-24 min-h-[60vh] relative">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <FolderGit2 className="w-6 h-6 text-accent" />
          <h2 className="text-2xl font-bold text-textPrimary tracking-tight">Deployed_Modules</h2>
        </div>
        <span className="text-xs text-textSecondary font-mono hidden sm:block">
          [ SCROLL HORIZONTALLY ]
        </span>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {projects.map((project) => (
          <div 
            key={project.id} 
            // HERE IS THE FIX: Strict square dimensions (320px by 320px) 
            className="group flex flex-col w-[300px] h-[300px] sm:w-[320px] sm:h-[320px] shrink-0 snap-center bg-surface border border-zinc-800 rounded-xl p-6 hover:border-accent transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]"
          >
            {/* Title clamped to 1 line so it doesn't break the square */}
            <h3 className="text-xl font-semibold text-textPrimary mb-2 group-hover:text-accent transition-colors line-clamp-1">
              {project.title}
            </h3>
            
            {/* Description strictly clamped to 3 lines */}
            <p className="text-textSecondary text-sm leading-relaxed mb-4 line-clamp-3">
              {project.description}
            </p>

            {/* Tech Stack tags (hidden if they overflow the box) */}
            <div className="flex flex-wrap gap-2 mb-2 overflow-hidden max-h-[60px]">
              {project.techStack.split(',').slice(0, 3).map((tech, index) => (
                <span key={index} className="px-2 py-1 text-xs font-mono text-textSecondary bg-background border border-zinc-800 rounded-md whitespace-nowrap">
                  {tech.trim()}
                </span>
              ))}
              {project.techStack.split(',').length > 3 && (
                <span className="px-2 py-1 text-xs font-mono text-textSecondary bg-background border border-zinc-800 rounded-md">
                  +{project.techStack.split(',').length - 3}
                </span>
              )}
            </div>

            {/* mt-auto forces this button to the absolute bottom of the square */}
            <div className="mt-auto pt-4 border-t border-zinc-800/50 flex items-center justify-between">
              <button 
                onClick={() => setSelectedProject(project)}
                className="flex items-center gap-2 text-sm text-accent hover:text-blue-400 font-mono transition-colors"
              >
                <TerminalSquare className="w-4 h-4" />
                <span>[ READ_SPEC ]</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Empty State Fallback */}
      {projects.length === 0 && !loading && !error && (
        <div className="w-full font-mono text-textSecondary text-sm border border-dashed border-zinc-800 rounded-lg p-8 text-center">
          &gt; SYSTEM: No modules detected in active memory.
        </div>
      )}

      {/* --- EXPANDED PROJECT MODAL --- */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-sm">
          {/* Modal Background Click to Close */}
          <div 
            className="absolute inset-0 cursor-pointer" 
            onClick={() => setSelectedProject(null)}
          ></div>
          
          {/* Modal Content Box */}
          <div className="relative w-full max-w-2xl bg-surface border border-zinc-700 rounded-xl shadow-2xl p-6 sm:p-10 max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden">
            
            {/* Close Button */}
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 bg-background border border-zinc-800 rounded-md text-textSecondary hover:text-white hover:border-red-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-3xl font-bold text-white mb-4 pr-8">{selectedProject.title}</h2>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {selectedProject.techStack.split(',').map((tech, index) => (
                <span key={index} className="px-3 py-1.5 text-xs font-mono text-accent bg-accent/10 border border-accent/20 rounded-md">
                  {tech.trim()}
                </span>
              ))}
            </div>

            <div className="mb-8">
              <h4 className="text-xs font-mono text-textSecondary mb-2 uppercase tracking-wider">Module Description</h4>
              {/* Full description rendering naturally */}
              <p className="text-textPrimary text-base leading-relaxed whitespace-pre-wrap">
                {selectedProject.description}
              </p>
            </div>

            {/* Links at the bottom of Modal */}
            <div className="flex items-center gap-6 pt-6 border-t border-zinc-800">
              {selectedProject.githubUrl && (
                <a 
                  href={selectedProject.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium text-white hover:text-accent transition-colors"
                >
                  <Github className="w-5 h-5" />
                  <span>View Source Code</span>
                </a>
              )}
              {selectedProject.liveUrl && (
                <a 
                  href={selectedProject.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium text-accent hover:text-blue-400 transition-colors"
                >
                  <ExternalLink className="w-5 h-5" />
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