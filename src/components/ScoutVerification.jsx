import React, { useState } from 'react';

function ScoutVerification() {
  // Local state to simulate uploading documents and verification status
  const [scoutDetails, setScoutDetails] = useState({
    name: "Alexandre Dupont",
    club: "Olympique Lyonnais (France)",
    licenseNumber: "FIFA-88291-EU",
    isVerified: false,
    isPremium: false,
    documentSubmitted: false
  });

  const [inputLicense, setInputLicense] = useState("");
  const [inputEmail, setInputEmail] = useState("");

  const handleVerifySubmit = (e) => {
    e.preventDefault();
    if (!inputLicense || !inputEmail) return alert("Please fill out all verification fields!");
    
    // Check if it's an official professional club domain email
    if (!inputEmail.includes('@') || inputEmail.endsWith('@gmail.com') || inputEmail.endsWith('@yahoo.com')) {
      return alert("⚠️ Security Alert: Scouts must provide an official professional club or agency email domain (e.g., name@clubfc.com)!");
    }

    setScoutDetails({
      ...scoutDetails,
      licenseNumber: inputLicense,
      documentSubmitted: true
    });
    alert("📑 Professional documents and Club ID submitted safely! Lunara compliance team will verify this within 24 hours.");
  };

  // Simulate buying the Premium Subscription
  const handleUpgradePremium = () => {
    setScoutDetails({
      ...scoutDetails,
      isPremium: true,
      isVerified: true // Auto-verify for simulation purposes once upgraded
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in text-white">
      {/* HEADER PORTAL BANNER */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight">🛡️ Lunara Anti-Fraud Scout Portal</h1>
          <p className="text-xs text-slate-400 mt-1">Protecting grassroots Nigerian athletes through rigorous professional document validation.</p>
        </div>
        
        {/* Dynamic Verification Badge Badge */}
        <div className="flex items-center gap-2">
          {scoutDetails.isPremium ? (
            <span className="bg-amber-500 text-slate-950 px-4 py-2 rounded-xl text-xs font-black tracking-wider flex items-center gap-1.5 shadow-lg shadow-amber-500/20">
              🏅 VERIFIED PREMIUM SCOUT
            </span>
          ) : scoutDetails.documentSubmitted ? (
            <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-4 py-2 rounded-xl text-xs font-bold">
              ⏳ Verification Pending Approval
            </span>
          ) : (
            <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 px-4 py-2 rounded-xl text-xs font-bold">
              ❌ Unverified Account
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT COLUMN: UPLOAD AND VERIFICATION FORM */}
        <div className="md:col-span-2 bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-4">
          <h3 className="text-lg font-bold tracking-tight text-slate-200">Submit Verification Credentials</h3>
          <p className="text-xs text-slate-400 -mt-2">Upload your official credentials to connect with players across Lagos, Enugu, and nationwide safely.</p>
          
          <form onSubmit={handleVerifySubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Official Club / Agency Email</label>
              <input 
                type="text" 
                placeholder="e.g., scout@manchesterunited.com" 
                value={inputEmail}
                onChange={(e) => setInputEmail(e.target.value)}
                disabled={scoutDetails.documentSubmitted}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500/40 disabled:opacity-50"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">FIFA Scout License / Club ID Number</label>
              <input 
                type="text" 
                placeholder="e.g., FIFA-XXXXX-EU" 
                value={inputLicense}
                onChange={(e) => setInputLicense(e.target.value)}
                disabled={scoutDetails.documentSubmitted}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500/40 disabled:opacity-50"
              />
            </div>
            
            <button 
              type="submit" 
              disabled={scoutDetails.documentSubmitted}
              className="w-full bg-sky-600 hover:bg-sky-700 disabled:bg-slate-800 disabled:text-slate-500 font-bold py-3 rounded-xl transition-all shadow-md active:scale-95 text-xs text-white"
            >
              {scoutDetails.documentSubmitted ? "Application Documents Stored Securely" : "Submit Credentials for Verification Review"}
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: PREMIUM BADGE UPGRADE PRICING BOX */}
        <div className="md:col-span-1 bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between text-center gap-6">
          <div>
            <div className="text-3xl">🏆</div>
            <h3 className="text-md font-extrabold tracking-wide mt-2 text-amber-400">Lunara Premium Scout</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">Unlock direct messaging channels to grassroots academies and activate your golden verification trust badge.</p>
          </div>
          
          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/60">
            <div className="text-2xl font-black text-white">€49<span className="text-xs font-normal text-slate-400">/mo</span></div>
            <div className="text-[10px] text-emerald-400 font-bold mt-1">✓ Secure Stripe Billing Checkout</div>
          </div>

          <button 
            onClick={handleUpgradePremium}
            disabled={scoutDetails.isPremium}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 py-3 rounded-xl text-xs font-black tracking-wide text-slate-950 disabled:cursor-not-allowed transition-all shadow-lg active:scale-95"
          >
            {scoutDetails.isPremium ? "Premium Activated" : "Upgrade & Get Gold Badge"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ScoutVerification;
