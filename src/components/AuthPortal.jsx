import React, { useState } from 'react';

function AuthPortal({ setUserSession }) {
  const [isSignUp, setIsSignUp] = useState(false); // Toggle switcher state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('player');

  const handleAuthAction = (e) => {
    e.preventDefault();
    if (!email || !password) return alert("Please fill out your credentials!");

    setUserSession({
      isLoggedIn: true,
      role: role
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4 font-sans text-white">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl space-y-6">
        
        {/* Branding Logo Header */}
        <div className="text-center">
          <span className="text-4xl">🌙</span>
          <h1 className="text-3xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 bg-clip-text text-transparent mt-2">LUNARA</h1>
          <p className="text-xs text-slate-400 mt-1">Connecting Nigerian Grassroot Talent to the Football World.</p>
        </div>

        {/* Dynamic Nav Switch Tabs */}
        <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800/80">
          <button 
            onClick={() => setIsSignUp(false)}
            className={`flex-1 text-center py-2 text-xs font-bold rounded-lg transition-all ${!isSignUp ? 'bg-gradient-to-r from-pink-600 to-orange-500 text-white' : 'text-slate-400'}`}
          >
            Sign In
          </button>
          <button 
            onClick={() => setIsSignUp(true)}
            className={`flex-1 text-center py-2 text-xs font-bold rounded-lg transition-all ${isSignUp ? 'bg-gradient-to-r from-pink-600 to-orange-500 text-white' : 'text-slate-400'}`}
          >
            Create Account
          </button>
        </div>

        <form onSubmit={handleAuthAction} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Email Address</label>
            <input 
              type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-500/40"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Password</label>
            <input 
              type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-500/40"
            />
          </div>

          {isSignUp && (
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">I am registering as a:</label>
              <select 
                value={role} onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500/40"
              >
                <option value="player">🇳🇬 Grassroot Player / Academy</option>
                <option value="scout">🇪🇺 International Scout / Agent</option>
              </select>
            </div>
          )}

          <button type="submit" className="w-full bg-gradient-to-r from-pink-600 to-orange-500 hover:from-pink-700 hover:to-orange-600 font-bold py-3 rounded-xl transition-all shadow-lg active:scale-95 text-sm text-white">
            {isSignUp ? 'Register Network Account' : 'Secure Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AuthPortal;
