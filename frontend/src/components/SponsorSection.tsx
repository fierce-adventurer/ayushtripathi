import { useState, useEffect } from 'react';
import axios from 'axios';
import { Award, Terminal, X, Zap } from 'lucide-react';

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

interface Sponsor {
  sponsorName: string;
  amount: number;
  currency: string;
}

const SponsorSection = () => {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sponsorName, setSponsorName] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState(500);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID;

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/sponsors`);
        setSponsors(response.data);
      } catch (err) {
        console.error("Failed to fetch sponsors", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSponsors();
  }, [API_URL]);

  useEffect(() => {
    const handleOpenModal = () => setIsModalOpen(true);
    window.addEventListener('open-payment-gateway', handleOpenModal);
    return () => window.removeEventListener('open-payment-gateway', handleOpenModal);
  }, []);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      if (!RAZORPAY_KEY) {
        throw new Error("VITE_RAZORPAY_KEY_ID is missing in Vercel environment variables.");
      }

      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        throw new Error("Razorpay SDK failed to load. Check your internet connection.");
      }

      const { data: order } = await axios.post(`${API_URL}/api/payments/create-order`, {
        amount: amount, 
        currency: "INR",
        sponsorName: sponsorName,
        email: email
      });

      const options = {
        key: RAZORPAY_KEY,
        amount: order.amount, 
        currency: order.currency,
        name: "Fierce Adventurer",
        description: "Portfolio Sponsorship",
        image: "https://your-domain.com/logo.png", 
        order_id: order.id, 
        handler: async function (response: any) {
          try {
            setIsProcessing(true);
            await axios.post(`${API_URL}/api/payments/verify-payment`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              sponsorName: sponsorName,
              email: email,
              amount: amount,
              currency: "INR"
            });
            
            alert(`Success! Sponsorship registered. Payment ID: ${response.razorpay_payment_id}`);
            setIsModalOpen(false);
            setSponsorName('');
            setEmail('');
            
            // Refresh sponsors list
            const { data: updatedSponsors } = await axios.get(`${API_URL}/api/sponsors`);
            setSponsors(updatedSponsors);
          } catch (error: any) {
            console.error("Verification failed", error);
            const errorMsg = error.response?.data?.message || error.message || "Unknown Error";
            alert(`Payment success, but registration failed: ${errorMsg}`);
          } finally {
            setIsProcessing(false);
          }
        },
        prefill: {
          name: sponsorName,
          email: email,
        },
        notes: {
          sponsor_name: sponsorName 
        },
        theme: {
          color: "#10b981", 
        },
      };

      const rzp = new (window as any).Razorpay(options);
      
      rzp.on('payment.failed', function (response: any) {
        alert(`Payment Failed: ${response.error.description}`);
      });

      rzp.open();

    } catch (error: any) {
      const errorMsg = error.response?.data?.message || error.message || "Unknown Error";
      alert(`Error: ${errorMsg}`);
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) return null;

  return (
    <>
      {sponsors.length > 0 && (
        <div id="sponsor" className="w-full pt-20 sm:pt-24 min-h-[40vh]">
          <div className="flex items-center gap-3 mb-8 sm:mb-12">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
              <Award className="w-5 h-5 text-purple-400 shrink-0" />
            </div>
            <div>
              <span className="text-[11px] font-mono tracking-widest text-purple-400 uppercase">Community Backers</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white font-heading">
                Wall of <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-pink-500">Fame</span>
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 w-full">
            {sponsors.map((sponsor, index) => (
              <div key={index} className="bg-[#120D24]/80 backdrop-blur-md border border-purple-500/20 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)] transition-all w-full min-w-0 group">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <Terminal className="w-4 h-4 text-purple-400 shrink-0" />
                </div>
                <span className="text-white font-semibold text-xs sm:text-sm line-clamp-1 break-all">{sponsor.sponsorName}</span>
                
                <div className="flex items-center gap-1.5 text-cyan-400 font-mono text-[10px] sm:text-xs mt-1.5 font-bold">
                  <span>{sponsor.currency}</span>
                  <span>{sponsor.amount.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="absolute inset-0 cursor-pointer" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative w-full max-w-md bg-[#120D24] border border-purple-500/30 rounded-2xl shadow-[0_0_50px_rgba(139,92,246,0.25)] p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-zinc-400 hover:text-white bg-purple-950/40 border border-purple-500/20 p-1.5 rounded-lg transition-colors">
              <X className="w-4 h-4" />
            </button>
            <div className="flex flex-col items-center mb-6 mt-2">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500/20 to-purple-600/20 border border-purple-500/40 rounded-2xl flex items-center justify-center mb-3 shrink-0 shadow-[0_0_20px_rgba(139,92,246,0.2)]">
                <Zap className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-extrabold uppercase tracking-tight text-white font-heading">Support the Code</h3>
              <p className="text-[11px] text-zinc-400 font-mono mt-1 text-center">Initialize secure connection to payment gateway.</p>
            </div>
            <form onSubmit={handlePayment} className="flex flex-col gap-3.5 w-full">
              <div>
                <label className="block text-[11px] font-mono text-purple-300 uppercase tracking-wider mb-1">Display Name</label>
                <input type="text" value={sponsorName} onChange={(e) => setSponsorName(e.target.value)} placeholder="Your Name" className="w-full bg-[#080511] border border-purple-500/30 text-white p-3 rounded-xl focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(56,189,248,0.2)] outline-none text-xs sm:text-sm transition-all" required />
              </div>
              <div>
                <label className="block text-[11px] font-mono text-purple-300 uppercase tracking-wider mb-1">Email Address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="contact@domain.com" className="w-full bg-[#080511] border border-purple-500/30 text-white p-3 rounded-xl focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(56,189,248,0.2)] outline-none text-xs sm:text-sm transition-all" required />
              </div>
              <div>
                <label className="block text-[11px] font-mono text-purple-300 uppercase tracking-wider mb-1">Amount (INR)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 font-mono text-sm pointer-events-none font-bold">₹</span>
                  <input 
                    type="number" 
                    value={amount} 
                    onChange={(e) => setAmount(Number(e.target.value))} 
                    className="w-full bg-[#080511] border border-purple-500/30 text-white py-3 pr-3 pl-10 rounded-xl focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(56,189,248,0.2)] outline-none text-xs sm:text-sm font-mono font-semibold transition-all" 
                    required 
                  />
                </div>
              </div>
              <button type="submit" disabled={isProcessing} className="w-full mt-3 neon-gradient-btn text-white font-bold py-3.5 rounded-xl hover:opacity-95 disabled:opacity-50 text-sm tracking-wide shadow-[0_0_25px_rgba(249,115,22,0.35)] transition-all">
                {isProcessing ? 'Establishing Link...' : 'Proceed to Checkout'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SponsorSection;