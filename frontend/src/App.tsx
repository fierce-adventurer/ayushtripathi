import AgenticHero from './components/AgenticHero';
import ProfileSidebar from './components/ProfileSidebar';
import ProjectsSection from './components/ProjectsSection';
import './App.css'

function App() {
  return (
    // min-h-screen ensures it takes up the full viewport height
    // max-w-7xl centers the content on ultra-wide monitors
    <div className="min-h-screen bg-background p-4 sm:p-8 md:p-12 lg:p-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
        
        {/* LEFT COLUMN: Takes up 4 out of 12 grid columns on large screens */}
        {/* On mobile (default), it naturally stacks on top */}
        <div className="lg:col-span-4 w-full">
          <ProfileSidebar />
        </div>

        {/* RIGHT COLUMN: Takes up 8 out of 12 grid columns on large screens */}
        {/* We add a slight top margin on desktop to center it visually */}
        <div className="lg:col-span-8 w-full lg:mt-4">
          <AgenticHero />

          {/* Projects Grid injected here! */}
          <ProjectsSection />
        </div>

      </div>
    </div>
  
  )
}

export default App
