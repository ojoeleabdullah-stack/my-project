import React from 'react';

function Navigation({ activeScreen, setActiveScreen, sidebarOpen, setSidebarOpen, setUserSession }) {
  
  const navItems = [
    { id: 'feed', label: 'Feed', icon: '📱' },
    { id: 'register', label: 'Register', icon: '📝' },
    { id: 'profile', label: 'Vault', icon: '👤' },
    { id: 'tracking', label: 'Stats', icon: '📈' },
    { id: 'scout', label: 'Radar', icon: '🔍' },
    { id: 'verify', label: 'Verify', icon: '🛡️' }
  ];

  return (
    <>
      {/* HEADER BAR (Desktop & Mobile Top Control) */}
      <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-3 sticky top-0 z-30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Desktop Hamburger Toggle Bars Icon */}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden md:block text-slate-300 hover:text-white text-xl p-1 bg-slate-800 rounded-lg border border-slate-700/60"
          >
            ☰
          </button>
          <span className="text-xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">LUNARA</span>
        </div>

        <button 
          onClick={() => setUserSession({ isLoggedIn: false, role: 'player' })}
          className="text-xs bg-slate-800 hover:bg-rose-950 hover:text-rose-400 text-slate-400 border border-slate-700 px-3 py-1.5 rounded-xl transition-all"
        >
          Sign Out
        </button>
      </header>

      {/* 🖥️ DESKTOP TOGGLED FLYOUT SIDEBAR DRAWER */}
      {sidebarOpen && (
        <div className="hidden md:block fixed left-0 top-[53px] w-64 bg-slate-900 h-[calc(100vh-53px)] border-r border-slate-800 p-4 z-40 animate-fade-in">
          <ul className="space-y-1">
            {navItems.map(item => (
              <li 
                key={item.id} onClick={() => { setActiveScreen(item.id); setSidebarOpen(false); }}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-pointer text-xs font-bold tracking-wide transition-all
                  ${activeScreen === item.id ? 'bg-gradient-to-r from-pink-600 to-orange-500 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
              >
                <span>{item.icon}</span> <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 📱 MOBILE INSTAGRAM BOTTOM NAVIGATION NAVIGATION BAR */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 py-2 px-4 flex justify-around items-center z-50 shadow-2xl">
        {navItems.map(item => {
          const isActive = activeScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveScreen(item.id)}
              className="flex flex-col items-center gap-0.5 relative py-1 flex-1"
            >
              <span className={`text-xl transition-transform ${isActive ? 'scale-110' : 'opacity-60'}`}>{item.icon}</span>
              <span className={`text-[9px] font-bold tracking-tight ${isActive ? 'text-orange-400' : 'text-slate-500'}`}>{item.label}</span>
              {isActive && <span className="absolute bottom-0 w-1 h-1 bg-orange-500 rounded-full"></span>}
            </button>
          );
        })}
      </nav>
    </>
  );
}

export default Navigation;
