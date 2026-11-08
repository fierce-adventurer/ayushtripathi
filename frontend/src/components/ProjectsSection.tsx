import { useState, useEffect } from 'react';
import axios from 'axios';
import { ExternalLink, Github, FolderGit2, X, Eye, Terminal } from 'lucide-react';
import type { Project } from '../types';

const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  
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

  const filterTabs = ['All', 'Backend & APIs', 'Distributed Systems', 'AI & RAG'];

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === 'All') return true;
    const combined = `${project.title} ${project.description} ${project.techStack || ''}`.toLowerCase();
    if (activeFilter === 'Backend & APIs') return combined.includes('api') || combined.includes('spring') || combined.includes('java');
    if (activeFilter === 'Distributed Systems') return combined.includes('kafka') || combined.includes('docker') || combined.includes('redis') || combined.includes('microservice');
    if (activeFilter === 'AI & RAG') return combined.includes('ai') || combined.includes('rag') || combined.includes('vector') || combined.includes('groq');
    return true;
  });

  return (
    <div className="w-full relative">
      
      {/* Target Theme: Portfolio Header with Category Filter Tabs (From Reference Design) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <FolderGit2 className="w-5 h-5 text-cyan-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400">Featured Works</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-cyan-400 via-indigo-200 to-purple-400 bg-clip-text text-transparent">
            Portfolio
          </h2>
        </div>

        {/* Category Filter Tabs (matching the right-side tabs in reference image) */}
        <div className="flex flex-wrap gap-2">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                activeFilter === tab
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                  : 'glass-card text-zinc-400 hover:text-white hover:border-purple-500/30'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div className="w-full text-zinc-400 text-sm animate-pulse min-h-[30vh] flex items-center justify-center glass-card rounded-2xl">
          <Terminal className="w-4 h-4 mr-2 text-cyan-400 animate-spin" />
          Loading engineering projects from database...
        </div>
      )}

      {error && (
        <div className="w-full text-red-400 text-sm min-h-[20vh] flex items-center justify-center glass-card rounded-2xl border-red-500/30">
          {error}
        </div>
      )}

      {/* Grid of Cyber-Luxe Glassmorphic Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div 
            key={project.id} 
            className="group glass-card rounded-2xl p-6 flex flex-col justify-between hover:border-cyan-400/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-purple-950/60 border border-purple-800/40 text-purple-300">
                  Module
                </span>
                <div className="flex items-center gap-2">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white transition-colors">
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-cyan-300 transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors line-clamp-1">
                {project.title}
              </h3>
              
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
                {project.description}
              </p>
            </div>

            <div>
              {/* Tech stack badge pills */}
              <div className="flex flex-wrap gap-1.5 mb-5 max-h-[58px] overflow-hidden">
                {project.techStack ? (
                  project.techStack.split(',').slice(0, 3).map((tech, index) => (
                    <span key={index} className="px-2 py-1 text-[10px] font-mono text-zinc-300 bg-[#160E30] border border-purple-900/50 rounded-md">
                      {tech.trim()}
                    </span>
                  ))
                ) : (
                  <span className="text-[10px] text-zinc-600 font-mono">No stack tags</span>
                )}
              </div>

              <div className="pt-3 border-t border-purple-900/40 flex items-center justify-between">
                <button 
                  onClick={() => setSelectedProject(project)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-200 transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview Details</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredProjects.length === 0 && !loading && !error && (
        <div className="w-full glass-card rounded-2xl p-12 text-center text-zinc-400 text-sm">
          No projects found under the &quot;{activeFilter}&quot; category.
        </div>
      )}

      {/* --- EXPANDED PROJECT MODAL --- */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-md">
          <div 
            className="absolute inset-0 cursor-pointer" 
            onClick={() => setSelectedProject(null)}
          ></div>
          
          <div className="relative w-full max-w-2xl bg-[#0e0a20] border border-purple-500/40 rounded-3xl shadow-[0_0_60px_rgba(139,92,246,0.3)] p-6 sm:p-10 max-h-[90vh] overflow-y-auto">
            
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 bg-[#160E30] border border-purple-900/60 rounded-xl text-zinc-400 hover:text-white hover:border-red-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs uppercase font-mono text-cyan-400 tracking-wider">Project Specification</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 mb-4 pr-8">
              {selectedProject.title}
            </h2>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedProject.techStack && selectedProject.techStack.split(',').map((tech, index) => (
                <span key={index} className="px-3 py-1 text-xs font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-500/40 rounded-lg">
                  {tech.trim()}
                </span>
              ))}
            </div>

            <div className="mb-8">
              <h4 className="text-xs font-mono text-zinc-400 mb-2 uppercase tracking-wider">Overview & Architecture</h4>
              <p className="text-zinc-200 text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
                {selectedProject.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-6 border-t border-purple-900/50">
              {selectedProject.githubUrl && (
                <a 
                  href={selectedProject.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-semibold text-white hover:text-cyan-300 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>View Repository</span>
                </a>
              )}
              {selectedProject.liveUrl && (
                <a 
                  href={selectedProject.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="neon-gradient-btn px-4 py-2 rounded-xl text-white text-xs font-bold flex items-center gap-2 shadow-lg"
                >
                  <ExternalLink className="w-4 h-4" />
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