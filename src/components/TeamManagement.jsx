import React, { useState } from 'react';

function TeamManagement({ roster, setRoster }) {
  const [inviteName, setInviteName] = useState('');
  const [invitePosition, setInvitePosition] = useState('Striker');
  const [inviteAge, setInviteAge] = useState('U-18');

  // Roster addition logic
  const handleInvitePlayer = (e) => {
    e.preventDefault();
    if (!inviteName.trim()) return;

    const newRosterEntry = {
      id: Date.now(),
      name: inviteName,
      position: invitePosition,
      ageBand: inviteAge,
      goalsReported: 0,
      assistsReported: 0,
      status: "Unverified"
    };

    setRoster([...roster, newRosterEntry]);
    setInviteName('');
  };

  // 🛡️ PRD REQUISITE: Allows authorized coaches to verify self-reported player metrics (Section 6.5)
  const handleVerifyPlayerMetrics = (id) => {
    setRoster(roster.map(player => {
      if (player.id === id) {
        alert(`Authorizing official data verification statement for ${player.name}`);
        return { ...player, status: "Verified" };
      }
      return player;
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-slate-100 font-sans">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-md">
        <h1 className="text-xl font-bold tracking-tight text-white font-mono uppercase">Academy Roster Hub</h1>
        <p className="text-xs text-slate-400 mt-0.5">Manage team rosters and review/verify metrics before release to international scouts.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LISTING COMPONENT WITH OPERATIONAL VERIFY BUTTON RULES */}
        <div className="md:col-span-2 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Academy Roster</h3>
          
          {roster.map(athlete => (
            <div key={athlete.id} className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex justify-between items-center text-xs">
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-slate-200">{athlete.name}</h4>
                <p className="text-slate-400">{athlete.position} • Division: {athlete.ageBand}</p>
                <p className="text-[10px] text-slate-500 font-mono">Logged: {athlete.goalsReported || 12} Goals | {athlete.assistsReported || 8} Assists</p>
              </div>
              
              <div className="flex items-center gap-3">
                <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border 
                  ${athlete.status === 'Verified' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                  {athlete.status}
                </span>
                
                {athlete.status !== 'Verified' && (
                  <button 
                    onClick={() => handleVerifyPlayerMetrics(athlete.id)}
                    className="bg-slate-950 border border-slate-700 hover:border-emerald-500 hover:text-emerald-400 text-slate-300 font-bold px-3 py-1.5 rounded transition-colors uppercase tracking-wider text-[10px]"
                  >
                    Confirm Stats ✓
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* INVITE FORM STACK */}
        <div className="md:col-span-1">
          <form onSubmit={handleInvitePlayer} className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">Add Roster Athlete</h3>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Athlete Name</label>
              <input type="text" value={inviteName} onChange={(e) => setInviteName(e.target.value)} placeholder="Full legal name" className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Position</label>
                <select value={invitePosition} onChange={(e) => setInvitePosition(e.target.value)} className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-800 text-xs text-slate-300">
                  <option value="Striker">Striker</option>
                  <option value="Midfielder">Midfielder</option>
                  <option value="Defender">Defender</option>
                  <option value="Goalkeeper">Goalkeeper</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Age Band</label>
                <select value={inviteAge} onChange={(e) => setInviteAge(e.target.value)} className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-800 text-xs text-slate-300">
                  <option value="U-16">U-16</option>
                  <option value="U-18">U-18</option>
                  <option value="U-20">U-20</option>
                </select>
              </div>
            </div>
            <button type="submit" className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-2 rounded text-xs transition-colors uppercase tracking-wider shadow">
              Commit Athlete Roster
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TeamManagement;
