import React, { useState } from 'react';
import axios from 'axios';
import { Lock, Unlock, UploadCloud, FileText, Trash2 } from 'lucide-react';

const AdminDashboard = () => {
  const [secretKey, setSecretKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Project form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [techStack, setTechStack] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');

  // Use an environment variable with a fallback
  const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

  // Delete project state
  const [deleteId, setDeleteId] = useState('');

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

  // Upload Project
  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Uploading project...');
    try {
      await axios.post(
        `${API_URL}/api/admin/projects`,
        { title, description, techStack, githubUrl, liveUrl },
        { headers: { 'X-Admin-Secret': secretKey } }
      );
      setStatus('Project successfully added to database!');
      setTitle('');
      setDescription('');
      setTechStack('');
      setGithubUrl('');
      setLiveUrl('');
    } catch (err: any) {
      setStatus(`Error: ${err.response?.data || 'Failed to upload project.'}`);
    }
  };

  // Delete Project
  const handleDeleteProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!deleteId.trim()) return;
    
    setStatus('Deleting project...');
    try {
      await axios.delete(`${API_URL}/api/admin/projects/${deleteId.trim()}`, {
        headers: { 'X-Admin-Secret': secretKey }
      });
      setStatus('Project successfully deleted!');
      setDeleteId('');
    } catch (err: any) {
      // Check for 404 from your backend
      if (err.response?.status === 404) {
        setStatus('Error: Project not found. Check the UUID.');
      } else {
        setStatus(`Error: ${err.response?.data || 'Failed to delete project.'}`);
      }
    }
  };

  // Upload Resume PDF
  const handlePdfSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setStatus('Chunking and embedding PDF... This may take a moment.');
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post(`${API_URL}/api/admin/ingest`, formData, {
        headers: {
          'X-Admin-Secret': secretKey,
          'Content-Type': 'multipart/form-data'
        }
      });
      setStatus('PDF successfully ingested into pgvector!');
      setFile(null);
    } catch (err: any) {
      setStatus(`Error: ${err.response?.data || 'Failed to ingest PDF'}`);
    }
  };

  // UI: Lock Screen
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-24 bg-zinc-950 p-8 border border-zinc-800 rounded-xl shadow-2xl">
        <div className="flex flex-col items-center mb-6">
          <Lock className="w-12 h-12 text-white mb-4" />
          <h2 className="text-xl font-bold text-white">System Override</h2>
          <p className="text-zinc-400 text-sm text-center mt-2">Enter admin secret key to access backend controls.</p>
        </div>

        {status && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded text-red-500 font-mono text-xs text-center">
            {status}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Enter X-Admin-Secret..."
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 text-white p-3 rounded-md focus:outline-none focus:border-white font-mono transition-colors"
            required
          />
          <button type="submit" className="bg-white text-black font-bold py-3 rounded-md hover:bg-zinc-200 transition-colors">
            Initialize Access
          </button>
        </form>
      </div>
    );
  }

  // UI: The Admin Control Panel (Stacked vertically)
  return (
    <div className="max-w-2xl mx-auto w-full pb-32">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-800 mt-12">
        <div className="flex items-center gap-3">
          <Unlock className="w-6 h-6 text-green-500" />
          <h1 className="text-2xl font-bold text-white">Command Center</h1>
        </div>
        <button onClick={() => setIsAuthenticated(false)} className="text-sm text-zinc-400 hover:text-red-500 transition-colors">
          Lock Session
        </button>
      </div>

      {status && (
        <div className="mb-8 p-4 bg-zinc-900 border border-zinc-700 rounded-md text-zinc-300 font-mono text-sm shadow-md">
          &gt; SYSTEM: {status}
        </div>
      )}

      {/* Changed to flex-col to stack forms vertically */}
      <div className="flex flex-col gap-8">
        
        {/* 1. Upload Project Form */}
        <div className="bg-zinc-950 p-6 sm:p-8 border border-zinc-800 rounded-xl shadow-xl">
          <div className="flex items-center gap-2 mb-6">
            <UploadCloud className="w-5 h-5 text-zinc-400" />
            <h2 className="text-lg font-semibold text-white">Deploy Project</h2>
          </div>
          <form onSubmit={handleProjectSubmit} className="flex flex-col gap-4">
            <input type="text" placeholder="Project Title" value={title} onChange={(e) => setTitle(e.target.value)} className="bg-zinc-900 border border-zinc-800 text-white p-3 rounded-lg focus:border-white outline-none text-sm transition-colors" required />
            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="bg-zinc-900 border border-zinc-800 text-white p-3 rounded-lg focus:border-white outline-none text-sm h-32 resize-none transition-colors" required />
            <input type="text" placeholder="Tech Stack (e.g. Java, React, Docker)" value={techStack} onChange={(e) => setTechStack(e.target.value)} className="bg-zinc-900 border border-zinc-800 text-white p-3 rounded-lg focus:border-white outline-none text-sm transition-colors" required />
            <input type="url" placeholder="GitHub URL (Optional)" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} className="bg-zinc-900 border border-zinc-800 text-white p-3 rounded-lg focus:border-white outline-none text-sm transition-colors" />
            <input type="url" placeholder="Live URL (Optional)" value={liveUrl} onChange={(e) => setLiveUrl(e.target.value)} className="bg-zinc-900 border border-zinc-800 text-white p-3 rounded-lg focus:border-white outline-none text-sm transition-colors" />
            <button type="submit" className="bg-white text-black font-bold py-3 rounded-lg mt-2 hover:bg-zinc-200 transition-colors">Upload to Database</button>
          </form>
        </div>

        {/* 2. AI Resume Ingestion Form */}
        <div className="bg-zinc-950 p-6 sm:p-8 border border-zinc-800 rounded-xl shadow-xl">
          <div className="flex items-center gap-2 mb-6">
            <FileText className="w-5 h-5 text-zinc-400" />
            <h2 className="text-lg font-semibold text-white">AI Memory Ingestion</h2>
          </div>
          <form onSubmit={handlePdfSubmit} className="flex flex-col gap-4">
            <p className="text-sm text-zinc-400 mb-2 leading-relaxed">Upload your latest PDF resume. The backend will parse, chunk, and update the pgvector database for your AI agent.</p>
            <input 
              type="file" 
              accept=".pdf"
              onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} 
              className="text-sm text-zinc-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-white file:text-black hover:file:bg-zinc-200 transition-all cursor-pointer"
              required 
            />
            <button type="submit" className="border border-white text-white font-bold py-3 rounded-lg mt-2 hover:bg-white hover:text-black transition-colors">Embed PDF</button>
          </form>
        </div>

        {/* 3. NEW: Delete Project Form */}
        <div className="bg-zinc-950 p-6 sm:p-8 border border-red-900/30 rounded-xl shadow-xl relative overflow-hidden">
          {/* Subtle red glow for the danger zone */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-red-900"></div>
          
          <div className="flex items-center gap-2 mb-6">
            <Trash2 className="w-5 h-5 text-red-500" />
            <h2 className="text-lg font-semibold text-white">Danger Zone: Delete Project</h2>
          </div>
          <form onSubmit={handleDeleteProject} className="flex flex-col gap-4">
            <p className="text-sm text-zinc-400 mb-2">Enter the exact UUID of the project to permanently remove it from the live database.</p>
            <input 
              type="text" 
              placeholder="e.g. 123e4567-e89b-12d3-a456-426614174000" 
              value={deleteId} 
              onChange={(e) => setDeleteId(e.target.value)} 
              className="bg-zinc-900 border border-zinc-800 text-white p-3 rounded-lg focus:border-red-500 outline-none text-sm font-mono transition-colors" 
              required 
            />
            <button type="submit" className="bg-red-500/10 text-red-500 border border-red-500/50 font-bold py-3 rounded-lg mt-2 hover:bg-red-500 hover:text-white transition-all">
              Permanently Delete Project
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
