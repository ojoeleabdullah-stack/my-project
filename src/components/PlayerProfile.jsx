import React from 'react';

function PlayerProfile({ player }) {
  return (
    <div className="max-w-4xl mx-auto space-y-6 text-slate-100 font-sans animate-fade-in">
      
      {/* 💳 CORPORATE METADATA PLAYER CARD */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <span className="bg-slate-950 text-sky-400 border border-slate-800 px-2.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider">
              Pos: {player.position || 'Not Selected'}
            </span>
            <span className="bg-slate-950 text-slate-300 border border-slate-800 px-2.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider">
              Division: {player.ageBand || 'Not Selected'}
            </span>
            <span className="bg-slate-950 text-slate-300 border border-slate-800 px-2.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider">
              Foot: {player.preferredFoot || 'Not Selected'}
            </span>
          </div>
          
          <h1 className="text-2xl font-black tracking-tight text-white font-mono uppercase">{player.name || 'Anonymous Athlete'}</h1>
          <p className="text-xs text-slate-400 font-medium">🏟️ Reg Club: {player.club || 'Unattached / Free Agent'} | 📍 {player.location || 'Unknown location'}</p>
          <p className="text-xs text-slate-300 max-w-xl leading-relaxed italic border-l-2 border-slate-700 pl-3 bg-slate-950/40 py-2 rounded-r">
            "{player.bio || 'No football biography documented yet.'}"
          </p>
        </div>

        {/* 📊 CORE STATISTICAL LEDGER (PRD SECTION 6.4 METRIC SEGREGATION) */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 min-w-[200px] divide-y divide-slate-800">
          <div className="pb-2 flex justify-between items-center text-xs">
            <span className="text-slate-400 font-bold uppercase tracking-wider">Metrics Log</span>
            <span className="text-[10px] text-slate-500 font-mono">MVP v1.0</span>
          </div>
          <div className="py-2 flex justify-between items-center text-xs">
            <span className="text-slate-400">Goals (Season):</span>
            <span className="font-mono text-sm font-bold text-white">{player.metrics.goals.count}</span>
          </div>
          <div className="pt-2 flex justify-between items-center text-xs">
            <span className="text-slate-400">Assists (Season):</span>
            <span className="font-mono text-sm font-bold text-white">{player.metrics.assists.count}</span>
          </div>
        </div>
      </div>

      {/* 📹 EVIDENCE & FOOTAGE LINKS VALIDATION (PRD SECTION 6.3) */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white font-mono">Validated Video Evidence Links</h3>
          <p className="text-xs text-slate-400 mt-0.5">As per cost-optimization guidelines for the initial release, footage is hosted via external secure links.</p>
        </div>

        {player.videoUrl ? (
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg flex flex-col sm:flex-row justify-between sm:items-center gap-4 text-xs font-mono">
            <div className="space-y-1">
              <span className="text-[10px] bg-sky-950 text-sky-400 border border-sky-900 px-1.5 py-0.2 rounded font-bold uppercase">Primary Showreel Link</span>
              <p className="text-slate-300 break-all pt-1">{player.videoUrl}</p>
            </div>
            <a 
              href={player.videoUrl} target="_blank" rel="noreferrer"
              className="bg-slate-900 border border-slate-700 hover:border-sky-500 text-white px-4 py-2 rounded text-center transition-colors uppercase tracking-wider text-[11px] font-bold"
            >
              Verify Video Source ↗
            </a>
          </div>
        ) : (
          <div className="text-center py-6 border border-dashed border-slate-800 rounded-lg text-xs text-slate-500">
            No dynamic match shrowreel links populated. Go to metric configuration settings to link data files.
          </div>
        )}
      </div>

    </div>
  );
}

export default PlayerProfile;
