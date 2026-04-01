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
        handler: function (response: any) {
          alert(`Success! Payment ID: ${response.razorpay_payment_id}`);
          setIsModalOpen(false);
          setSponsorName('');
          setEmail('');
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
          <div className="flex items-center gap-2 sm:gap-3 mb-8 sm:mb-12">
            <Award className="w-5 h-5 sm:w-6 sm:h-6 text-accent shrink-0" />
            <h2 className="text-xl sm:text-2xl font-bold text-textPrimary tracking-tight">Wall_of_Fame</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 w-full">
            {sponsors.map((sponsor, index) => (
              <div key={index} className="bg-surface border border-zinc-800 rounded-lg p-3 sm:p-4 flex flex-col items-center justify-center text-center hover:border-zinc-600 transition-colors w-full min-w-0">
                <Terminal className="w-5 h-5 sm:w-6 sm:h-6 text-textSecondary mb-2 shrink-0" />
                <span className="text-white font-medium text-xs sm:text-sm line-clamp-1 break-all">{sponsor.sponsorName}</span>
                
                <div className="flex items-center gap-1.5 text-accent font-mono text-[10px] sm:text-xs mt-1.5">
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="absolute inset-0 cursor-pointer" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative w-full max-w-md bg-surface border border-zinc-700 rounded-xl shadow-2xl p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-3 sm:top-4 right-3 sm:right-4 text-textSecondary hover:text-white bg-surface p-1 rounded-md"><X className="w-5 h-5" /></button>
            <div className="flex flex-col items-center mb-6 mt-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent/20 rounded-full flex items-center justify-center mb-3 sm:mb-4 shrink-0"><Zap className="w-5 h-5 sm:w-6 sm:h-6 text-accent" /></div>
              <h3 className="text-lg sm:text-xl font-bold text-white text-center">Support the Code</h3>
              <p className="text-[10px] sm:text-xs text-textSecondary font-mono mt-1 sm:mt-2 text-center">Initialize secure connection to payment gateway.</p>
            </div>
            <form onSubmit={handlePayment} className="flex flex-col gap-3 sm:gap-4 w-full">
              <div>
                <label className="block text-[10px] sm:text-xs font-mono text-textSecondary mb-1">Display Name</label>
                <input type="text" value={sponsorName} onChange={(e) => setSponsorName(e.target.value)} placeholder="Your Name" className="w-full bg-background border border-zinc-800 text-white p-2.5 sm:p-3 rounded-md focus:border-accent text-xs sm:text-sm" required />
              </div>
              <div>
                <label className="block text-[10px] sm:text-xs font-mono text-textSecondary mb-1">Email Address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="contact@domain.com" className="w-full bg-background border border-zinc-800 text-white p-2.5 sm:p-3 rounded-md focus:border-accent text-xs sm:text-sm" required />
              </div>
              <div>
                <label className="block text-[10px] sm:text-xs font-mono text-textSecondary mb-1">Amount (INR)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-mono text-sm pointer-events-none">₹</span>
                  <input 
                    type="number" 
                    value={amount} 
                    onChange={(e) => setAmount(Number(e.target.value))} 
                    className="w-full bg-background border border-zinc-800 text-white py-2.5 sm:py-3 pr-3 pl-10 rounded-md focus:border-accent text-xs sm:text-sm" 
                    required 
                  />
                </div>
              </div>
              <button type="submit" disabled={isProcessing} className="w-full mt-2 sm:mt-4 bg-white text-black font-bold py-2.5 sm:py-3 rounded-md hover:bg-gray-200 disabled:opacity-50 text-sm sm:text-base">
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