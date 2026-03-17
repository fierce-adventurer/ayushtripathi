import { useState, useEffect } from 'react';
import axios from 'axios';
import { Award, Terminal, X, Zap } from 'lucide-react';

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
  const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

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
  }, []);

  // GLOBAL EVENT LISTENER: Listen for the Dashboard Nav button click
  useEffect(() => {
    const handleOpenModal = () => setIsModalOpen(true);
    window.addEventListener('open-payment-gateway', handleOpenModal);
    
    // Cleanup listener when component unmounts
    return () => window.removeEventListener('open-payment-gateway', handleOpenModal);
  }, []);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isModalOpen]);

  // Handle the Payment Initiation
  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Razorpay logic will go here
      setTimeout(() => {
        console.log("Processing payment for:", sponsorName, amount);
        setIsProcessing(false);
        setIsModalOpen(false); // Close on success
      }, 1500);
    } catch (error) {
      console.error("Payment initiation failed", error);
      setIsProcessing(false);
    }
  };

  // If we are still fetching data, render absolutely nothing to prevent UI flashes
  if (loading) return null;

  return (
    <>
      {/* --- CONDITIONAL WALL OF FAME --- */}
      {/* Only renders into the DOM if the database has at least 1 sponsor */}
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

      {/* --- PAYMENT MODAL (Centered Square Overlay) --- */}
      {/* This can open regardless of whether the Wall of Fame is visible or not */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="absolute inset-0 cursor-pointer" onClick={() => setIsModalOpen(false)}></div>
          
          <div className="relative w-[380px] sm:w-[420px] bg-surface border border-zinc-700 rounded-xl shadow-2xl p-8 z-10">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-textSecondary hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center mb-6">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-white text-center">Support the Build</h3>
              <p className="text-xs text-textSecondary font-mono mt-2 text-center">
                Initialize secure connection to payment gateway.
              </p>
            </div>

            <form onSubmit={handlePayment} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-mono text-textSecondary mb-1">Display Name</label>
                <input 
                  type="text" 
                  value={sponsorName}
                  onChange={(e) => setSponsorName(e.target.value)}
                  placeholder="Hacker_99"
                  className="w-full bg-background border border-zinc-800 text-white p-3 rounded-md focus:outline-none focus:border-accent text-sm transition-colors"
                  required 
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-textSecondary mb-1">Email Address (Kept Private)</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contact@domain.com"
                  className="w-full bg-background border border-zinc-800 text-white p-3 rounded-md focus:outline-none focus:border-accent text-sm transition-colors"
                  required 
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-textSecondary mb-1">Amount (INR)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-textSecondary font-mono">₹</span>
                  <input 
                    type="number" 
                    min="100"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full bg-background border border-zinc-800 text-white p-3 pl-8 rounded-md focus:outline-none focus:border-accent text-sm transition-colors"
                    required 
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isProcessing}
                className="w-full mt-4 bg-white text-black font-bold py-3 rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
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