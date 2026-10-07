import React from 'react';

function Navigation({ activeScreen, setActiveScreen, sidebarOpen, setSidebarOpen, setUserSession, userRole, isProfileActivated }) {
  
  // Master Matrix Matrix with Dynamic visibility triggers
  const allNavItems = [
    { id: 'feed', label: 'Reels', icon: '📱', showForPlayer: true, showForScout: true },
    { id: 'scout', label: 'Radar', icon: '🔍', showForPlayer: true, showForScout: true },
    { id: 'verify', label: 'Verify', icon: '🛡️', showForPlayer: false, showForScout: true }, // Players NEVER see verify
    { id: 'register', label: 'Register', icon: '📝', showForPlayer: !isProfileActivated, showForScout: false }, // Disappears once profile is active
    { id: 'profile', label: 'Profile', icon: '👤', showForPlayer: isProfileActivated, showForScout: false }, // ONLY appears when registered
    { id: 'tracking', label: 'Stats', icon: '📈', showForPlayer: isProfileActivated, showForScout: false } // ONLY appears when registered
  ];

  // Dynamic pipeline filtering rules
  const authorizedNavItems = allNavItems.filter(item => {
    if (userRole === 'scout') return item.showForScout;
    if (userRole === 'player') return item.showForPlayer;
    return false;
  });

  return (
    <>
      <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-3 sticky top-0 z-30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="hidden md:block text-slate-300 hover:text-white text-xl p-1 bg-slate-800 rounded-lg border border-slate-700/60">☰</button>
          <span className="text-xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 bg-clip-text text-transparent tracking-tighter">LUNARA</span>
          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">{userRole}</span>
        </div>
        <button onClick={() => setUserSession({ isLoggedIn: false, role: 'player', email: '' })} className="text-xs bg-slate-800 hover:bg-rose-950 hover:text-rose-400 text-slate-400 border border-slate-700 px-3 py-1.5 rounded-xl transition-all">Sign Out</button>
      </header>

      {/* DESKTOP DRAWERS */}
      {sidebarOpen && (
        <div className="hidden md:block fixed left-0 top-[53px] w-64 bg-slate-900 h-[calc(100vh-53px)] border-r border-slate-800 p-4 z-40">
          <ul className="space-y-1">
            {authorizedNavItems.map(item => (
              <li key={item.id} onClick={() => { setActiveScreen(item.id); setSidebarOpen(false); }} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-pointer text-xs font-bold transition-all ${activeScreen === item.id ? 'bg-gradient-to-r from-pink-600 to-orange-500 text-white' : 'text-slate-400 hover:bg-slate-800'}`}>
                <span>{item.icon}</span> <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* MOBILE BAR (Instagram standard Mobile UI) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 py-2 px-2 flex justify-around items-center z-50 shadow-2xl">
        {authorizedNavItems.map(item => {
          const isActive = activeScreen === item.id;
          return (
            <button key={item.id} onClick={() => setActiveScreen(item.id)} className="flex flex-col items-center gap-0.5 relative py-1 flex-1">
              <span className={`text-xl transition-transform ${isActive ? 'scale-110 text-white' : 'opacity-50 text-slate-400'}`}>{item.icon}</span>
              <span className={`text-[9px] font-bold tracking-tight ${isActive ? 'text-orange-400' : 'text-slate-500'}`}>{item.label}</span>
              {isActive && <span className="absolute bottom-0 w-1 h-1 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full"></span>}
            </button>
          );
        })}
      </nav>
    </>
  );
}

export default Navigation;
