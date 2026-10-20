import React, { useState } from 'react';

function AuthPortal({ setUserSession, setActiveScreen, isProfileActivated }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('player');

  const handleAuthAction = (e) => {
    e.preventDefault();
    if (!email || !password) return alert("Please enter your credentials.");

    setUserSession({
      isLoggedIn: true,
      role: role,
      email: email
    });

    if (role === 'scout') {
      setActiveScreen('scout');
    } else if (role === 'coach') {
      setActiveScreen('team');
    } else {
      setActiveScreen(isProfileActivated ? 'profile' : 'register');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4 font-sans text-slate-100">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 p-8 rounded-xl shadow-xl space-y-6">
        
        {/* Formal Header Logo */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-black tracking-widest text-white font-mono">LUNARA</h1>
          <div className="h-0.5 w-12 bg-sky-500 mx-auto"></div>
          <p className="text-xs text-slate-400 font-medium tracking-wide uppercase">Sports Technology / Talent Discovery</p>
        </div>

        {/* PRD Compliant Segmented Switcher */}
        <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
          <button 
            type="button"
            onClick={() => setIsSignUp(false)}
            className={`flex-1 text-center py-2 text-xs font-bold rounded transition-all ${!isSignUp ? 'bg-sky-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Sign In
          </button>
          <button 
            type="button"
            onClick={() => setIsSignUp(true)}
            className={`flex-1 text-center py-2 text-xs font-bold rounded transition-all ${isSignUp ? 'bg-sky-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Create Account
          </button>
        </div>

        <form onSubmit={handleAuthAction} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email Address</label>
            <input 
              type="email" placeholder="scout@clubfc.com" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-sky-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Password</label>
            <input 
              type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-sky-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Platform Identity Context</label>
            <select 
              value={role} onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-800 text-sm text-slate-300 focus:outline-none focus:border-sky-500 transition-colors bg-none"
            >
              <option value="player">Grassroots Player / Athlete</option>
              <option value="coach">Academy Coach / Team Manager</option>
              <option value="scout">Professional Recruiter / Scout</option>
              <option value="admin"> Platform Infrastructure Administrator</option>
            </select>
          </div>

          <button type="submit" className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-2.5 rounded text-sm transition-colors uppercase tracking-wider shadow">
            {isSignUp ? 'Register Credentials' : 'Authenticate Session'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AuthPortal;
