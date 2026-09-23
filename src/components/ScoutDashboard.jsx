import React from 'react';

function ScoutDashboard() {
  // Enhanced talent pool array with realistic football scouting data
  const talentPool = [
    { 
      id: 1, 
      name: "Chidi Okafor", 
      position: "Striker", 
      age: 18, 
      club: "Enugu Rangers Academy", 
      rating: 4.8, 
      status: "Highly scouted", 
      metrics: { pace: "92", shooting: "88", stamina: "81" } 
    },
    { 
      id: 2, 
      name: "Tunde Bakare", 
      position: "Goalkeeper", 
      age: 20, 
      club: "Kano Pillars Jrs", 
      rating: 4.5, 
      status: "Trial active", 
      metrics: { reflexes: "89", diving: "84", handling: "78" } 
    },
    { 
      id: 3, 
      name: "Ojoele Abdullah", 
      position: "Midfielder", 
      age: 19, 
      club: "Lagos Football Academy", 
      rating: 4.9, 
      status: "Top Prospect", 
      metrics: { passing: "94", vision: "91", control: "89" } 
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
      {/* 📡 DASHBOARD BANNER */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">🔍 Scout Talent Radar</h1>
          <p className="text-sm text-slate-400 mt-1">Review live performance analytics and status tags of top local prospects.</p>
        </div>
        <div className="flex gap-2">
          <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-3 py-2 rounded-xl">Total: {talentPool.length} Profiles</span>
          <span className="text-xs font-semibold bg-sky-50 text-sky-600 px-3 py-2 rounded-xl border border-sky-100">Live Stream Online</span>
        </div>
      </div>

      {/* 📋 TALENT LISTING VIEW */}
      <div className="grid grid-cols-1 gap-4">
        {talentPool.map((talent) => (
          <div 
            key={talent.id} 
            className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 group"
          >
            {/* Player Info Left Section */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white font-black text-lg flex items-center justify-center shadow-sm">
                {talent.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-slate-800 text-lg group-hover:text-sky-600 transition-colors">{talent.name}</h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider
                    ${talent.status === 'Top Prospect' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : ''}
                    ${talent.status === 'Highly scouted' ? 'bg-amber-50 text-amber-600 border border-amber-100' : ''}
                    ${talent.status === 'Trial active' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' : ''}
                  `}>
                    {talent.status}
                  </span>
                </div>
                <p className="text-sm text-slate-500 font-medium">{talent.position} • <span className="text-slate-400">{talent.age} yrs old</span></p>
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">🏟️ {talent.club}</p>
              </div>
            </div>

            {/* Core Attributes Metrics Center Section */}
            <div className="flex flex-wrap gap-3 items-center w-full lg:w-auto">
              {Object.entries(talent.metrics).map(([key, value]) => (
                <div key={key} className="bg-slate-50 border border-slate-100/80 rounded-xl px-4 py-2 text-center min-w-[85px] flex-1 lg:flex-none">
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{key}</div>
                  <div className="text-base font-extrabold text-slate-700 mt-0.5">{value}</div>
                </div>
              ))}
            </div>

            {/* Rating & Action Button Right Section */}
            <div className="flex items-center justify-between lg:justify-end w-full lg:w-auto border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-100 gap-6">
              <div className="text-right">
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Scout Rating</div>
                <div className="text-lg font-black text-amber-500 flex items-center gap-1 justify-end mt-0.5">
                  ⭐ <span className="text-slate-800">{talent.rating}</span>
                </div>
              </div>
              <button className="bg-slate-900 hover:bg-sky-600 text-white font-semibold text-xs px-4 py-3 rounded-xl transition-all shadow-sm active:scale-95">
                View Reports
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScoutDashboard;
