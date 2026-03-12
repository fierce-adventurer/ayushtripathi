import { useState, useEffect } from 'react';
import axios from 'axios';
import { ExternalLink, Github, FolderGit2 } from 'lucide-react';
import type { Project } from '../types';


const ProjectsSection = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProjects = async() => {
            try{
                // may have to change this later for admin 
                const response = await axios.get('http://localhost:8080/api/projects')
                setProjects(response.data);
            }
            catch(err){
                console.error(err);
                setError('Failed to establish connection to the backend database')  
            }
            finally{
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if(loading){
        return (
            <div className="w-full mt-12 font-mono text-textSecondary text-sm animate-pulse">
                &gt; SYSTEM: Fetching projects from secure database...
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full mt-12 font-mono text-red-500 text-sm">
                &gt; ERROR: {error}
            </div>
        );
    }


    return (
    <div className="w-full mt-16 sm:mt-24">
      <div className="flex items-center gap-3 mb-8">
        <FolderGit2 className="w-6 h-6 text-accent" />
        <h2 className="text-2xl font-bold text-textPrimary tracking-tight">Deployed Modules</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="group relative bg-surface border border-zinc-800 rounded-xl p-6 hover:border-accent transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]"
          >
            <h3 className="text-xl font-semibold text-textPrimary mb-2 group-hover:text-accent transition-colors">
              {project.title}
            </h3>
            
            <p className="text-textSecondary text-sm leading-relaxed mb-6 line-clamp-3">
              {project.description}
            </p>

            {/* Tech Stack Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.techStack.split(',').map((tech, index) => (
                <span 
                  key={index} 
                  className="px-2 py-1 text-xs font-mono text-textSecondary bg-background border border-zinc-800 rounded-md"
                >
                  {tech.trim()}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex items-center gap-4 mt-auto pt-4 border-t border-zinc-800/50">
              {project.githubUrl && (
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-textSecondary hover:text-white transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>Code</span>
                </a>
              )}
              {project.liveUrl && (
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-accent hover:text-blue-400 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Empty State Fallback */}
      {projects.length === 0 && !loading && !error && (
        <div className="w-full font-mono text-textSecondary text-sm border border-dashed border-zinc-800 rounded-lg p-8 text-center">
          &gt; SYSTEM: No projects found in the database. Awaiting admin ingestion.
        </div>
      )}
    </div>
  );
};

export default ProjectsSection;
    
