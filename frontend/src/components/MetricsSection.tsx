import { useState, useEffect } from 'react';
import axios from 'axios';
import { Github, Linkedin, Code2, Terminal, FileDown, Activity } from 'lucide-react';

const MetricsSection = () => {
  const [stats, setStats] = useState({
    leetcode: { solved: 0, loading: true },
    codeforces: { rating: 0, rank: '', loading: true },
    github: { repos: 0, loading: true }
  });

  useEffect(() => {
    // 1. Fetch GitHub Stats
    axios.get('https://api.github.com/users/fierce-adventurer')
      .then(res => setStats(s => ({ ...s, github: { repos: res.data.public_repos, loading: false } })))
      .catch(() => setStats(s => ({ ...s, github: { repos: 0, loading: false } })));

    // 2. Fetch Codeforces Stats
    axios.get('https://codeforces.com/api/user.info?handles=fierce-adventurer')
      .then(res => setStats(s => ({ ...s, codeforces: { rating: res.data.result[0].rating, rank: res.data.result[0].rank, loading: false } })))
      .catch(() => setStats(s => ({ ...s, codeforces: { rating: 0, rank: 'Unrated', loading: false } })));

    // 3. Fetch LeetCode Stats (Using community proxy to bypass CORS)
    axios.get('https://leetcode-stats-api.herokuapp.com/ayushtripathi2005')
      .then(res => setStats(s => ({ ...s, leetcode: { solved: res.data.totalSolved, loading: false } })))
      .catch(() => setStats(s => ({ ...s, leetcode: { solved: 0, loading: false } })));
  }, []);

  return (
    <div id="metrics" className="w-full pt-24 min-h-[30vh]">
      <div className="flex items-center gap-3 mb-8">
        <Activity className="w-6 h-6 text-accent" />
        <h2 className="text-2xl font-bold text-textPrimary tracking-tight">Live_Metrics & Nodes</h2>
        {/* Pulsing live indicator */}
        <span className="relative flex h-3 w-3 ml-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        
        {/* GitHub Live Node */}
        <a href="https://github.com/fierce-adventurer" target="_blank" rel="noreferrer" className="group flex flex-col items-center justify-center p-6 bg-surface border border-zinc-800 rounded-xl hover:border-white transition-colors">
          <Github className="w-8 h-8 text-textSecondary group-hover:text-white mb-3 transition-colors" />
          <span className="text-sm font-semibold text-white">GitHub</span>
          <span className="text-xs text-accent font-mono mt-1">
            {stats.github.loading ? 'Fetching...' : `${stats.github.repos} Repos`}
          </span>
        </a>

        {/* LeetCode Live Node */}
        <a href="https://leetcode.com/ayushtripathi2005" target="_blank" rel="noreferrer" className="group flex flex-col items-center justify-center p-6 bg-surface border border-zinc-800 rounded-xl hover:border-yellow-500 transition-colors">
          <Code2 className="w-8 h-8 text-textSecondary group-hover:text-yellow-500 mb-3 transition-colors" />
          <span className="text-sm font-semibold text-white">LeetCode</span>
          <span className="text-xs text-yellow-500 font-mono mt-1">
            {stats.leetcode.loading ? 'Fetching...' : `${stats.leetcode.solved} Solved`}
          </span>
        </a>

        {/* Codeforces Live Node */}
        <a href="https://codeforces.com/profile/fierce-adventurer" target="_blank" rel="noreferrer" className="group flex flex-col items-center justify-center p-6 bg-surface border border-zinc-800 rounded-xl hover:border-blue-500 transition-colors">
          <Terminal className="w-8 h-8 text-textSecondary group-hover:text-blue-500 mb-3 transition-colors" />
          <span className="text-sm font-semibold text-white">Codeforces</span>
          <span className="text-xs text-blue-500 font-mono mt-1">
            {stats.codeforces.loading ? 'Fetching...' : `${stats.codeforces.rating} Rating`}
          </span>
        </a>

        {/* LinkedIn Node (Static) */}
        <a href="https://linkedin.com/in/ayush-tripathi-89265923a" target="_blank" rel="noreferrer" className="group flex flex-col items-center justify-center p-6 bg-surface border border-zinc-800 rounded-xl hover:border-blue-600 transition-colors">
          <Linkedin className="w-8 h-8 text-textSecondary group-hover:text-blue-600 mb-3 transition-colors" />
          <span className="text-sm font-semibold text-white">LinkedIn</span>
          <span className="text-xs text-textSecondary font-mono mt-1">Network</span>
        </a>

        {/* Resume Download Node (Static) */}
        <a href="YOUR_GOOGLE_DRIVE_DIRECT_DOWNLOAD_LINK" target="_blank" rel="noreferrer" className="group flex flex-col items-center justify-center p-6 bg-surface border border-zinc-800 rounded-xl hover:border-accent transition-colors">
          <FileDown className="w-8 h-8 text-textSecondary group-hover:text-accent mb-3 transition-colors" />
          <span className="text-sm font-semibold text-white">Resume.pdf</span>
          <span className="text-xs text-textSecondary font-mono mt-1">Download</span>
        </a>

      </div>
    </div>
  );
};

export default MetricsSection;