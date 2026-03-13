import { Routes, Route } from 'react-router-dom';
import AboutSection from './components/AboutSection';
import DashboardNav from './components/DashboardNav';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import AdminDashboard from './components/AdminDashboard';
import MetricsSection from './components/MetricsSection';
import SponsorSection from './components/SponsorSection';

// The Single Page Architecture Layout
function Portfolio() {
  return (
    <div className="relative min-h-screen bg-background text-textPrimary selection:bg-accent selection:text-white">
      {/* Floating Top Nav */}
      <DashboardNav />

      {/* Main Content Wrapper - Centered for PC */}
      <main className="max-w-5xl mx-auto px-8 pb-32">
        
        {/* Section 1: About (Hero) */}
        <div id="about" className="pt-32 min-h-[70vh] flex flex-col justify-center">
          <AboutSection />
        </div>

        {/* Section 2: Work Experience */}
        <ExperienceSection />

        {/* Section 3: Projects */}
        <div id="projects" className="pt-24 min-h-[70vh]">
          <ProjectsSection />
        </div>

        {/* Section 4: Live Metrics (LeetCode, CF, GitHub, LinkedIn, Resume) */}
        <MetricsSection />

        {/* Section 5: Wall of Fame & Sponsorship */}
        <SponsorSection />

        {/* Placeholders for our next components */}
        <div id="grind" className="pt-24 min-h-[30vh] border border-dashed border-zinc-800 rounded p-8 text-center text-textSecondary font-mono mt-12">
          &gt; SYSTEM: [The Grind Stats Bar will load here]
        </div>

        <div id="sponsor" className="pt-24 min-h-[40vh] border border-dashed border-zinc-800 rounded p-8 text-center text-textSecondary font-mono mt-12">
          &gt; SYSTEM: [Razorpay Sponsor Wall will load here]
        </div>

        <div id="chat" className="pt-24 min-h-[60vh] border border-dashed border-zinc-800 rounded p-8 text-center text-textSecondary font-mono mt-12 mb-24">
          &gt; SYSTEM: [AI Chatbot Terminal will load here]
        </div>

      </main>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/sudo" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;