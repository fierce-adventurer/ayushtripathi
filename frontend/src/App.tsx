import { useState } from 'react'

import './App.css'

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-xl font-light tracking-wide flex items-center gap-1">
        <span>Initializing Smart Portfolio</span>
        <span className="w-2 h-5 bg-accent animate-cursor-blink inline-block"></span>
      </div>
    </div>
  )
}

export default App
