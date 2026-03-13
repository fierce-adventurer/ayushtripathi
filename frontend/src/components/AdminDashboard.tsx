import React, { useState } from 'react';
import axios from 'axios';
import { Lock, Unlock, UploadCloud, FileText } from 'lucide-react';

const AdminDashboard = () => {
    const [secretKey, setSecretKey] = useState('');
    const [isAuthenticated , setIsAuthenticated] = useState(false);

    //Project from state

    const [title, setTitle]= useState('');
    const [description, setDescription] = useState('');
    const [techStack, setTechStack] = useState('');
    const [githubUrl, setGithubUrl] = useState('');
    const [liveUrl, setLiveUrl] = useState('');

    //resume file status
    const [file, setFile] = useState<File | null>(null);

    //status messages
    const [status, setStatus] = useState('');

    // Real frontend authentication using a secret key stored in .env file.
    const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Fetch the secret from your .env file
    const correctKey = import.meta.env.VITE_ADMIN_SECRET;

    if (secretKey === correctKey) {
      setIsAuthenticated(true);
      setStatus(''); // Clear any errors
    } else {
      setStatus('ACCESS DENIED: Invalid System Override Key.');
    }
  };

    //upload project to backend
    const handleProjectSubmit = async (e: React.FormEvent) =>{
        e.preventDefault();
        setStatus('Uploading project...')
        try{
            await axios.post(
                'http://localhost:8080/api/admin/projects',
                {title, description , techStack, githubUrl, liveUrl},
                {headers: {'X-Admin-Secret':secretKey}}
            );
            setStatus('Project successfully added to database!');
            //clear form
            setTitle('');
            setDescription('');
            setTechStack('');
            setGithubUrl('');
            setLiveUrl('');
        }
        catch(err: any){
            setStatus(`Error: ${err.response?.data || 'Failed to upload project.'}`)
        }
    }

    //upload resume as pdf for ai vectorization
    const handlePdfSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!file) return;

        setStatus('Chunking and embedding PDF... This may take a moment.')
        const formData = new FormData();
        formData.append('file', file);

        try{
            await axios.post('http://localhost:8080/api/admin/ingest', formData, {
                headers: {
                    'X-Admin-Secret': secretKey,
                    'Content-Type': 'multipart/form-data'
                }
            });

            setStatus('PDF successfully ingest into pgvector!')
            setFile(null);
        }
        catch(err: any){
            setStatus(`Error: ${err.response?.data || 'Failed to ingest PDF'}`);
        }
    }

    // UI lock screen for admin dashboard
    if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-24 bg-surface p-8 border border-zinc-800 rounded-xl shadow-2xl">
        <div className="flex flex-col items-center mb-6">
          <Lock className="w-12 h-12 text-accent mb-4" />
          <h2 className="text-xl font-bold text-white">System Override</h2>
          <p className="text-textSecondary text-sm text-center mt-2">Enter admin secret key to access backend controls.</p>
        </div>

        {/* --- NEW ERROR MESSAGE RENDERER --- */}
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
            className="bg-background border border-zinc-800 text-white p-3 rounded-md focus:outline-none focus:border-accent font-mono transition-colors"
            required
          />
          <button type="submit" className="bg-accent text-white font-bold py-3 rounded-md hover:bg-blue-600 transition-colors">
            Initialize Access
          </button>
        </form>
      </div>
    );
  }

  //UI: The Admin Control Panel
  return (
    <div className="max-w-3xl mx-auto w-full">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <Unlock className="w-6 h-6 text-green-500" />
          <h1 className="text-2xl font-bold text-white">Command Center</h1>
        </div>
        <button onClick={() => setIsAuthenticated(false)} className="text-sm text-textSecondary hover:text-red-500 transition-colors">
          Lock Session
        </button>
      </div>

      {status && (
        <div className="mb-8 p-4 bg-background border border-accent rounded-md text-accent font-mono text-sm">
          &gt; SYSTEM: {status}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Upload Project Form */}
        <div className="bg-surface p-6 border border-zinc-800 rounded-xl">
          <div className="flex items-center gap-2 mb-6">
            <UploadCloud className="w-5 h-5 text-textSecondary" />
            <h2 className="text-lg font-semibold text-white">Deploy Project</h2>
          </div>
          <form onSubmit={handleProjectSubmit} className="flex flex-col gap-4">
            <input type="text" placeholder="Project Title" value={title} onChange={(e) => setTitle(e.target.value)} className="bg-background border border-zinc-800 text-white p-2 rounded focus:border-accent outline-none text-sm" required />
            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="bg-background border border-zinc-800 text-white p-2 rounded focus:border-accent outline-none text-sm h-24 resize-none" required />
            <input type="text" placeholder="Tech Stack (e.g. Java, React, Docker)" value={techStack} onChange={(e) => setTechStack(e.target.value)} className="bg-background border border-zinc-800 text-white p-2 rounded focus:border-accent outline-none text-sm" required />
            <input type="url" placeholder="GitHub URL (Optional)" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} className="bg-background border border-zinc-800 text-white p-2 rounded focus:border-accent outline-none text-sm" />
            <input type="url" placeholder="Live URL (Optional)" value={liveUrl} onChange={(e) => setLiveUrl(e.target.value)} className="bg-background border border-zinc-800 text-white p-2 rounded focus:border-accent outline-none text-sm" />
            <button type="submit" className="bg-white text-black font-bold py-2 rounded mt-2 hover:bg-gray-200 transition-colors">Upload to Database</button>
          </form>
        </div>

        {/* AI Resume Ingestion Form */}
        <div className="bg-surface p-6 border border-zinc-800 rounded-xl h-fit">
          <div className="flex items-center gap-2 mb-6">
            <FileText className="w-5 h-5 text-textSecondary" />
            <h2 className="text-lg font-semibold text-white">AI Memory Ingestion</h2>
          </div>
          <form onSubmit={handlePdfSubmit} className="flex flex-col gap-4">
            <p className="text-xs text-textSecondary mb-2">Upload your latest PDF resume. The backend will parse, chunk, and update the pgvector database.</p>
            <input 
              type="file" 
              accept=".pdf"
              onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} 
              className="text-sm text-textSecondary file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-white hover:file:bg-blue-600"
              required 
            />
            <button type="submit" className="bg-accent text-white font-bold py-2 rounded mt-4 hover:bg-blue-600 transition-colors">Embed PDF</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
