import React, { useState } from 'react';

function PlayerProfile({ player }) {
  // Storing training videos
  const [videos, setVideos] = useState([
    { id: 1, title: "Morning Cone Drills & Agility", url: "https://w3schools.com" },
    { id: 2, title: "Free Kick Practice (Top Corner)", url: "https://w3schools.com" }
  ]);
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const handleAddVideo = (e) => {
    e.preventDefault();
    if (!newTitle || !newUrl) return alert("Please fill out both fields!");
    setVideos([{ id: Date.now(), title: newTitle, url: newUrl }, ...videos]);
    setNewTitle("");
    setNewUrl("");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      {/* 💳 PREMIUM PLAYER CARD HEADER */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-2xl p-6 md:p-8 shadow-xl border border-slate-800 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              {player.position || 'Midfielder'}
            </span>
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              Age {player.age || '19'}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            {player.name}
          </h1>
          <p className="text-slate-400 mt-2 font-medium flex items-center gap-2">
            🏟️ {player.club || 'Lagos Football Academy'}
          </p>
        </div>

        {/* Quick Season Highlight Metric */}
        <div className="bg-slate-800/50 border border-slate-700/60 rounded-xl p-4 flex items-center gap-4 min-w-[160px]">
          <div className="text-3xl">⚽</div>
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Season Goals</div>
            <div className="text-2xl font-black text-sky-400">{player.goals || '12'}</div>
          </div>
        </div>
      </div>

      {/* 📹 VIDEOS & VAULT INTERFACE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Form to Upload */}
        <div className="lg:col-span-1">
          <form onSubmit={handleAddVideo} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-4">
            <h3 className="text-lg font-bold text-slate-800 tracking-tight">Upload Drill Clip</h3>
            <p className="text-xs text-slate-400 -mt-2">Provide a short title and sample media link URL to display.</p>
            
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Session Title</label>
                <input 
                  type="text" 
                  placeholder="e.g., Tactical Passing Exercise" 
                  value={newTitle} 
                  onChange={(e) => setNewTitle(e.target.value)} 
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all" 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Media MP4 URL</label>
                <input 
                  type="text" 
                  placeholder="Paste direct file URL link" 
                  value={newUrl} 
                  onChange={(e) => setNewUrl(e.target.value)} 
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-mono text-xs" 
                />
              </div>
            </div>

            <button type="submit" className="w-full mt-2 bg-sky-600 hover:bg-sky-700 active:scale-[0.98] text-white py-3 rounded-xl font-semibold text-sm transition-all shadow-md shadow-sky-600/10">
              Publish Video to Vault
            </button>
          </form>
        </div>

        {/* Right Column: Grid of Active Videos */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            📹 Active Training Clips <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded-md text-xs font-bold">{videos.length}</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {videos.map(video => (
              <div key={video.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 group hover:shadow-md transition-all">
                <div className="relative aspect-video bg-black overflow-hidden">
                  <video src={video.url} controls className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-slate-800 text-sm leading-snug group-hover:text-sky-600 transition-colors">
                    {video.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerProfile;
