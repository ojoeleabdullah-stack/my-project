import React from 'react';

function Sidebar({ activeScreen, setActiveScreen }) {
  // A clean list of our application tabs
  const navigationItems = [
    { id: 'profile', label: 'Player Profile', icon: '👤' },
    { id: 'tracking', label: 'Growth Tracker', icon: '📈' },
    { id: 'scout', label: 'Scout Dashboard', icon: '🔍' }
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-100 min-h-screen flex flex-col justify-between p-6 border-r border-slate-800 shadow-xl">
      <div>
        {/* App Title Header */}
        <div className="flex items-center gap-3 mb-8 px-2">
          <span className="text-2xl">🌙</span>
          <h2 className="text-xl font-bold tracking-wider text-sky-400 font-sans">LUNARA</h2>
        </div>
        
        {/* Navigation Link List */}
        <nav>
          <ul className="space-y-2">
            {navigationItems.map((item) => {
              const isActive = activeScreen === item.id;
              return (
                <li 
                  key={item.id}
                  onClick={() => setActiveScreen(item.id)}
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer font-medium tracking-wide transition-all duration-200 ease-in-out
                    ${isActive 
                      ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20 scale-[1.02]' 
                      : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                    }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Dynamic Profile Footer Status */}
      <div className="border-t border-slate-800 pt-4 px-2 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-sky-500/20 border border-sky-400 flex items-center justify-center font-bold text-sky-400 text-xs">
          OA
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-slate-200">Abdullah</span>
          <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Mode: Active
          </span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
