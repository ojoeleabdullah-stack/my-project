import React, { useEffect } from 'react';

const ROLE_LABELS = {
  player: 'Player',
  coach: 'Coach',
  scout: 'Scout',
  admin: 'Admin',
};

function Navigation({
  activeScreen,
  setActiveScreen,
  sidebarOpen,
  setSidebarOpen,
  setUserSession,
  userRole,
  isProfileActivated,
}) {
  const allNavItems = [
    { id: 'scout', label: 'Talent Radar', icon: '🔍', viewableBy: ['player', 'coach', 'scout', 'admin'] },
    { id: 'verify', label: 'Compliance ID', icon: '🛡️', viewableBy: ['scout'] },
    { id: 'team', label: 'Roster Hub', icon: '📋', viewableBy: ['coach'] },
    { id: 'admin', label: 'Safety Moderation', icon: '🛠️', viewableBy: ['admin'] },
    { id: 'register', label: 'Setup Card', icon: '📝', viewableBy: userRole === 'player' && !isProfileActivated ? ['player'] : [] },
    { id: 'profile', label: 'My Profile', icon: '👤', viewableBy: userRole === 'player' && isProfileActivated ? ['player'] : [] },
    { id: 'tracking', label: 'Metric Logs', icon: '📈', viewableBy: userRole === 'player' && isProfileActivated ? ['player'] : [] },
  ];

  const authorizedNavItems = allNavItems.filter((item) => item.viewableBy.includes(userRole));

  // functional updater 
  const handleToggleSidebar = () => {
    if (typeof setSidebarOpen === 'function') setSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    if (typeof setSidebarOpen === 'function') setSidebarOpen(false);
  };

  // (desktop UX)
  const handleNavClick = (id) => {
    setActiveScreen(id);
    closeSidebar();
  };

  const handleLogout = () => {
    try { localStorage.removeItem('lunara.token'); } catch { /* SSR / private mode */ }
    setUserSession({ isLoggedIn: false, role: null, email: null });
    closeSidebar();
  };

  // Bonus UX: Escape closes drawer
  useEffect(() => {
    if (!sidebarOpen) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') closeSidebar(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sidebarOpen]);

  return (
    <>
      {/* HEADER — MENU button stays hidden on mobile as you had it */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 h-16 sticky top-0 z-50 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={handleToggleSidebar}
            aria-label={sidebarOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={!!sidebarOpen}
            aria-controls="app-sidebar"
            className="hidden md:block text-slate-400 hover:text-white text-xs px-2.5 py-1 bg-slate-950 border border-slate-800 rounded font-bold font-mono focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            {sidebarOpen ? 'CLOSE' : 'MENU'}
          </button>
          <span className="text-lg font-black tracking-widest text-white font-mono">LUNARA</span>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-950 border border-slate-800 text-sky-400 px-2.5 py-0.5 rounded">
            {ROLE_LABELS[userRole] ?? 'Guest'}
          </span>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="text-xs bg-slate-950 border border-slate-800 hover:border-rose-900 text-slate-400 hover:text-rose-400 px-4 py-1.5 rounded transition-all font-bold uppercase tracking-wider"
        >
          Disconnect
        </button>
      </header>

      {/* DESKTOP BACKDROP */}
      {sidebarOpen && (
        <div
          onClick={closeSidebar}
          className="hidden md:block fixed inset-0 top-16 bg-slate-950/60 z-40"
          aria-hidden="true"
        />
      )}

      {/* DESKTOP SLIDING SIDEBAR */}
      <aside
        id="app-sidebar"
        aria-hidden={!sidebarOpen}
        className={`hidden md:flex fixed top-16 bottom-0 left-0 w-64 bg-slate-900 border-r border-slate-800 z-40 flex-col p-4 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className="flex flex-col gap-1">
          {authorizedNavItems.map((item) => {
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`flex items-center gap-3 px-3 py-2 rounded text-left text-sm font-bold uppercase tracking-tight transition-colors border ${
                  isActive
                    ? 'bg-slate-950 text-sky-400 border-slate-800'
                    : 'text-slate-400 hover:text-white hover:bg-slate-950 border-transparent'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* MOBILE HUD */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 py-3 px-2 flex justify-around items-center z-50 shadow-xl">
        {authorizedNavItems.map((item) => {
          const isActive = activeScreen === item.id;
          return (
            <button
              type="button"
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              aria-current={isActive ? 'page' : undefined}
              className="flex flex-col items-center gap-1 flex-1"
            >
              <span className={`text-sm ${isActive ? 'text-sky-400 scale-105 opacity-100' : 'text-slate-500 opacity-60'}`}>
                {item.icon}
              </span>
              <span className={`text-[9px] font-bold uppercase tracking-tight ${isActive ? 'text-sky-400' : 'text-slate-500'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
}

export default Navigation;