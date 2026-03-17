import { useState, useEffect } from 'react';
import axios from 'axios';
import { Award, Terminal, X, Zap } from 'lucide-react';

// --- ADDED: Robust Script Loader ---
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
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sponsorName, setSponsorName] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState(500);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Environment Variables
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID;

  // Fetch Sponsors on Load
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

  // Global event listener for modal
  useEffect(() => {
    const handleOpenModal = () => setIsModalOpen(true);
    window.addEventListener('open-payment-gateway', handleOpenModal);
    return () => window.removeEventListener('open-payment-gateway', handleOpenModal);
  }, []);

  // --- MODIFIED: The Core Payment Logic ---
  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    console.log("--- Payment Initiation Started ---");

    try {
      // 1. Check if Key ID exists
      if (!RAZORPAY_KEY) {
        throw new Error("VITE_RAZORPAY_KEY_ID is missing in Vercel environment variables.");
      }

      // 2. Load SDK
      console.log("Loading Razorpay SDK...");
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        throw new Error("Razorpay SDK failed to load. Check your internet connection.");
      }

      // 3. Create Order via Backend
      console.log("Requesting Order ID from Backend...");
      const { data: order } = await axios.post(`${API_URL}/api/payments/create-order`, {
        amount: amount, // Backend should handle conversion to paise
        currency: "INR",
        sponsorName: sponsorName,
        email: email
      });
      console.log("Order Received:", order);

      // 4. Configure Options
      const options = {
        key: RAZORPAY_KEY,
        amount: order.amount, // Already in paise from backend
        currency: order.currency,
        name: "Fierce Adventurer",
        description: "Portfolio Sponsorship",
        image: "https://your-domain.com/logo.png", // Optional: Add your logo URL
        order_id: order.id, 
        handler: function (response: any) {
          console.log("Payment Successful!", response);
          alert(`Success! Payment ID: ${response.razorpay_payment_id}`);
          setIsModalOpen(false);
          setSponsorName('');
          setEmail('');
          // Refresh list might be needed here or handled by your webhook/refresh logic
        },
        prefill: {
          name: sponsorName,
          email: email,
        },
        notes: {
          sponsor_name: sponsorName // Crucial for your Webhook Controller to read
        },
        theme: {
          color: "#10b981", // Emerald accent
        },
      };

      // 5. Open Modal
      console.log("Opening Razorpay Checkout UI...");
      const rzp = new (window as any).Razorpay(options);
      
      rzp.on('payment.failed', function (response: any) {
        console.error("Payment Failed Details:", response.error);
        alert(`Payment Failed: ${response.error.description}`);
      });

      rzp.open();

    } catch (error: any) {
      console.error("PAYMENT_FLOW_ERROR:", error);
      const errorMsg = error.response?.data?.message || error.message || "Unknown Error";
      alert(`Error: ${errorMsg}`);
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) return null;

  return (
    <>
      {/* Wall of Fame */}
      {sponsors.length > 0 && (
        <div id="sponsor" className="w-full pt-24 min-h-[40vh]">
          <div className="flex items-center gap-3 mb-12">
            <Award className="w-6 h-6 text-accent" />
            <h2 className="text-2xl font-bold text-textPrimary tracking-tight">Wall_of_Fame</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {sponsors.map((sponsor, index) => (
              <div key={index} className="bg-surface border border-zinc-800 rounded-lg p-4 flex flex-col items-center justify-center text-center hover:border-zinc-600 transition-colors">
                <Terminal className="w-6 h-6 text-textSecondary mb-2" />
                <span className="text-white font-medium text-sm line-clamp-1">{sponsor.sponsorName}</span>
                <span className="text-accent font-mono text-xs mt-1">
                  {sponsor.currency} {sponsor.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="absolute inset-0 cursor-pointer" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative w-[380px] sm:w-[420px] bg-surface border border-zinc-700 rounded-xl shadow-2xl p-8 z-10">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-textSecondary hover:text-white"><X className="w-5 h-5" /></button>
            <div className="flex flex-col items-center mb-6">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mb-4"><Zap className="w-6 h-6 text-accent" /></div>
              <h3 className="text-xl font-bold text-white">Support the Build</h3>
              <p className="text-xs text-textSecondary font-mono mt-2 text-center">Initialize secure connection to payment gateway.</p>
            </div>
            <form onSubmit={handlePayment} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-mono text-textSecondary mb-1">Display Name</label>
                <input type="text" value={sponsorName} onChange={(e) => setSponsorName(e.target.value)} placeholder="Your Name" className="w-full bg-background border border-zinc-800 text-white p-3 rounded-md focus:border-accent text-sm" required />
              </div>
              <div>
                <label className="block text-xs font-mono text-textSecondary mb-1">Email Address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="contact@domain.com" className="w-full bg-background border border-zinc-800 text-white p-3 rounded-md focus:border-accent text-sm" required />
              </div>
              <div>
                <label className="block text-xs font-mono text-textSecondary mb-1">Amount (INR)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-textSecondary font-mono">₹</span>
                  {/* ---> REMOVED min="100" from this input field <--- */}
                  <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full bg-background border border-zinc-800 text-white p-3 pl-8 rounded-md focus:border-accent text-sm" required />
                </div>
              </div>
              <button type="submit" disabled={isProcessing} className="w-full mt-4 bg-white text-black font-bold py-3 rounded-md hover:bg-gray-200 disabled:opacity-50">
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