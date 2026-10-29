import React, { useState } from 'react';

function RegisterProfile({ setPlayer, setIsProfileActivated, setActiveScreen, userEmail }) {
  const [formData, setFormData] = useState({
    name: '', position: 'Midfielder', preferredFoot: 'Right', ageBand: 'U-18', location: 'Lagos State', club: '', bio: '', videoUrl: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.club || !formData.bio || !formData.videoUrl) {
      return alert("Please fill out all registration fields.");
    }

    const profileData = {
      name: formData.name,
      position: formData.position,
      preferredFoot: formData.preferredFoot,
      ageBand: formData.ageBand,
      location: formData.location,
      club: formData.club,
      bio: formData.bio,
      videoUrl: formData.videoUrl,
      metrics: {
        goals: { count: 0, confirmedByCoach: false },
        assists: { count: 0, confirmedByCoach: false }
      }
    };

    // SAVE TO BROWSER MEMORY (Simulating Backend Storage)
    localStorage.setItem(`lunara_profile_${userEmail.toLowerCase()}`, JSON.stringify(profileData));

    setPlayer(profileData);
    setIsProfileActivated(true);
    alert("🔥 Profile Created and Saved to Browser Memory! Try logging out and back in later to test.");
    setActiveScreen('profile');
  };

  return (
    <div className="max-w-xl mx-auto bg-slate-900 border border-slate-800 p-8 rounded-xl shadow-xl mt-4 text-slate-100 font-sans animate-fade-in">
      <div className="text-center mb-6 space-y-1">
        <h1 className="text-xl font-bold tracking-tight text-white font-mono uppercase">Setup Athlete Profile Registry</h1>
        <p className="text-xs text-slate-400">Account: <span className="text-sky-400 font-mono">{userEmail}</span></p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Full Name</label>
          <input type="text" placeholder="e.g., Kelechi Nwakali" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-sky-500" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Position</label>
            <select value={formData.position} onChange={(e) => setFormData({...formData, position: e.target.value})} className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-800 text-slate-300 focus:outline-none">
              <option value="Striker">Striker</option>
              <option value="Winger">Winger</option>
              <option value="Midfielder">Midfielder</option>
              <option value="Defender">Defender</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Preferred Foot</label>
            <select value={formData.preferredFoot} onChange={(e) => setFormData({...formData, preferredFoot: e.target.value})} className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-800 text-slate-300 focus:outline-none">
              <option value="Right">Right Foot</option>
              <option value="Left">Left Foot</option>
              <option value="Ambidextrous">Both</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Age Band</label>
            <select value={formData.ageBand} onChange={(e) => setFormData({...formData, ageBand: e.target.value})} className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-800 text-slate-300 focus:outline-none">
              <option value="U-16">Under-16</option>
              <option value="U-18">Under-18</option>
              <option value="U-20">Under-20</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">State Location (Nigeria)</label>
            <select value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-800 text-slate-300 focus:outline-none">
              <option value="Abia State">Abia State</option>
              <option value="Adamawa State">Adamawa State</option>
              <option value="Akwa Ibom State">Akwa Ibom State</option>
              <option value="Abuja FCT">Abuja FCT</option>
              <option value="Anambra State">Anambra State</option>
              <option value="Bauchi State">Bauchi State</option>
              <option value="Bayelsa State">Bayelsa State</option>
              <option value="Benue State">Benue State</option>
              <option value="Borno State">Borno State</option>
              <option value="Cross River State">Cross River State</option>
              <option value="Delta State">Delta State</option>
              <option value="Ebonyi State">Ebonyi State</option>
              <option value="Edo State">Edo State</option>
              <option value="Ekiti State">Ekiti State</option>
              <option value="Enugu State">Enugu State</option>
              <option value="Gombe State">Gombe State</option>
              <option value="Imo State">Imo State</option>
              <option value="Jigawa State">Jigawa State</option>
              <option value="Kaduna State">Kaduna State</option>
              <option value="Kano State">Kano State</option>
              <option value="Katsina State">Katsina State</option>
              <option value="Kebbi State">Kebbi State</option>
              <option value="Kogi State">Kogi State</option>
              <option value="Kwara State">Kwara State</option>
              <option value="Lagos State">Lagos State</option>
              <option value="Nasarawa State">Nasarawa State</option>
              <option value="Niger State">Niger State</option>
              <option value="Ogun State">Ogun State</option>
              <option value="Ondo State">Ondo State</option>
              <option value="Osun State">Osun State</option>
              <option value="Oyo State">Oyo State</option>
              <option value="Plateau State">Plateau State</option>
              <option value="Rivers State">Rivers State</option>
              <option value="Sokoto State">Sokoto State</option>
              <option value="Taraba State">Taraba State</option>
              <option value="Yobe State">Yobe State</option>
              <option value="Zamfara State">Zamfara State</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Academy / Club</label>
            <input type="text" placeholder="e.g., Lagos Football Academy" value={formData.club} onChange={(e) => setFormData({...formData, club: e.target.value})} className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-800 text-white focus:outline-none" />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Showreel Video Link (YouTube)</label>
          <input type="text" placeholder="https://youtube.com..." value={formData.videoUrl} onChange={(e) => setFormData({...formData, videoUrl: e.target.value})} className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-800 text-white font-mono text-[11px] focus:outline-none" />
        </div>

        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Football Biography & Achievements</label>
          <textarea rows="3" placeholder="Describe your playing style..." value={formData.bio} onChange={(e) => setFormData({...formData, bio: e.target.value})} className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-800 text-white focus:outline-none" />
        </div>

        <button type="submit" className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-2.5 rounded text-xs uppercase tracking-wider shadow">
          Activate Profile Registry Node
        </button>
      </form>
    </div>
  );
}

export default RegisterProfile;
