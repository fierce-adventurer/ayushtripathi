import { useState } from 'react';
import { Mail, Phone, Linkedin, Send, Terminal, AlertCircle } from 'lucide-react';

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
    <div id="contact" className="w-full pt-20 sm:pt-24 min-h-[70vh] mb-24 sm:mb-32">
      <div className="flex items-center gap-2 sm:gap-3 mb-8 sm:mb-12">
        <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white shrink-0" />
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Secure_Channel</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12 w-full">
        
        {/* Left Side: Direct Contact Info */}
        <div className="flex flex-col justify-center space-y-8 w-full min-w-0">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Establish Connection</h3>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-md">
              Whether you are looking for a backend engineer for your team, have a project in mind, or just want to connect, my inbox is always open.
            </p>
          </div>

          <div className="space-y-6 w-full min-w-0">
            <a href="mailto:ayush.tripathi0509@gmail.com" className="flex items-center gap-4 group w-full min-w-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 bg-zinc-950 border border-zinc-800 rounded-full flex items-center justify-center group-hover:border-white transition-colors">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-400 group-hover:text-white transition-colors" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] sm:text-xs font-mono text-zinc-500 mb-0.5">EMAIL</p>
                {/* Added break-all so long emails wrap safely */}
                <p className="text-xs sm:text-sm font-medium text-zinc-200 group-hover:text-white transition-colors break-all">ayush.tripathi0509@gmail.com</p>
              </div>
            </a>

            <a href="tel:+918178410657" className="flex items-center gap-4 group w-full min-w-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 bg-zinc-950 border border-zinc-800 rounded-full flex items-center justify-center group-hover:border-white transition-colors">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-400 group-hover:text-white transition-colors" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] sm:text-xs font-mono text-zinc-500 mb-0.5">PHONE</p>
                <p className="text-xs sm:text-sm font-medium text-zinc-200 group-hover:text-white transition-colors">+91 8178410657</p>
              </div>
            </a>

            <a href="https://www.linkedin.com/in/ayush-tripathi-89265923a/" target="_blank" rel="noreferrer" className="flex items-center gap-4 group w-full min-w-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 bg-zinc-950 border border-zinc-800 rounded-full flex items-center justify-center group-hover:border-white transition-colors">
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-400 group-hover:text-white transition-colors" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] sm:text-xs font-mono text-zinc-500 mb-0.5">NETWORK</p>
                {/* Added break-all for the long LinkedIn URL */}
                <p className="text-xs sm:text-sm font-medium text-zinc-200 group-hover:text-white transition-colors break-all">https://www.linkedin.com/in/ayush-tripathi</p>
              </div>
            </a>
          </div>
        </div>

        {/* Right Side: The Form */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden w-full">
          
          {submitted && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950/95 backdrop-blur-md z-10 animate-in fade-in zoom-in duration-300">
              <Terminal className="w-10 h-10 sm:w-12 sm:h-12 text-white mb-4" />
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 text-center">Transmission Sent</h3>
              <p className="text-xs sm:text-sm text-zinc-400 font-mono text-center">I will review your message shortly.</p>
            </div>
          )}

          {submitError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950/95 backdrop-blur-md z-10 animate-in fade-in zoom-in duration-300">
              <AlertCircle className="w-10 h-10 sm:w-12 sm:h-12 text-red-500 mb-4" />
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 text-center">Transmission Failed</h3>
              <p className="text-xs sm:text-sm text-zinc-400 font-mono text-center px-4">
                The connection to the server was lost.<br/>Please try again or use direct email.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5 w-full">
            <div>
              <label className="block text-[10px] sm:text-xs font-mono text-zinc-500 mb-1.5 sm:mb-2">IDENTITY</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="John Doe"
                required
                className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 sm:px-5 py-3 sm:py-3.5 rounded-lg sm:rounded-xl focus:outline-none focus:border-zinc-500 text-xs sm:text-sm transition-colors"
              />
            </div>

            <div>
              <label className="block text-[10px] sm:text-xs font-mono text-zinc-500 mb-1.5 sm:mb-2">RETURN_ADDRESS</label>
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="john@company.com"
                required
                className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 sm:px-5 py-3 sm:py-3.5 rounded-lg sm:rounded-xl focus:outline-none focus:border-zinc-500 text-xs sm:text-sm transition-colors"
              />
            </div>

            <div>
              <label className="block text-[10px] sm:text-xs font-mono text-zinc-500 mb-1.5 sm:mb-2">PAYLOAD</label>
              <textarea 
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                placeholder="How can we collaborate?"
                required
                rows={4}
                className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 sm:px-5 py-3 sm:py-3.5 rounded-lg sm:rounded-xl focus:outline-none focus:border-zinc-500 text-xs sm:text-sm transition-colors resize-none"
              ></textarea>
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full bg-white text-black font-bold py-3 sm:py-4 rounded-lg sm:rounded-xl hover:bg-zinc-200 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 text-sm sm:text-base"
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