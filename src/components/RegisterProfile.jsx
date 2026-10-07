import React, { useState } from 'react';

function RegisterProfile({ setPlayer, setIsProfileActivated, setActiveScreen }) {
  const [formData, setFormData] = useState({
    name: '', position: 'Midfielder', age: '', club: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.age || !formData.club) {
      return alert("Please fill out all registration fields!");
    }

    setPlayer({
      name: formData.name,
      position: formData.position,
      age: parseInt(formData.age),
      club: formData.club,
      goals: 0,
      assists: 0,
      minutesPlayed: 0
    });

    // 🚀 CRITICAL TRIGGERS: Tells the app that the player is ready and redirects them straight to the new Profile screen!
    setIsProfileActivated(true);
    alert("🔥 Athlete Profile Activated Successfully!");
    setActiveScreen('profile');
  };

  return (
    <div className="max-w-md mx-auto bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl mt-6 text-white animate-fade-in">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-black tracking-tight">📋 Setup Athlete Card</h1>
        <p className="text-xs text-slate-400 mt-1">Complete your registry workspace to populate the scouting databases.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Full Name</label>
          <input type="text" placeholder="e.g., Kelechi Nwakali" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-pink-500/40" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Age</label>
            <input type="number" placeholder="18" value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-pink-500/40" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Position</label>
            <select value={formData.position} onChange={(e) => setFormData({...formData, position: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-pink-500/40">
              <option value="Striker">Striker</option>
              <option value="Winger">Winger</option>
              <option value="Midfielder">Midfielder</option>
              <option value="Defender">Defender</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Academy / Club</label>
          <input type="text" placeholder="e.g., Lagos Football Academy" value={formData.club} onChange={(e) => setFormData({...formData, club: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-pink-500/40" />
        </div>
        <button type="submit" className="w-full mt-2 bg-gradient-to-r from-pink-600 to-orange-500 font-bold py-3 rounded-xl shadow-lg active:scale-95 text-sm">Activate Profile</button>
      </form>
    </div>
  );
}

export default RegisterProfile;
