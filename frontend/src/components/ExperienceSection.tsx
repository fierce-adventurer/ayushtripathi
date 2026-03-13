import { Briefcase } from 'lucide-react';

const ExperienceSection = () => {
  const experiences = [
    {
      id: 1,
      role: "Virtual Software Engineering Intern",
      company: "IIT Ropar",
      date: "Jan 2026",
      description: "Participated in an intensive 10-week virtual internship focusing on full-stack web development.",
      techStack: ["MongoDB", "Express.js", "React", "Node.js"]
    }
    // can easily add more objects here in the future!
  ];

  return (
    <div id="experience" className="w-full pt-24 min-h-[50vh]">
      <div className="flex items-center gap-3 mb-12">
        <Briefcase className="w-6 h-6 text-accent" />
        <h2 className="text-2xl font-bold text-textPrimary tracking-tight">Execution_History</h2>
      </div>

      <div className="space-y-8 pl-4 border-l border-zinc-800 ml-4">
        {experiences.map((exp) => (
          <div key={exp.id} className="relative pl-8 group">
            {/* Timeline Node */}
            <div className="absolute w-3 h-3 bg-background border border-accent rounded-full -left-[6.5px] top-1.5 group-hover:bg-accent transition-colors"></div>
            
            <h3 className="text-xl font-semibold text-white">{exp.role}</h3>
            <div className="flex items-center gap-4 text-sm text-textSecondary mt-1 mb-4 font-mono">
              <span className="text-accent">{exp.company}</span>
              <span>|</span>
              <span>{exp.date}</span>
            </div>
            
            <p className="text-textSecondary text-sm leading-relaxed mb-4 max-w-2xl">
              {exp.description}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {exp.techStack.map((tech, index) => (
                <span key={index} className="px-2 py-1 text-xs font-mono text-textSecondary bg-surface border border-zinc-800 rounded">
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