import React, { useState } from 'react';

function RegisterProfile({ setPlayer, setActiveScreen }) {
  const [formData, setFormData] = useState({
    name: '', position: 'Midfielder', age: '', club: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.age || !formData.club) {
      return alert("Please fill out all registration spaces!");
    }

    setPlayer({
      name: formData.name,
      position: formData.position,
      age: parseInt(formData.age),
      club: formData.club,
      goals: 0, assists: 0, minutesPlayed: 0
    });

    alert("Profile Created Successfully! Heading to your dashboard.");
    setActiveScreen('profile');
  };

  return (
    <div className="max-w-md mx-auto bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl mt-10 animate-fade-in text-white">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-black tracking-tight">⚽ Player Registration</h1>
        <p className="text-xs text-slate-400 mt-1">Create your athlete profile to get discovered by international football scouts.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Full Name</label>
          <input 
            type="text" 
            placeholder="e.g., Kelechi Nwakali"
            value={formData.name} 
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-pink-500/40" 
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Age</label>
            <input 
              type="number" 
              placeholder="e.g., 18"
              value={formData.age} 
              onChange={(e) => setFormData({...formData, age: e.target.value})}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-pink-500/40" 
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Preferred Position</label>
            <select 
              value={formData.position} 
              onChange={(e) => setFormData({...formData, position: e.target.value})}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-pink-500/40"
            >
              <option value="Striker">Striker (CF)</option>
              <option value="Winger">Winger (LW/RW)</option>
              <option value="Midfielder">Midfielder (CM/AM)</option>
              <option value="Defender">Defender (CB/LB/RB)</option>
              <option value="Goalkeeper">Goalkeeper (GK)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Current Club / Academy</label>
          <input 
            type="text" 
            placeholder="e.g., Pepsi Football Academy"
            value={formData.club} 
            onChange={(e) => setFormData({...formData, club: e.target.value})}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-pink-500/40" 
          />
        </div>

        <button type="submit" className="w-full mt-2 bg-gradient-to-r from-pink-600 to-orange-500 hover:from-pink-700 hover:to-orange-600 font-bold py-3 rounded-xl transition-all shadow-lg active:scale-95 text-sm text-white">
          Activate Athlete Profile
        </button>
      </form>
    </div>
  );
}

export default RegisterProfile;
