import React, { useState } from 'react';

function ScoutDashboard({ playerProfile }) {
  // Master metrics state pool matching PRD specifications
  const initialTalent = [
    { id: 1, name: "Chidi Okafor", position: "Striker", ageBand: "U-18", location: "Enugu State", club: "Enugu Rangers Academy", videoUrl: "https://youtube.com", goals: 14, assists: 3, verifiedByCoach: true },
    { id: 2, name: "Tunde Bakare", position: "Goalkeeper", ageBand: "U-20", location: "Kano State", club: "Kano Pillars Jrs", videoUrl: "https://youtube.com", goals: 0, assists: 0, verifiedByCoach: true },
    { id: 3, name: playerProfile.name, position: playerProfile.position, ageBand: playerProfile.ageBand, location: playerProfile.location, club: playerProfile.club, videoUrl: playerProfile.videoUrl, goals: playerProfile.metrics.goals.count, assists: playerProfile.metrics.assists.count, verifiedByCoach: playerProfile.metrics.goals.confirmedByCoach }
  ];

  // Search filter query hooks required by FR-05
  const [filterPosition, setFilterPosition] = useState('All');
  const [filterAge, setFilterAge] = useState('All');

  const filteredTalent = initialTalent.filter(item => {
    if (!item.name) return false; // Skips default empty states before registration
    const matchPos = filterPosition === 'All' || item.position === filterPosition;
    const matchAge = filterAge === 'All' || item.ageBand === filterAge;
    return matchPos && matchAge;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 text-slate-100 font-sans">
      
      {/* 📡 FILTER INTERFACE CONSOLE */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white font-mono">DISCOVERY CONSOLE</h1>
          <p className="text-xs text-slate-400 mt-0.5">Filter the verified regional data repository to evaluate candidate tracking records.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Target Position</label>
            <select value={filterPosition} onChange={(e) => setFilterPosition(e.target.value)} className="w-full bg-slate-950 border border-slate-800 px-3 py-1.5 rounded text-xs text-slate-300 focus:outline-none focus:border-sky-500">
              <option value="All">All Positions</option>
              <option value="Striker">Striker</option>
              <option value="Midfielder">Midfielder</option>
              <option value="Goalkeeper">Goalkeeper</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Age Categorization</label>
            <select value={filterAge} onChange={(e) => setFilterAge(e.target.value)} className="w-full bg-slate-950 border border-slate-800 px-3 py-1.5 rounded text-xs text-slate-300 focus:outline-none focus:border-sky-500">
              <option value="All">All Divisions</option>
              <option value="U-16">U-16</option>
              <option value="U-18">U-18</option>
              <option value="U-20">U-20</option>
            </select>
          </div>
        </div>
      </div>

      {/* 📋 HIGH-DENSITY PROFILE REGISTRY MATRIX */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Query Matches ({filteredTalent.length})</h3>
        
        {filteredTalent.map(talent => (
          <div key={talent.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs">
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white tracking-tight">{talent.name}</h4>
              <p className="text-slate-400 font-medium">{talent.position} • {talent.ageBand} • {talent.location}</p>
              <p className="text-slate-500 font-mono text-[11px]">Roster: {talent.club || 'Unaffiliated'}</p>
            </div>

            {/* Metrics Breakdown with PRD Data Origin Markers */}
            <div className="flex gap-4 bg-slate-950 px-4 py-2 rounded-lg border border-slate-800/60 w-full md:w-auto">
              <div className="text-center min-w-[50px]">
                <div className="text-[9px] font-bold uppercase text-slate-500">Goals</div>
                <div className="text-sm font-black text-slate-200 mt-0.5">{talent.goals}</div>
              </div>
              <div className="text-center min-w-[50px]">
                <div className="text-[9px] font-bold uppercase text-slate-500">Assists</div>
                <div className="text-sm font-black text-slate-200 mt-0.5">{talent.assists}</div>
              </div>
              <div className="text-center min-w-[90px] border-l border-slate-800 pl-3">
                <div className="text-[9px] font-bold uppercase text-slate-500">Record Data Status</div>
                <span className={`text-[9px] block font-mono font-bold uppercase mt-1 px-1.5 py-0.2 rounded text-center border
                  ${talent.verifiedByCoach 
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                    : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                  {talent.verifiedByCoach ? '✓ Coach Confirmed' : '⚠ Self Reported'}
                </span>
              </div>
            </div>

            {/* External Footage Links Integration */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-slate-800">
              <a 
                href={talent.videoUrl} target="_blank" rel="noreferrer"
                className="bg-slate-950 border border-slate-800 hover:border-sky-500 text-slate-300 px-3 py-2 rounded transition-colors text-center font-mono"
              >
                External Footage ↗
              </a>
              <button className="bg-sky-600 hover:bg-sky-500 text-white font-bold px-4 py-2 rounded uppercase tracking-wider transition-colors shadow">
                File Report
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default ScoutDashboard;
