import React, { useState } from 'react';
import ChatDrawer from './ChatDrawer';

function ScoutDashboard() {
  const talentPool = [
    { id: 1, name: "Chidi Okafor", position: "Striker", age: 18, club: "Enugu Rangers Academy", rating: 4.8, status: "Highly scouted", metrics: { pace: "92", shooting: "88", stamina: "81" } },
    { id: 2, name: "Tunde Bakare", position: "Goalkeeper", age: 20, club: "Kano Pillars Jrs", rating: 4.5, status: "Trial active", metrics: { reflexes: "89", diving: "84", handling: "78" } },
    { id: 3, name: "Ojoele Abdullah", position: "Midfielder", age: 19, club: "Lagos Football Academy", rating: 4.9, status: "Top Prospect", metrics: { passing: "94", vision: "91", control: "89" } },
  ];

  const activeScouts = [
    { id: 1, name: "Alexandre Dupont", club: "Olympique Lyonnais (FR)", isPremium: true, email: "a.dupont@ol.fr" },
    { id: 2, name: "David Cole", club: "Chelsea FC Scout (UK)", isPremium: true, email: "d.cole@chelseafc.com" },
    { id: 3, name: "Musa Ibrahim", club: "Independent Agent (NG)", isPremium: false, email: "musa10@gmail.com" }
  ];

  // 📝 Chat drawer state controls
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState({ name: '', club: '' });

  const triggerChatOpen = (name, club) => {
    setSelectedPlayer({ name, club });
    setChatOpen(true);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in text-slate-100">
      {/* 📡 TRUST STATUS BAR */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">🔍 Scout Talent Radar</h1>
            <p className="text-sm text-slate-400 mt-1">Review live performance analytics and verification levels of prospects.</p>
          </div>
          <span className="text-xs font-semibold bg-slate-800 text-slate-300 px-3 py-2 rounded-xl border border-slate-700 max-w-fit">Total: {talentPool.length} Profiles</span>
        </div>
        
        <div className="lg:col-span-1 bg-gradient-to-r from-amber-950/40 to-slate-900 border border-amber-500/20 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">Lunara Trust Level</div>
            <div className="text-lg font-black text-white mt-0.5">100% Secured</div>
          </div>
          <span className="text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-xl">Doc Checks Live</span>
        </div>
      </div>

      {/* TWO PANEL CONTENT VIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* TALENT LIST VIEW */}
        <div className="lg:col-span-3 space-y-4">
          <h2 className="text-lg font-bold tracking-tight text-slate-300">Monitored Grassroot Athletes</h2>
          {talentPool.map((talent) => (
            <div key={talent.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-orange-500 text-white font-black text-lg flex items-center justify-center shadow-sm">
                  {talent.name.substring(0,2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-slate-200 text-lg group-hover:text-orange-400 transition-colors">{talent.name}</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider bg-slate-800 border border-slate-700 text-slate-300">{talent.status}</span>
                  </div>
                  <p className="text-sm text-slate-400 font-medium">{talent.position} • <span className="text-slate-500">{talent.age} yrs old</span></p>
                  <p className="text-xs text-slate-500 mt-1">🏟️ {talent.club}</p>
                </div>
              </div>

              {/* Metrics */}
              <div className="flex flex-wrap gap-3 items-center w-full lg:w-auto">
                {Object.entries(talent.metrics).map(([key, value]) => (
                  <div key={key} className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-center min-w-[85px] flex-1 lg:flex-none">
                    <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">{key}</div>
                    <div className="text-base font-extrabold text-slate-300 mt-0.5">{value}</div>
                  </div>
                ))}
              </div>

              {/* Rating & Dynamic CTA Action Chat Trigger */}
              <div className="flex items-center justify-between lg:justify-end w-full lg:w-auto border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-800 gap-4">
                <div className="text-right">
                  <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Scout Rating</div>
                  <div className="text-lg font-black text-amber-500 mt-0.5">⭐ <span className="text-slate-200">{talent.rating}</span></div>
                </div>
                <button 
                  onClick={() => triggerChatOpen(talent.name, talent.club)}
                  className="bg-gradient-to-r from-pink-600 to-orange-500 text-white font-bold text-xs px-4 py-3 rounded-xl transition-all shadow-sm active:scale-95"
                >
                  Open Chat
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* SIDE PANELS FOR ACOUTS */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-lg font-bold tracking-tight text-slate-300">Active Network Scouts</h2>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 shadow-sm">
            {activeScouts.map((scout) => (
              <div key={scout.id} className="p-3 bg-slate-950 border border-slate-800/60 rounded-xl flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-200">{scout.name}</span>
                    {scout.isPremium && <span className="text-[10px] bg-amber-500/10 text-amber-400 px-1 py-0.5 rounded border border-amber-500/20 font-bold">🏅 GOLD</span>}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{scout.club}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🚀 CHAT SLIDING COMPONENT SYSTEM ATTACHMENT */}
      <ChatDrawer 
        isOpen={chatOpen} 
        onClose={() => setChatOpen(false)} 
        playerName={selectedPlayer.name} 
        clubName={selectedPlayer.club} 
      />

    </div>
  );
}

export default ScoutDashboard;
