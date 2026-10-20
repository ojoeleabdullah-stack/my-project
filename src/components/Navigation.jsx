import React from 'react';

function Navigation({ activeScreen, setActiveScreen, sidebarOpen, setSidebarOpen, setUserSession, userRole, isProfileActivated }) {
  
  // Strict UI Mapping Strategy 
   const allNavItems = [
    { id: 'scout', label: 'Talent Radar', icon: '🔍', viewableBy: ['player', 'coach', 'scout', 'admin'] },
    { id: 'verify', label: 'Compliance ID', icon: '🛡️', viewableBy: ['scout'] },
    { id: 'team', label: 'Roster Hub', icon: '📋', viewableBy: ['coach'] },
    
    // 🛠️ ADMIN EXCLUSIVE LINK REGISTRATION
    { id: 'admin', label: 'Safety Moderation', icon: '🛠️', viewableBy: ['admin'] },

    { id: 'register', label: 'Setup Card', icon: '📝', viewableBy: userRole === 'player' && !isProfileActivated ? ['player'] : [] },
    { id: 'profile', label: 'My Profile', icon: '👤', viewableBy: userRole === 'player' && isProfileActivated ? ['player'] : [] },
    { id: 'tracking', label: 'Metric Logs', icon: '📈', viewableBy: userRole === 'player' && isProfileActivated ? ['player'] : [] }
  ];

  const authorizedNavItems = allNavItems.filter(item => item.viewableBy.includes(userRole));

  return (
    <>
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 sticky top-0 z-30 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="hidden md:block text-slate-400 hover:text-white text-xs px-2.5 py-1 bg-slate-950 border border-slate-800 rounded font-bold font-mono">MENU</button>
          <span className="text-lg font-black tracking-widest text-white font-mono">LUNARA</span>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-950 border border-slate-800 text-sky-400 px-2.5 py-0.5 rounded">
            Role Variable: {userRole}
          </span>
        </div>
        <button onClick={() => setUserSession({ isLoggedIn: false, role: 'player', email: '' })} className="text-xs bg-slate-950 border border-slate-800 hover:border-rose-900 text-slate-400 hover:text-rose-400 px-4 py-1.5 rounded transition-all font-bold uppercase tracking-wider">Disconnect</button>
      </header>

      {/* MOBILE HUD CONTAINER (Instagram Layout standard) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 py-3 px-2 flex justify-around items-center z-50 shadow-xl">
        {authorizedNavItems.map(item => {
          const isActive = activeScreen === item.id;
          return (
            <button key={item.id} onClick={() => setActiveScreen(item.id)} className="flex flex-col items-center gap-1 flex-1">
              <span className={`text-sm ${isActive ? 'text-sky-400 scale-105 opacity-100' : 'text-slate-500 opacity-60'}`}>{item.icon}</span>
              <span className={`text-[9px] font-bold uppercase tracking-tight ${isActive ? 'text-sky-400' : 'text-slate-500'}`}>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}

export default Navigation;
