import { useState, useEffect } from "react";

const AgenticHero = () => {
    const [text, setText] = useState('');

    const fullText = "Initializing Agentic Environment...\nLoading modules: Java, Spring Boot, TypeScript, React...\nEstablishing secure connection...\nSystem Ready.\n\nHello. I am the AI assistant trained on Ayush Tripathi's portfolio.\nAyush is a Full-Stack Developer and Competitive Programmer.\n\nHow can I help you explore his work today?"

    useEffect(() => {
        let currentIndex = 0;

        //typing char every 30 millis
        const typingInterval = setInterval(() =>{
            if(currentIndex <= fullText.length){
                setText(fullText.slice(0, currentIndex));
                currentIndex++;
            }
            else{
                clearInterval(typingInterval);
            }
        }, 30)

        // clear to prevent memory leaks
        return () => clearInterval(typingInterval);
    }, [])

    return (
    <div className="w-full bg-surface border border-zinc-800 rounded-lg p-6 sm:p-8 shadow-2xl">
      <div className="flex items-center gap-2 mb-4 border-b border-zinc-800 pb-4">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="ml-2 text-xs text-textSecondary font-mono tracking-widest uppercase">Agent Terminal</span>
      </div>
      
      {/* whitespace-pre-wrap allows the \n characters to break lines naturally */}
      <div className="font-mono text-sm sm:text-base text-textPrimary leading-relaxed whitespace-pre-wrap">
        {text}
        <span className="inline-block w-2 h-4 sm:h-5 ml-1 bg-accent animate-cursor-blink align-middle"></span>
      </div>
    </div>
  );

}

export default AgenticHero;