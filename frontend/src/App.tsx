import { Routes, Route } from 'react-router-dom';
import AboutSection from './components/AboutSection';
import DashboardNav from './components/DashboardNav';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import AdminDashboard from './components/AdminDashboard';
import MetricsSection from './components/MetricsSection';
import SponsorSection from './components/SponsorSection';
import ChatModal from './components/ChatModal';
import ContactSection from './components/ContactSection';

// The Single Page Architecture Layout
function Portfolio() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-textPrimary selection:bg-accent selection:text-white">
      <DashboardNav />

      {/* Main Content Wrapper - Centered for PC */}
      <main className="max-w-5xl mx-auto px-4 sm:px-8 pb-32">
        
        {/* Section 1: About (Hero) */}
        
        <AboutSection />
        

        {/* Section 2: Work Experience */}
        <ExperienceSection />

        {/* Section 3: Projects */}
        <div id="projects" className="pt-24 mb-8">
          <ProjectsSection />
        </div>

        {/* Section 4: Live Metrics (LeetCode, CF, GitHub, LinkedIn, Resume) */}
        <MetricsSection />

        {/* Section 5: Wall of Fame & Sponsorship */}
        <SponsorSection />

        {/* Section 6: Contact Form */}
        <ContactSection />

        {/* Section : AI Chatbot Interface */}
        <ChatModal />

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