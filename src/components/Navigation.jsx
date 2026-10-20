import React from 'react';

function Navigation({ activeScreen, setActiveScreen, sidebarOpen, setSidebarOpen, setUserSession, userRole, isProfileActivated }) {
  
  const allNavItems = [
    { id: 'scout', label: 'Talent Radar', icon: '🔍', showForPlayer: true, showForCoach: true, showForScout: true },
    { id: 'verify', label: 'Verification', icon: '🛡️', showForPlayer: false, showForCoach: true, showForScout: true },
    { id: 'register', label: 'Setup Profile', icon: '.📝', showForPlayer: !isProfileActivated, showForCoach: false, showForScout: false },
    { id: 'profile', label: 'Player Card', icon: '👤', showForPlayer: isProfileActivated, showForCoach: false, showForScout: false },
    { id: 'tracking', label: 'Metric Logs', icon: '📈', showForPlayer: isProfileActivated, showForCoach: false, showForScout: false },
    { id: 'team', label: 'Roster Hub', icon: '📋', showForPlayer: false, showForCoach: true, showForScout: false },
  ];

  const authorizedNavItems = allNavItems.filter(item => {
    if (userRole === 'player') return item.showForPlayer;
    if (userRole === 'coach') return item.showForCoach;
    if (userRole === 'scout') return item.showForScout;
    return false;
  });

  return (
    <>
      {/* PROFESSIONAL TECHNICAL HEADER */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-3.5 sticky top-0 z-30 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)} 
            className="hidden md:block text-slate-400 hover:text-white text-sm px-2 py-1 bg-slate-950 border border-slate-800 rounded"
          >
            MENU
          </button>
          <span className="text-lg font-black tracking-widest text-white font-mono">LUNARA</span>
          <span className="text-[9px] font-mono font-bold uppercase tracking-wider bg-slate-950 border border-slate-800 text-sky-400 px-2 py-0.5 rounded">
            Context: {userRole}
          </span>
        </div>
        <button 
          onClick={() => setUserSession({ isLoggedIn: false, role: 'player', email: '' })} 
          className="text-xs bg-slate-950 border border-slate-800 hover:border-rose-900 text-slate-400 hover:text-rose-400 px-3 py-1.5 rounded transition-all font-medium uppercase tracking-wider"
        >
          Sign Out
        </button>
      </header>

      {/* DESKTOP SIDEBAR DRAWER */}
      {sidebarOpen && (
        <div className="hidden md:block fixed left-0 top-[53px] w-64 bg-slate-900 h-[calc(100vh-53px)] border-r border-slate-800 p-4 z-40">
          <ul className="space-y-1">
            {authorizedNavItems.map(item => (
              <li 
                key={item.id} 
                onClick={() => { setActiveScreen(item.id); setSidebarOpen(false); }} 
                className={`flex items-center gap-3 px-4 py-2.5 rounded cursor-pointer text-xs font-bold uppercase tracking-wider transition-all 
                  ${activeScreen === item.id ? 'bg-sky-600 text-white font-extrabold shadow' : 'text-slate-400 hover:bg-slate-950 hover:text-slate-200'}`}
              >
                <span>{item.icon}</span> <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* MOBILE HIGH-CONTRAST DATA NAVIGATION BAR */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 py-2.5 px-2 flex justify-around items-center z-50 shadow-xl">
        {authorizedNavItems.map(item => {
          const isActive = activeScreen === item.id;
          return (
            <button 
              key={item.id} 
              onClick={() => setActiveScreen(item.id)} 
              className="flex flex-col items-center gap-1 flex-1 transition-all"
            >
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
