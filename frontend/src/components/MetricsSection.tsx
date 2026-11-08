import { useState, useEffect } from 'react';
import axios from 'axios';
import { Github, Linkedin, Code2, Terminal, FileDown, Activity, Loader2 } from 'lucide-react';

interface StatsState {
  leetcode: { solved: string | number | null; loading: boolean; };
  codeforces: { rating: string | number | null; loading: boolean; };
  github: { repos: string | number | null; loading: boolean; };
}

const MetricsSection = () => {
  const [stats, setStats] = useState<StatsState>({
    leetcode: { solved: null, loading: true },
    codeforces: { rating: null, loading: true },
    github: { repos: null, loading: true }
  });

  useEffect(() => {
    axios.get('https://api.github.com/users/fierce-adventurer', {
      headers: { 'Accept': 'application/vnd.github.v3+json' }
    })
      .then(res => {
        if (res.data && typeof res.data.public_repos === 'number') {
          setStats(s => ({ ...s, github: { repos: res.data.public_repos, loading: false } }));
        } else {
          throw new Error('Invalid GitHub response structure');
        }
      })
      .catch(err => {
        console.error("GitHub Fetch Error:", err.response || err);
        const isRateLimit = err.response && (err.response.status === 403 || err.response.status === 429);
        setStats(s => ({ ...s, github: { repos: isRateLimit ? 'Limit Hit' : 'Err', loading: false } }));
      });

    axios.get('https://codeforces.com/api/user.info?handles=fierce-adventurer')
      .then(res => {
        const data = res.data.result[0];
        setStats(s => ({ ...s, codeforces: { rating: data.rating || 'Unrated', loading: false } }));
      })
      .catch(err => {
        console.error("Codeforces Fetch Error:", err);
        setStats(s => ({ ...s, codeforces: { rating: 'Err', loading: false } }));
      });

    axios.get('https://leetcode-api-faisalshohag.vercel.app/ayushtripathi2005')
      .then(res => {
        if (res.data && typeof res.data.totalSolved === 'number') {
          setStats(s => ({ ...s, leetcode: { solved: res.data.totalSolved, loading: false } }));
        } else {
          throw new Error('Structure Mismatch');
        }
      })
      .catch(err => {
        console.error("LeetCode Fetch Error:", err);
        setStats(s => ({ ...s, leetcode: { solved: 'Fetch Err', loading: false } }));
      });
  }, []);

  return (
    <div id="metrics" className="w-full pt-20 sm:pt-24 min-h-[25vh]">
      <div className="flex items-center gap-2 sm:gap-3 mb-8">
        <Activity className="w-5 h-5 text-cyan-400 shrink-0" />
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">System Metrics & Profiles</h2>
        <span className="relative flex h-2 w-2 ml-1">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 w-full">
        
        <a 
          href="https://github.com/fierce-adventurer" 
          target="_blank" 
          rel="noreferrer" 
          className="group glass-card p-4 sm:p-6 rounded-2xl hover:border-cyan-400/50 transition-all duration-300 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] flex flex-col items-center justify-center min-w-0"
        >
          <Github className="w-6 h-6 sm:w-7 sm:h-7 text-zinc-400 group-hover:text-cyan-300 mb-2 transition-colors shrink-0" />
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">GitHub</span>
          <span className="text-xs sm:text-sm font-bold text-white text-center">
            {stats.github.loading ? <Loader2 className="w-4 h-4 animate-spin text-cyan-400" /> : `${stats.github.repos} Repos`}
          </span>
        </a>

        <a 
          href="https://leetcode.com/u/ayushtripathi2005/" 
          target="_blank" 
          rel="noreferrer" 
          className="group glass-card p-4 sm:p-6 rounded-2xl hover:border-amber-400/50 transition-all duration-300 hover:shadow-[0_0_25px_rgba(249,115,22,0.15)] flex flex-col items-center justify-center min-w-0"
        >
          <Code2 className="w-6 h-6 sm:w-7 sm:h-7 text-zinc-400 group-hover:text-amber-400 mb-2 transition-colors shrink-0" />
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1 truncate max-w-full">LeetCode</span>
          <span className="text-xs sm:text-sm font-bold text-white text-center">
            {stats.leetcode.loading ? <Loader2 className="w-4 h-4 animate-spin text-amber-400" /> : `${stats.leetcode.solved} Solved`}
          </span>
        </a>

        <a 
          href="https://codeforces.com/profile/fierce-adventurer" 
          target="_blank" 
          rel="noreferrer" 
          className="group glass-card p-4 sm:p-6 rounded-2xl hover:border-cyan-400/50 transition-all duration-300 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] flex flex-col items-center justify-center min-w-0"
        >
          <Terminal className="w-6 h-6 sm:w-7 sm:h-7 text-zinc-400 group-hover:text-cyan-400 mb-2 transition-colors shrink-0" />
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1 truncate max-w-full">Codeforces</span>
          <span className="text-xs sm:text-sm font-bold text-white text-center">
            {stats.codeforces.loading ? <Loader2 className="w-4 h-4 animate-spin text-cyan-400" /> : `${stats.codeforces.rating}`}
          </span>
        </a>

        <a 
          href="https://www.linkedin.com/in/ayush-tripathi-89265923a/" 
          target="_blank" 
          rel="noreferrer" 
          className="group glass-card p-4 sm:p-6 rounded-2xl hover:border-blue-400/50 transition-all duration-300 hover:shadow-[0_0_25px_rgba(59,130,246,0.15)] flex flex-col items-center justify-center min-w-0"
        >
          <Linkedin className="w-6 h-6 sm:w-7 sm:h-7 text-zinc-400 group-hover:text-blue-400 mb-2 transition-colors shrink-0" />
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">LinkedIn</span>
          <span className="text-xs sm:text-sm font-bold text-white text-center">Connect</span>
        </a>

        <a 
          href="https://drive.google.com/file/d/1mkDrr9xYSplGzt3btQkSZnR-FzJvXJgq/view?usp=drive_link" 
          target="_blank" 
          rel="noreferrer" 
          className="group glass-card p-4 sm:p-6 rounded-2xl hover:border-purple-400/50 transition-all duration-300 hover:shadow-[0_0_25px_rgba(139,92,246,0.15)] flex flex-col items-center justify-center min-w-0"
        >
          <FileDown className="w-6 h-6 sm:w-7 sm:h-7 text-zinc-400 group-hover:text-purple-400 mb-2 transition-colors shrink-0" />
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Resume</span>
          <span className="text-xs sm:text-sm font-bold text-white text-center">Download</span>
        </a>

      </div>
    </div>
  );
};

export default MetricsSection;