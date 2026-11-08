import { useState } from 'react';
import { Mail, Phone, Linkedin, Send, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(false);
    
    const backendPayload = {
      senderName: formData.name,
      senderEmail: formData.email,
      messageBody: formData.message
    };
    const API_URL = import.meta.env.VITE_API_BASE_URL;

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(backendPayload), 
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        throw new Error('Server returned an error');
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setSubmitError(true);
      setTimeout(() => setSubmitError(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact" className="w-full pt-20 sm:pt-28 min-h-[60vh] mb-24 sm:mb-32">
      
      {/* Target Theme: Contact Header */}
      <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-cyan-400 via-indigo-200 to-purple-400 bg-clip-text text-transparent mb-3">
          Get In Touch
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-md">
          Open for software engineering opportunities, backend architecture collaborations, and technical discussions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 w-full items-start">
        
        {/* Left Side: Contact Information & Direct Channels */}
        <div className="flex flex-col space-y-6 w-full">
          
          <div className="glass-card p-6 rounded-2xl border border-purple-900/40">
            <h3 className="text-lg font-bold text-white mb-2">Direct Communications</h3>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6">
              My inbox is always monitored. Feel free to reach out directly via email, phone, or professional networks.
            </p>

            <div className="space-y-4">
              <a href="mailto:ayush.tripathi0509@gmail.com" className="flex items-center gap-3.5 group">
                <div className="w-10 h-10 rounded-xl bg-[#160E30] border border-purple-900/50 flex items-center justify-center group-hover:border-cyan-400 transition-colors">
                  <Mail className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-mono text-zinc-500 uppercase">Email</p>
                  <p className="text-xs sm:text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors truncate">
                    ayush.tripathi0509@gmail.com
                  </p>
                </div>
              </a>

              <a href="tel:+918178410657" className="flex items-center gap-3.5 group">
                <div className="w-10 h-10 rounded-xl bg-[#160E30] border border-purple-900/50 flex items-center justify-center group-hover:border-cyan-400 transition-colors">
                  <Phone className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-mono text-zinc-500 uppercase">Phone</p>
                  <p className="text-xs sm:text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors">
                    +91 8178410657
                  </p>
                </div>
              </a>

              <a href="https://www.linkedin.com/in/ayush-tripathi-89265923a/" target="_blank" rel="noreferrer" className="flex items-center gap-3.5 group">
                <div className="w-10 h-10 rounded-xl bg-[#160E30] border border-purple-900/50 flex items-center justify-center group-hover:border-cyan-400 transition-colors">
                  <Linkedin className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-mono text-zinc-500 uppercase">LinkedIn</p>
                  <p className="text-xs sm:text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors truncate">
                    linkedin.com/in/ayush-tripathi
                  </p>
                </div>
              </a>
            </div>
          </div>

        </div>

        {/* Right Side: Cyber-Luxe Glass Contact Form */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-purple-900/40 relative overflow-hidden shadow-2xl">
          
          {submitted && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0e0a20]/95 backdrop-blur-md z-10 animate-in fade-in zoom-in duration-300">
              <CheckCircle2 className="w-12 h-12 text-cyan-400 mb-3" />
              <h3 className="text-lg font-bold text-white mb-1">Message Transmitted</h3>
              <p className="text-xs text-zinc-400 font-mono text-center">Thank you! I will review your message and reply promptly.</p>
            </div>
          )}

          {submitError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0e0a20]/95 backdrop-blur-md z-10 animate-in fade-in zoom-in duration-300">
              <AlertCircle className="w-12 h-12 text-red-500 mb-3" />
              <h3 className="text-lg font-bold text-white mb-1">Transmission Error</h3>
              <p className="text-xs text-zinc-400 font-mono text-center px-4">
                Failed to reach the server. Please try direct email.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5 w-full">
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">Your Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="John Doe"
                required
                className="w-full bg-[#0B0718] border border-purple-900/50 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-cyan-400 text-xs sm:text-sm transition-colors"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">Email Address</label>
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="john@example.com"
                required
                className="w-full bg-[#0B0718] border border-purple-900/50 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-cyan-400 text-xs sm:text-sm transition-colors"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">Message</label>
              <textarea 
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                placeholder="How can we collaborate on backend systems or projects?"
                required
                rows={4}
                className="w-full bg-[#0B0718] border border-purple-900/50 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-cyan-400 text-xs sm:text-sm transition-colors resize-none"
              ></textarea>
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="neon-gradient-btn mt-2 w-full text-white font-bold py-3.5 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm shadow-xl"
            >
              {isSubmitting ? 'Transmitting...' : 'Send Message'}
              {!isSubmitting && <Send className="w-4 h-4" />}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ContactSection;