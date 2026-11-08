import { useState, useEffect } from 'react';
import axios from 'axios';
import type { Profile } from '../types';

const defaultProfile: Profile = {
  name: "Ayush Tripathi",
  role: "Backend Developer",
  education: "B.Tech in CSE @ Gurukul Kangri Deemed to be University",
  bio: "Experienced in building scalable backend systems and event-driven architectures. My core stack includes Java, Spring Boot, Microservices, Kafka, and Docker. Currently engineering robust, high-performance solutions."
};

const AgenticHero = () => {
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/profile`);
        if (response.data && response.data.name) {
          setProfile(response.data);
        }
      } catch (err) {
        console.debug("Using default profile state:", err);
      }
    };
    if (API_URL) {
      fetchProfile();
    }
  }, [API_URL]);

  const nameParts = (profile.name || "Ayush Tripathi").split(' ');
  const firstName = nameParts[0] || "Ayush";
  const lastName = nameParts.slice(1).join(' ') || "Tripathi";

  return (
    <div className="w-full flex flex-col justify-center">
      
      {/* Target Theme: Massive Bold Futuristic Name (like 'MARTIN DERIK') */}
      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-wider uppercase font-sans mb-4 sm:mb-6 leading-[1.05]">
        {firstName} <br />
        <span className="bg-gradient-to-r from-white via-slate-200 to-cyan-300 bg-clip-text text-transparent">
          {lastName}
        </span>
      </h1>
      
      {/* Dynamic Bio paragraph */}
      <p className="text-zinc-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mb-6 sm:mb-8 font-normal">
        {profile.bio}
      </p>

      {/* Target Theme: Bottom Floating Role Pill Bar with Standout Button */}
      <div className="bg-[#110D25]/90 border border-purple-900/50 rounded-2xl p-2 sm:p-2.5 flex flex-wrap items-center gap-2 sm:gap-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-md max-w-xl">
        <div className="flex items-center gap-2 px-3 py-1.5">
          <span className="text-xs sm:text-sm font-semibold text-white tracking-wide">
            {profile.role || "Backend Developer"}
          </span>
          <span className="text-zinc-600">•</span>
          <span className="text-xs sm:text-sm text-zinc-400 font-medium">
            Distributed Systems
          </span>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <a 
            href="#contact"
            className="neon-gradient-btn px-5 sm:px-6 py-2.5 text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
          >
            Hire Now
          </a>
        </div>
      </div>

    </div>
  );
};

export default AgenticHero;