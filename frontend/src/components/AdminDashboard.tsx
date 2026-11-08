import React, { useState } from 'react';
import axios from 'axios';
import { Lock, Unlock, FileText, Briefcase, FolderGit2 } from 'lucide-react';

const AdminDashboard = () => {
  const [secretKey, setSecretKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Project form state
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDesc, setProjectDesc] = useState('');
  const [projectTech, setProjectTech] = useState('');
  const [projectGithub, setProjectGithub] = useState('');
  const [projectLive, setProjectLive] = useState('');
  const [projectDeleteId, setProjectDeleteId] = useState('');

  // Experience form state
  const [expRole, setExpRole] = useState('');
  const [expCompany, setExpCompany] = useState('');
  const [expStartDate, setExpStartDate] = useState('');
  const [expEndDate, setExpEndDate] = useState('');
  const [expIsCurrent, setExpIsCurrent] = useState(false);
  const [expDescription, setExpDescription] = useState('');
  const [expTechStack, setExpTechStack] = useState('');
  const [expDeleteId, setExpDeleteId] = useState('');

  const formatPeriodMonth = (monthStr: string) => {
    if (!monthStr) return '';
    try {
      const [year, month] = monthStr.split('-');
      if (!year || !month) return monthStr;
      const date = new Date(parseInt(year), parseInt(month) - 1, 1);
      return date.toLocaleString('en-US', { month: 'short', year: 'numeric' });
    } catch {
      return monthStr;
    }
  };

  // API base URL
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  // Resume file state
  const [file, setFile] = useState<File | null>(null);

  // Status messages
  const [status, setStatus] = useState('');

  // Authentication
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctKey = import.meta.env.VITE_ADMIN_SECRET;

    if (secretKey === correctKey) {
      setIsAuthenticated(true);
      setStatus('');
    } else {
      setStatus('ACCESS DENIED: Invalid System Override Key.');
    }
  };

  // Add Manual Project
  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Deploying project module to database...');
    try {
      await axios.post(
        `${API_URL}/api/admin/projects`,
        {
          title: projectTitle,
          description: projectDesc,
          techStack: projectTech,
          githubUrl: projectGithub,
          liveUrl: projectLive
        },
        { headers: { 'X-Admin-Secret': secretKey } }
      );
      setStatus(`Project "${projectTitle}" successfully deployed to database!`);
      setProjectTitle('');
      setProjectDesc('');
      setProjectTech('');
      setProjectGithub('');
      setProjectLive('');
    } catch (err: any) {
      setStatus(`Error: ${err.response?.data?.message || err.response?.data || 'Failed to deploy project.'}`);
    }
  };

  // Delete Project by UUID
  const handleDeleteProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectDeleteId.trim()) return;
    setStatus('Deleting project from database...');
    try {
      await axios.delete(`${API_URL}/api/admin/projects/${projectDeleteId.trim()}`, {
        headers: { 'X-Admin-Secret': secretKey }
      });
      setStatus('Project successfully deleted!');
      setProjectDeleteId('');
    } catch (err: any) {
      setStatus(`Error: ${err.response?.data || 'Failed to delete project.'}`);
    }
  };

  // Add Experience
  const handleExperienceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!expStartDate) {
      setStatus('Validation Error: Start Date is required.');
      return;
    }

    if (!expIsCurrent) {
      if (!expEndDate) {
        setStatus('Validation Error: End Date is required (or check "Currently working here").');
        return;
      }
      if (expStartDate > expEndDate) {
        setStatus('Validation Error: Start Date cannot be later than End Date!');
        return;
      }
    }

    const formattedStart = formatPeriodMonth(expStartDate);
    const formattedEnd = expIsCurrent ? 'Present' : formatPeriodMonth(expEndDate);
    const computedPeriod = `${formattedStart} - ${formattedEnd}`;

    setStatus('Adding work experience...');
    try {
      await axios.post(
        `${API_URL}/api/admin/experiences`,
        {
          role: expRole,
          company: expCompany,
          period: computedPeriod,
          startDate: expStartDate,
          endDate: expIsCurrent ? 'Present' : expEndDate,
          description: expDescription,
          techStack: expTechStack
        },
        { headers: { 'X-Admin-Secret': secretKey } }
      );
      setStatus(`Work experience "${expRole} @ ${expCompany}" successfully saved to database!`);
      setExpRole('');
      setExpCompany('');
      setExpStartDate('');
      setExpEndDate('');
      setExpIsCurrent(false);
      setExpDescription('');
      setExpTechStack('');
    } catch (err: any) {
      setStatus(`Error: ${err.response?.data?.message || err.response?.data || 'Failed to add experience.'}`);
    }
  };

  // Delete Experience
  const handleDeleteExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!expDeleteId.trim()) return;
    setStatus('Deleting experience...');
    try {
      await axios.delete(`${API_URL}/api/admin/experiences/${expDeleteId.trim()}`, {
        headers: { 'X-Admin-Secret': secretKey }
      });
      setStatus('Experience successfully deleted!');
      setExpDeleteId('');
    } catch (err: any) {
      setStatus(`Error: ${err.response?.data || 'Failed to delete experience.'}`);
    }
  };

  // Clear All Experiences
  const handleClearAllExperiences = async () => {
    if (!window.confirm("Are you sure you want to clear ALL experiences?")) return;
    setStatus('Clearing all experiences...');
    try {
      await axios.delete(`${API_URL}/api/admin/experiences`, {
        headers: { 'X-Admin-Secret': secretKey }
      });
      setStatus('All experiences cleared from database!');
    } catch (err: any) {
      setStatus(`Error: ${err.response?.data || 'Failed to clear experiences.'}`);
    }
  };

  // Upload Resume PDF
  const handlePdfSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setStatus('Chunking, embedding into pgvector, and generating bio with AI...');
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post(`${API_URL}/api/admin/ingest`, formData, {
        headers: {
          'X-Admin-Secret': secretKey,
          'Content-Type': 'multipart/form-data'
        }
      });
      setStatus(res.data || 'Resume successfully embedded and dynamic bio updated!');
      setFile(null);
    } catch (err: any) {
      setStatus(`Error: ${err.response?.data || 'Failed to ingest PDF'}`);
    }
  };

  // UI: Lock Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-6 py-12">
        <div className="w-full max-w-md bg-zinc-950 p-6 sm:p-8 border border-zinc-800 rounded-xl shadow-2xl">
          <div className="flex flex-col items-center mb-6 text-center">
            <Lock className="w-12 h-12 text-white mb-4" />
            <h2 className="text-xl font-bold text-white">System Override</h2>
            <p className="text-zinc-400 text-sm mt-2">Enter admin secret key to access backend controls.</p>
          </div>

          {status && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded text-red-500 font-mono text-xs text-center break-words">
              {status}
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full">
            <input
              type="password"
              placeholder="Enter X-Admin-Secret..."
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 text-white p-3 rounded-md focus:outline-none focus:border-white font-mono transition-colors"
              required
            />
            <button type="submit" className="w-full bg-white text-black font-bold py-3 rounded-md hover:bg-zinc-200 transition-colors">
              Initialize Access
            </button>
          </form>
        </div>
      </div>
    );
  }

  // UI: The Admin Control Panel
  return (
    <div className="min-h-screen w-full px-4 sm:px-6 md:px-8 py-12 flex flex-col items-center">
      <div className="w-full max-w-2xl pb-24">
        
        {/* Header section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <Unlock className="w-6 h-6 text-green-500 shrink-0" />
            <h1 className="text-xl sm:text-2xl font-bold text-white">Command Center</h1>
          </div>
          <button onClick={() => setIsAuthenticated(false)} className="text-sm text-zinc-400 hover:text-red-500 transition-colors self-start sm:self-auto">
            Lock Session
          </button>
        </div>

        {status && (
          <div className="mb-8 p-4 bg-zinc-900 border border-zinc-700 rounded-md text-zinc-300 font-mono text-xs sm:text-sm shadow-md break-words">
            &gt; SYSTEM: {status}
          </div>
        )}

        <div className="flex flex-col gap-8 w-full">

          {/* 1. Manual Project Management Card */}
          <div className="w-full bg-zinc-950 p-5 sm:p-8 border border-zinc-800 rounded-xl shadow-xl">
            <div className="flex items-center gap-2 mb-6">
              <FolderGit2 className="w-5 h-5 text-zinc-400 shrink-0" />
              <h2 className="text-base sm:text-lg font-semibold text-white">Manual Project Management</h2>
            </div>
            <form onSubmit={handleProjectSubmit} className="flex flex-col gap-4 w-full">
              <input type="text" placeholder="Project Title (e.g. Distributed Task Queue)" value={projectTitle} onChange={(e) => setProjectTitle(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 text-white p-3 rounded-lg focus:border-white outline-none text-sm transition-colors" required />
              <textarea placeholder="Detailed project description and architecture highlights..." value={projectDesc} onChange={(e) => setProjectDesc(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 text-white p-3 rounded-lg focus:border-white outline-none text-sm h-24 resize-none transition-colors" required />
              <input type="text" placeholder="Tech Stack (comma-separated: Java, Spring Boot, Kafka, Docker)" value={projectTech} onChange={(e) => setProjectTech(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 text-white p-3 rounded-lg focus:border-white outline-none text-sm transition-colors" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" placeholder="GitHub Repository URL" value={projectGithub} onChange={(e) => setProjectGithub(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 text-white p-3 rounded-lg focus:border-white outline-none text-sm transition-colors" />
                <input type="text" placeholder="Live Demo / Build URL (optional)" value={projectLive} onChange={(e) => setProjectLive(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 text-white p-3 rounded-lg focus:border-white outline-none text-sm transition-colors" />
              </div>
              <button type="submit" className="w-full bg-white text-black font-bold py-3 rounded-lg mt-2 hover:bg-zinc-200 transition-colors cursor-pointer">Deploy Project to Main Page</button>
            </form>

            <div className="mt-8 pt-6 border-t border-zinc-800">
              <h3 className="text-xs font-mono text-zinc-500 uppercase mb-2">Delete Project by UUID</h3>
              <form onSubmit={handleDeleteProject} className="flex gap-2">
                <input type="text" placeholder="Project UUID..." value={projectDeleteId} onChange={(e) => setProjectDeleteId(e.target.value)} className="flex-1 bg-zinc-900 border border-zinc-800 text-white p-2.5 rounded-lg focus:border-red-500 outline-none text-xs font-mono transition-colors" />
                <button type="submit" className="px-4 bg-red-500/10 text-red-500 border border-red-500/50 font-bold rounded-lg hover:bg-red-500 hover:text-white transition-all text-xs cursor-pointer">Delete</button>
              </form>
            </div>
          </div>

          {/* 2. Add Work Experience Form */}
          <div className="w-full bg-zinc-950 p-5 sm:p-8 border border-zinc-800 rounded-xl shadow-xl">
            <div className="flex items-center gap-2 mb-6">
              <Briefcase className="w-5 h-5 text-zinc-400 shrink-0" />
              <h2 className="text-base sm:text-lg font-semibold text-white">Work Experience</h2>
            </div>
            <form onSubmit={handleExperienceSubmit} className="flex flex-col gap-4 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" placeholder="Role (e.g. Software Engineer)" value={expRole} onChange={(e) => setExpRole(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 text-white p-3 rounded-lg focus:border-white outline-none text-sm transition-colors" required />
                <input type="text" placeholder="Company (e.g. Tech Corp)" value={expCompany} onChange={(e) => setExpCompany(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 text-white p-3 rounded-lg focus:border-white outline-none text-sm transition-colors" required />
              </div>

              {/* Start Date & End Date Section with Chronological Validation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1.5">Start Date *</label>
                  <input
                    type="month"
                    value={expStartDate}
                    onChange={(e) => setExpStartDate(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 text-white p-3 rounded-lg focus:border-white outline-none text-sm transition-colors [color-scheme:dark]"
                    required
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-mono text-zinc-400">End Date {!expIsCurrent && '*'}</label>
                    <label className="flex items-center gap-1.5 text-xs text-zinc-400 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={expIsCurrent}
                        onChange={(e) => {
                          setExpIsCurrent(e.target.checked);
                          if (e.target.checked) setExpEndDate('');
                        }}
                        className="rounded bg-zinc-900 border-zinc-700 text-white focus:ring-0 cursor-pointer"
                      />
                      <span>Present</span>
                    </label>
                  </div>
                  <input
                    type="month"
                    value={expEndDate}
                    onChange={(e) => setExpEndDate(e.target.value)}
                    disabled={expIsCurrent}
                    className="w-full bg-zinc-900 border border-zinc-800 text-white p-3 rounded-lg focus:border-white outline-none text-sm transition-colors disabled:opacity-30 disabled:cursor-not-allowed [color-scheme:dark]"
                    required={!expIsCurrent}
                  />
                </div>
              </div>

              <div>
                <input type="text" placeholder="Tech Stack (comma separated: React, Java, Docker)" value={expTechStack} onChange={(e) => setExpTechStack(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 text-white p-3 rounded-lg focus:border-white outline-none text-sm transition-colors" />
              </div>
              <textarea placeholder="Job responsibilities and impact..." value={expDescription} onChange={(e) => setExpDescription(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 text-white p-3 rounded-lg focus:border-white outline-none text-sm h-24 resize-none transition-colors" required />
              <button type="submit" className="w-full bg-white text-black font-bold py-3 rounded-lg mt-2 hover:bg-zinc-200 transition-colors cursor-pointer">Add Experience to Timeline</button>
            </form>

            <div className="mt-8 pt-6 border-t border-zinc-800">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-mono text-zinc-500 uppercase">Delete Experience by UUID</h3>
                <button
                  type="button"
                  onClick={handleClearAllExperiences}
                  className="text-xs font-mono text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                >
                  Clear All Experiences
                </button>
              </div>
              <form onSubmit={handleDeleteExperience} className="flex gap-2">
                <input type="text" placeholder="Experience UUID..." value={expDeleteId} onChange={(e) => setExpDeleteId(e.target.value)} className="flex-1 bg-zinc-900 border border-zinc-800 text-white p-2.5 rounded-lg focus:border-red-500 outline-none text-xs font-mono transition-colors" />
                <button type="submit" className="px-4 bg-red-500/10 text-red-500 border border-red-500/50 font-bold rounded-lg hover:bg-red-500 hover:text-white transition-all text-xs cursor-pointer">Delete</button>
              </form>
            </div>
          </div>

          {/* 3. AI Resume Ingestion Form */}
          <div className="w-full bg-zinc-950 p-5 sm:p-8 border border-zinc-800 rounded-xl shadow-xl">
            <div className="flex items-center gap-2 mb-6">
              <FileText className="w-5 h-5 text-zinc-400 shrink-0" />
              <h2 className="text-base sm:text-lg font-semibold text-white">AI Memory Ingestion</h2>
            </div>
            <form onSubmit={handlePdfSubmit} className="flex flex-col gap-4 w-full">
              <p className="text-xs sm:text-sm text-zinc-400 mb-2 leading-relaxed">
                Upload your latest PDF resume. The backend will parse, chunk, and embed it into pgvector, extract work experiences, and synthesize a dynamic bio for your portfolio.
              </p>
              
              <input 
                type="file" 
                accept=".pdf"
                onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} 
                className="w-full max-w-full overflow-hidden text-ellipsis text-xs sm:text-sm text-zinc-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-white file:text-black hover:file:bg-zinc-200 transition-all cursor-pointer"
                required 
              />
              <button type="submit" className="w-full border border-white text-white font-bold py-3 rounded-lg mt-2 hover:bg-white hover:text-black transition-colors cursor-pointer">
                Embed PDF &amp; Update AI Memory
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
