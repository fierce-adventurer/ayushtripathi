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

// The Single Page Architecture Layout with Ambient Cyber-Luxe Backgrounds
function Portfolio() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#080511] text-textPrimary">
      
      {/* --- ATMOSPHERIC AMBIENT GLOWS (Matching reference image) --- */}
      {/* Warm amber/magenta glow on the upper-left */}
      <div className="pointer-events-none fixed -top-24 -left-24 w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] bg-gradient-to-br from-amber-500/20 via-pink-600/15 to-transparent blur-[120px] rounded-full z-0"></div>
      
      {/* Electric cyan/indigo glow on the mid-right */}
      <div className="pointer-events-none fixed top-1/3 -right-24 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-gradient-to-tl from-cyan-500/15 via-indigo-600/15 to-transparent blur-[140px] rounded-full z-0"></div>

      {/* Deep purple ambient glow near bottom */}
      <div className="pointer-events-none fixed -bottom-24 left-1/4 w-[400px] sm:w-[700px] h-[400px] sm:h-[500px] bg-gradient-to-t from-purple-700/10 via-indigo-900/10 to-transparent blur-[150px] rounded-full z-0"></div>

      {/* Dotted matrix patterns on the sides (as seen in reference design) */}
      <div className="pointer-events-none hidden lg:block fixed left-4 bottom-24 w-28 h-48 dot-pattern-amber opacity-30 z-0"></div>
      <div className="pointer-events-none hidden lg:block fixed right-4 top-1/2 w-28 h-48 dot-pattern-cyan opacity-25 z-0"></div>

      {/* Fixed Cyberpunk Navigation Bar */}
      <DashboardNav />

      {/* Main Content Wrapper - Centered for PC */}
      <main className="relative max-w-6xl mx-auto px-4 sm:px-8 pb-32 z-10">
        
        {/* Section 1: Hero & About Me */}
        <AboutSection />

        {/* Section 2: Experiences & Skills */}
        <ExperienceSection />

        {/* Section 3: Projects (Portfolio) */}
        <div id="projects" className="pt-24 mb-8">
          <ProjectsSection />
        </div>

        {/* Section 4: Live Metrics (LeetCode, CF, GitHub, LinkedIn, Resume) */}
        <MetricsSection />

        {/* Section 5: Wall of Fame & Sponsorship */}
        <SponsorSection />

        {/* Section 6: Contact Form */}
        <ContactSection />

        {/* Section: AI Chatbot Interface */}
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