import { useState, useEffect } from 'react';
import axios from 'axios';
import { Github, Linkedin, Code2, Terminal, FileDown, Activity, Loader2 } from 'lucide-react';

// MUST KEEP THIS: Prevents the TypeScript deployment crash
interface StatsState {
  leetcode: { solved: string | number | null; loading: boolean; };
  codeforces: { rating: string | number | null; loading: boolean; };
  github: { repos: string | number | null; loading: boolean; };
}

const MetricsSection = () => {
  // Attached the interface here
  const [stats, setStats] = useState<StatsState>({
    leetcode: { solved: null, loading: true },
    codeforces: { rating: null, loading: true },
    github: { repos: null, loading: true }
  });

  useEffect(() => {
    // 1. GitHub: Real-time Repository Count
    axios.get('https://api.github.com/users/fierce-adventurer', {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
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

    // 2. Codeforces: Real-time Rating
    axios.get('https://codeforces.com/api/user.info?handles=fierce-adventurer')
      .then(res => {
        const data = res.data.result[0];
        setStats(s => ({ ...s, codeforces: { rating: data.rating || 'Unrated', loading: false } }));
      })
      .catch(err => {
        console.error("Codeforces Fetch Error:", err);
        setStats(s => ({ ...s, codeforces: { rating: 'Err', loading: false } }));
      });

    // 3. LeetCode: Real-time Solved Count (SWITCHED TO FAST VERCEL API)
    axios.get('https://leetcode-api-faisalshohag.vercel.app/ayushtripathi2005')
      .then(res => {
        // This API returns "totalSolved" instead of "solvedProblem"
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
    <div id="metrics" className="w-full pt-24 min-h-[30vh]">
      <div className="flex items-center gap-3 mb-10">
        <Activity className="w-6 h-6 text-white" />
        <h2 className="text-2xl font-bold text-white tracking-tight">System_Nodes</h2>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        
        {/* GitHub Node */}
        <a href="https://github.com/fierce-adventurer" target="_blank" rel="noreferrer" className="group flex flex-col items-center justify-center p-6 bg-zinc-950 border border-zinc-800 rounded-2xl hover:border-white transition-all duration-300">
          <Github className="w-7 h-7 text-zinc-500 group-hover:text-white mb-3 transition-colors" />
          <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Source</span>
          <span className="text-sm font-mono text-white">
            {stats.github.loading ? <Loader2 className="w-4 h-4 animate-spin" /> : `${stats.github.repos} Repos`}
          </span>
        </a>

        {/* LeetCode Node */}
        <a href="https://leetcode.com/u/ayushtripathi2005/" target="_blank" rel="noreferrer" className="group flex flex-col items-center justify-center p-6 bg-zinc-950 border border-zinc-800 rounded-2xl hover:border-white transition-all duration-300">
          <Code2 className="w-7 h-7 text-zinc-500 group-hover:text-white mb-3 transition-colors" />
          <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">LEETCODE</span>
          <span className="text-sm font-mono text-white">
            {stats.leetcode.loading ? <Loader2 className="w-4 h-4 animate-spin" /> : `${stats.leetcode.solved} Solved`}
          </span>
        </a>

        {/* Codeforces Node */}
        <a href="https://codeforces.com/profile/fierce-adventurer" target="_blank" rel="noreferrer" className="group flex flex-col items-center justify-center p-6 bg-zinc-950 border border-zinc-800 rounded-2xl hover:border-white transition-all duration-300">
          <Terminal className="w-7 h-7 text-zinc-500 group-hover:text-white mb-3 transition-colors" />
          <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">CP_Rating</span>
          <span className="text-sm font-mono text-white">
            {stats.codeforces.loading ? <Loader2 className="w-4 h-4 animate-spin" /> : `${stats.codeforces.rating}`}
          </span>
        </a>

        {/* LinkedIn Node */}
        <a href="https://www.linkedin.com/in/ayush-tripathi" target="_blank" rel="noreferrer" className="group flex flex-col items-center justify-center p-6 bg-zinc-950 border border-zinc-800 rounded-2xl hover:border-white transition-all duration-300">
          <Linkedin className="w-7 h-7 text-zinc-500 group-hover:text-white mb-3 transition-colors" />
          <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Connect</span>
          <span className="text-sm font-mono text-white">LinkedIn</span>
        </a>

        {/* Resume Node */}
        <a href="/profile.jpg" download className="group flex flex-col items-center justify-center p-6 bg-zinc-950 border border-zinc-800 rounded-2xl hover:border-white transition-all duration-300">
          <FileDown className="w-7 h-7 text-zinc-500 group-hover:text-white mb-3 transition-colors" />
          <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">Payload</span>
          <span className="text-sm font-mono text-white">Resume.pdf</span>
        </a>

      </div>
    </div>
  );
};

export default MetricsSection;