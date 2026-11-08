import { useState, useEffect } from 'react';
import axios from 'axios';
import type { Profile } from '../types';

const defaultProfile: Profile = {
  name: "Ayush Tripathi",
  role: "Backend Developer",
  education: "B.Tech in CSE @ Gurukul Kangri Deemed to be University",
  bio: ""
};

const AgenticHero = () => {
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchDynamicBio = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/profile/dynamic-bio`);
        if (response.data) {
          setProfile(prev => ({
            ...prev,
            name: response.data.name || prev.name,
            role: response.data.role || prev.role,
            education: response.data.education || prev.education,
            bio: response.data.bio || prev.bio
          }));
        }
      } catch (err) {
        console.debug("Could not fetch real-time dynamic bio, falling back to profile:", err);
        try {
          const fallback = await axios.get(`${API_URL}/api/profile`);
          if (fallback.data) {
            setProfile(fallback.data);
          }
        } catch (e) {
          console.debug("Fallback failed as well:", e);
        }
      } finally {
        setLoading(false);
      }
    };

    if (API_URL) {
      fetchDynamicBio();
    } else {
      setLoading(false);
    }
  }, [API_URL]);

  return (
    // Used w-full, min-w-0, and responsive padding (p-4 to p-12)
    <div className="w-full min-w-0 bg-zinc-950 border border-zinc-800 rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-12 shadow-2xl flex flex-col justify-center relative overflow-hidden">
      
      {/* Responsive Text Sizing with tracking adjustments for tiny screens. Added break-words to handle extremely narrow screens without breaking viewport */}
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight sm:tracking-tighter mb-4 sm:mb-6 font-mono break-words hyphens-auto">
        {profile.name}
      </h1>
      
      {/* Added break-words to ensure long text wraps safely */}
      <div className="font-mono text-sm sm:text-base md:text-lg text-zinc-400 leading-relaxed whitespace-pre-wrap break-words">
        {profile.role && <>&gt; Role: {profile.role}<br /></>}
        {profile.education && <>&gt; Education: {profile.education}<br /><br /></>}
        {profile.bio ? (
          profile.bio
        ) : loading ? (
          <span className="text-zinc-600 animate-pulse">&gt; Synthesizing dynamic bio from resume vector embeddings &amp; GitHub...</span>
        ) : null}
        
        {/* The permanent blinking cursor to keep the terminal vibe alive */}
        <span className="inline-block w-2 h-4 sm:h-5 ml-1 bg-white animate-cursor-blink align-middle"></span>
      </div>

    </div>
  );
};

export default AgenticHero;