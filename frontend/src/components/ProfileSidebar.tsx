import {Github , Mail , Code2 , Terminal} from 'lucide-react'

const ProfileSidebar = () => {
    return (
    <div className="flex flex-col gap-6 w-full">
      {/* Header Section */}
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Ayush Tripathi</h1>
        <p className="text-textSecondary text-lg">Full-Stack Developer & Competitive Programmer</p>
      </div>

      {/* Contact & Coding Links Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
        <a href="mailto:your.email@example.com" className="flex items-center gap-3 p-3 rounded-md bg-surface border border-zinc-800 hover:border-accent transition-colors group">
          <Mail className="w-5 h-5 text-textSecondary group-hover:text-accent transition-colors" />
          <span className="text-sm font-medium">Email Me</span>
        </a>
        
        <a href="#" className="flex items-center gap-3 p-3 rounded-md bg-surface border border-zinc-800 hover:border-accent transition-colors group">
          <Github className="w-5 h-5 text-textSecondary group-hover:text-accent transition-colors" />
          <span className="text-sm font-medium">GitHub</span>
        </a>

        <a href="#" className="flex items-center gap-3 p-3 rounded-md bg-surface border border-zinc-800 hover:border-accent transition-colors group">
          <Code2 className="w-5 h-5 text-textSecondary group-hover:text-accent transition-colors" />
          <span className="text-sm font-medium">LeetCode</span>
        </a>

        <a href="#" className="flex items-center gap-3 p-3 rounded-md bg-surface border border-zinc-800 hover:border-accent transition-colors group">
          <Terminal className="w-5 h-5 text-textSecondary group-hover:text-accent transition-colors" />
          <span className="text-sm font-medium">Codeforces</span>
        </a>
      </div>
    </div>
  );
};

export default ProfileSidebar;

