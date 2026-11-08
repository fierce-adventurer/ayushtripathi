import { useState, useRef, useEffect } from 'react';
import { Bot, X, ArrowUp } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
}

// --- THE UNIVERSAL FORMATTER ---
const formatMessage = (text: string) => {
  // 1. Emergency Un-Gluing & Structural Spacing
  let cleanedText = text
    // Force a newline before any numbered bullet point (e.g., "Languages:1. Java" -> "Languages:\n1. Java")
    .replace(/([a-zA-Z\*:])\s*(\d+\.)/g, '$1\n$2')
    // Force a space after colons if there isn't one (e.g., "Stack:Java" -> "Stack: Java")
    .replace(/:([a-zA-Z0-9])/g, ': $1')
    // Force a newline before bold markdown (e.g., "Java**Backend**" -> "Java\n**Backend**")
    .replace(/([a-zA-Z.,;])\s*(\*\*)/g, '$1\n\n$2')
    // Force a space after bold markdown (e.g., "**Languages:**Java" -> "**Languages:** Java")
    .replace(/(\*\*)\s*([a-zA-Z0-9])/g, '$1 $2');

  // 2. Map the cleaned text into beautiful CSS blocks
  return cleanedText.split('\n').map((line, i) => {
    // Treat empty lines as breathing room
    if (line.trim() === '') return <div key={i} className="h-3"></div>;

    // Detect if the line is a numbered item or bullet point
    const isList = /^\d+\./.test(line.trim()) || line.trim().startsWith('-');

    // Parse the **bold** tags
    const parts = line.split(/(\*\*.*?\*\*)/g);

    return (
      <div 
        key={i} 
        className={`leading-relaxed tracking-wide ${
          isList 
            // Give lists beautiful left-indentation and a subtle grey border
            ? 'ml-2 sm:ml-4 pl-3 sm:pl-4 border-l-2 border-zinc-700 text-zinc-300 my-1.5' 
            : 'text-zinc-200 mb-2'
        }`}
      >
        {parts.map((part, j) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return (
              <span key={j} className="text-white font-semibold block mt-4 mb-1">
                {part.slice(2, -2)}
              </span>
            );
          }
          return <span key={j}>{part}</span>;
        })}
      </div>
    );
  });
};

const ActiveTypewriter = ({ text, isStreamActive }: { text: string, isStreamActive: boolean }) => {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    if (text.length > displayed.length) {
      const timeout = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length + 1));
      }, 10); // Slightly faster typing for longer messages
      return () => clearTimeout(timeout);
    }
  }, [text, displayed]);

  return (
    <div className="w-full break-words text-base">
      {formatMessage(displayed)}
      {(isStreamActive || displayed.length < text.length) && (
        <span className="inline-block w-3 h-3 ml-1 mt-1 bg-white rounded-full animate-pulse align-middle"></span>
      )}
    </div>
  );
};

const ChatModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'ai',
      content: "Hello! I have complete access to Ayush's resume, tech stack, and project architecture. How can I help you today?"
    }
  ]);
  const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener('open-ai-chat', handleOpenChat);
    return () => window.removeEventListener('open-ai-chat', handleOpenChat);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen, messages, isLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userQuery = input.trim();
    setInput(''); 
    
    const newUserMsg: Message = { id: Date.now().toString(), role: 'user', content: userQuery };
    const aiMsgId = (Date.now() + 1).toString();
    const newAiMsg: Message = { id: aiMsgId, role: 'ai', content: '' };
    
    setMessages(prev => [...prev, newUserMsg, newAiMsg]);
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userQuery })
      });

      if (!response.body) throw new Error('No readable stream available.');

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');
        let newText = '';
        
        for (const line of lines) {
          if (line.startsWith('data:')) {
            // THE FIX: Strictly remove ONLY the exact 5 characters "data:"
            // This guarantees we never accidentally delete Groq/Llama's leading spaces!
            let text = line.substring(5);
            
            // Safely parse literal newlines sent from the backend
            text = text.replace(/\\n/g, '\n');
            
            newText += text;
          }
        }

        if (newText) {
          setMessages(prev => 
            prev.map(msg => 
              msg.id === aiMsgId 
                ? { ...msg, content: msg.content + newText }
                : msg
            )
          );
        }
      }
    } catch (error) {
      console.error("Chat API Error:", error);
      setMessages(prev => 
        prev.map(msg => 
          msg.id === aiMsgId 
            ? { ...msg, content: "I'm having trouble connecting to my backend systems right now. Please try again later." }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8 bg-black/60 backdrop-blur-sm">
      <div className="absolute inset-0 cursor-pointer" onClick={() => setIsOpen(false)}></div>
      
      <div className="relative w-full max-w-3xl flex flex-col bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl h-[85vh] max-h-[800px] z-10 animate-in fade-in zoom-in duration-200">
        
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800/50 bg-zinc-950">
          <h2 className="text-base font-semibold text-zinc-200">Ayush's Agent</h2>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-4 sm:p-8 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-zinc-800 [&::-webkit-scrollbar-track]:bg-transparent">
          <div className="max-w-2xl mx-auto space-y-8">
            {messages.map((msg, index) => (
              <div key={msg.id} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                
                {msg.role === 'user' ? (
                  <div className="max-w-[75%] px-5 py-3 rounded-3xl bg-zinc-800 text-zinc-100 text-base leading-relaxed break-words">
                    {msg.content}
                  </div>
                ) : (
                  <div className="flex gap-4 w-full max-w-[95%]">
                    <div className="w-8 h-8 rounded-full border border-zinc-700 bg-zinc-900 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-5 h-5 text-zinc-300" />
                    </div>
                    <div className="flex-1 min-w-0 pt-1">
                      {index === messages.length - 1 && isLoading ? (
                        <ActiveTypewriter text={msg.content} isStreamActive={isLoading} />
                      ) : (
                        <div className="w-full break-words text-base">
                          {formatMessage(msg.content)}
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
              </div>
            ))}
            <div ref={messagesEndRef} className="h-4" />
          </div>
        </div>

        <div className="p-4 bg-zinc-950 border-t border-zinc-800/50">
          <form onSubmit={handleSendMessage} className="max-w-2xl mx-auto relative flex items-center bg-zinc-800/50 border border-zinc-700 rounded-full px-2 py-2 focus-within:bg-zinc-800 transition-colors">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              placeholder="Message Ayush's Agent..."
              className="flex-grow w-full min-w-0 bg-transparent text-zinc-100 px-4 py-2 focus:outline-none text-base placeholder-zinc-500 disabled:opacity-50"
            />
            <button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              className="bg-white text-black w-8 h-8 rounded-full hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shrink-0 mr-1"
            >
              <ArrowUp className="w-4 h-4 stroke-[3]" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ChatModal;