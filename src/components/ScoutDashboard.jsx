import React, { useState } from 'react';

function ScoutDashboard({ talentPool, userRole }) {
  const [filterPosition, setFilterPosition] = useState('All');
  const [filterAge, setFilterAge] = useState('All');

  const filteredTalent = talentPool.filter(item => {
    const matchPos = filterPosition === 'All' || item.position === filterPosition;
    const matchAge = filterAge === 'All' || item.ageBand === filterAge;
    return matchPos && matchAge;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 text-slate-100 font-sans">
      
      {/* FILTER DATA WORKSPACE CONSOLE */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
        <div>
          <h1 className="text-lg font-bold text-white font-mono uppercase tracking-wider">Discovery Query Hub</h1>
          <p className="text-xs text-slate-400 mt-0.5">Filter validated regional datasets. Profiles display structural verification origins as demanded by PRD Section 6.6.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-1">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Target Position</label>
            <select value={filterPosition} onChange={(e) => setFilterPosition(e.target.value)} className="w-full bg-slate-950 border border-slate-800 px-3 py-2 rounded text-xs text-slate-300 focus:outline-none focus:border-sky-500">
              <option value="All">All Positions</option>
              <option value="Striker">Striker</option>
              <option value="Winger">Winger</option>
              <option value="Midfielder">Midfielder</option>
              <option value="Defender">Defender</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Age Classification</label>
            <select value={filterAge} onChange={(e) => setFilterAge(e.target.value)} className="w-full bg-slate-950 border border-slate-800 px-3 py-2 rounded text-xs text-slate-300 focus:outline-none focus:border-sky-500">
              <option value="All">All Divisions</option>
              <option value="U-16">U-16 Band</option>
              <option value="U-18">U-18 Band</option>
              <option value="U-20">U-20 Band</option>
            </select>
          </div>
        </div>
      </div>

      {/* HIGH-DENSITY PROFILE LEDGER GRID */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Registry Matches ({filteredTalent.length})</h3>
        
        {filteredTalent.map(talent => (
          <div key={talent.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs">
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white font-mono tracking-tight uppercase">{talent.name}</h4>
              <p className="text-slate-400 font-medium">{talent.position} • {talent.ageBand} • {talent.location}</p>
              <p className="text-[10px] text-slate-500 font-mono">Affiliation: {talent.club || 'Independent Athlete'}</p>
            </div>

            {/* Metrics Breakdown Matrix */}
            <div className="flex gap-4 bg-slate-950 px-4 py-2 rounded border border-slate-800 w-full md:w-auto">
              <div className="text-center min-w-[50px]">
                <div className="text-[9px] font-bold uppercase text-slate-500">Goals</div>
                <div className="text-sm font-black text-slate-200 mt-0.5">{talent.goals}</div>
              </div>
              <div className="text-center min-w-[50px]">
                <div className="text-[9px] font-bold uppercase text-slate-500">Assists</div>
                <div className="text-sm font-black text-slate-200 mt-0.5">{talent.assists}</div>
              </div>
              <div className="text-center min-w-[100px] border-l border-slate-800 pl-3">
                <div className="text-[9px] font-bold uppercase text-slate-500">Verification Source</div>
                <span className={`text-[9px] block font-mono font-bold uppercase mt-1 px-1.5 py-0.2 rounded border text-center
                  ${talent.verifiedByCoach 
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                    : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                  {talent.verifiedByCoach ? '✓ Coach Verified' : '⚠ Self Reported'}
                </span>
              </div>
            </div>

            {/* Secure Contact Interceptor Rule (PRD FR-07 Shield) */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-slate-800">
              <a href={talent.videoUrl} target="_blank" rel="noreferrer" className="bg-slate-950 border border-slate-800 hover:border-sky-500 text-slate-300 px-3 py-2 rounded text-center font-mono">
                External Video ↗
              </a>
              {userRole === 'scout' ? (
                <button className="bg-sky-600 hover:bg-sky-500 text-white font-bold px-4 py-2 rounded uppercase tracking-wider shadow">
                  Request Contact
                </button>
              ) : (
                <span className="text-[10px] text-slate-500 font-medium italic">Discovery Context Shield Active</span>
              )}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default ScoutDashboard;
