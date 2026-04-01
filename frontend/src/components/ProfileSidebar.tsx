import { Github, Mail, Code2, Terminal } from 'lucide-react';

const ProfileSidebar = () => {
  return (
    // Added min-w-0 to prevent flex/grid blowout
    <div className="flex flex-col gap-5 sm:gap-6 w-full min-w-0">
      
      {/* Header Section */}
      <div className="w-full min-w-0">
        {/* Responsive text sizing and break-words for narrow viewports */}
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-1.5 sm:mb-2 break-words">
          Ayush Tripathi
        </h1>
        <p className="text-textSecondary text-sm sm:text-base md:text-lg break-words leading-relaxed">
          Full-Stack Developer & Competitive Programmer
        </p>
      </div>

      {/* Contact & Coding Links Grid */}
      {/* 1 col on mobile, 2 on tablet, 1 on desktop sidebar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5 sm:gap-3 w-full min-w-0">
        
        <a href="mailto:ayush.tripathi0509@gmail.com" className="flex items-center gap-3 p-2.5 sm:p-3 rounded-lg bg-surface border border-zinc-800 hover:border-accent transition-colors group w-full min-w-0">
          <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-textSecondary group-hover:text-accent transition-colors shrink-0" />
          <span className="text-xs sm:text-sm font-medium truncate">Email Me</span>
        </a>
        
        <a href="https://github.com/fierce-adventurer" target="_blank" rel="noreferrer" className="flex items-center gap-3 p-2.5 sm:p-3 rounded-lg bg-surface border border-zinc-800 hover:border-accent transition-colors group w-full min-w-0">
          <Github className="w-4 h-4 sm:w-5 sm:h-5 text-textSecondary group-hover:text-accent transition-colors shrink-0" />
          <span className="text-xs sm:text-sm font-medium truncate">GitHub</span>
        </a>

        <a href="https://leetcode.com/u/ayushtripathi2005/" target="_blank" rel="noreferrer" className="flex items-center gap-3 p-2.5 sm:p-3 rounded-lg bg-surface border border-zinc-800 hover:border-accent transition-colors group w-full min-w-0">
          <Code2 className="w-4 h-4 sm:w-5 sm:h-5 text-textSecondary group-hover:text-accent transition-colors shrink-0" />
          <span className="text-xs sm:text-sm font-medium truncate">LeetCode</span>
        </a>

        <a href="https://codeforces.com/profile/fierce-adventurer" target="_blank" rel="noreferrer" className="flex items-center gap-3 p-2.5 sm:p-3 rounded-lg bg-surface border border-zinc-800 hover:border-accent transition-colors group w-full min-w-0">
          <Terminal className="w-4 h-4 sm:w-5 sm:h-5 text-textSecondary group-hover:text-accent transition-colors shrink-0" />
          <span className="text-xs sm:text-sm font-medium truncate">Codeforces</span>
        </a>
        
      </div>
    </div>
  );
};

export default ProfileSidebar;