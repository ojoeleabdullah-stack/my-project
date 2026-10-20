import React, { useState } from 'react';

function TeamManagement({ roster, setRoster }) {
  const [inviteName, setInviteName] = useState('');
  const [invitePosition, setInvitePosition] = useState('Striker');
  const [inviteAge, setInviteAge] = useState('U-18');

  const handleInvitePlayer = (e) => {
    e.preventDefault();
    if (!inviteName.trim()) return;

    const newRosterEntry = {
      id: Date.now(),
      name: inviteName,
      position: invitePosition,
      ageBand: inviteAge,
      status: "Pending Approval"
    };

    setRoster([...roster, newRosterEntry]);
    setInviteName('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-slate-100">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-sm">
        <h1 className="text-2xl font-black tracking-tight">📋 Academy Roster Hub</h1>
        <p className="text-xs text-slate-400 mt-1">Manage team registrations and authorize official performance evaluations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-3">
          <h3 className="text-sm font-bold text-slate-400">Active Roster Listing</h3>
          {roster.map(player => (
            <div key={player.id} className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex justify-between items-center">
              <div>
                <h4 className="font-bold text-sm text-slate-200">{player.name}</h4>
                <p className="text-xs text-slate-500">{player.position} • Age Band: {player.ageBand}</p>
              </div>
              <span className={`text-[10px] px-2 py-0.5 font-bold rounded border ${player.status === 'Verified' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                {player.status}
              </span>
            </div>
          ))}
        </div>

        <div className="md:col-span-1">
          <form onSubmit={handleInvitePlayer} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
            <h3 className="font-bold text-sm text-slate-300">Invite Roster Athlete</h3>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 mb-1">Athlete Name</label>
              <input type="text" value={inviteName} onChange={(e) => setInviteName(e.target.value)} placeholder="Enter full name" className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 mb-1">Position</label>
                <select value={invitePosition} onChange={(e) => setInvitePosition(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                  <option value="Striker">Striker</option>
                  <option value="Midfielder">Midfielder</option>
                  <option value="Defender">Defender</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 mb-1">Age Band</label>
                <select value={inviteAge} onChange={(e) => setInviteAge(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                  <option value="U-16">U-16</option>
                  <option value="U-18">U-18</option>
                  <option value="U-20">U-20</option>
                </select>
              </div>
            </div>
            <button type="submit" className="w-full bg-sky-600 hover:bg-sky-700 font-bold py-2 rounded-xl text-xs text-white">Send Roster Invitation</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TeamManagement;
