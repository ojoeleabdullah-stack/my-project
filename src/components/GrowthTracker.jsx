import React, { useState } from 'react';

function GrowthTracker({ player, setPlayer }) {
  // Local form states to capture input values
  const [metricType, setMetricType] = useState('goals');
  const [metricValue, setMetricValue] = useState('');

  // Handle form submission
  const handleLogMetrics = (e) => {
    e.preventDefault();
    
    const parsedValue = parseInt(metricValue);
    if (isNaN(parsedValue) || parsedValue <= 0) {
      return alert("Please enter a valid positive number!");
    }

    // Update the player stats based on what was selected in the dropdown
    if (metricType === 'goals') {
      setPlayer({ ...player, goals: player.goals + parsedValue });
    } else if (metricType === 'assists') {
      setPlayer({ ...player, assists: player.assists + parsedValue });
    } else if (metricType === 'minutes') {
      setPlayer({ ...player, minutesPlayed: player.minutesPlayed + parsedValue });
    }

    // Clear input field after tracking successfully updates
    setMetricValue('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* HEADER TITLE */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">📈 Growth & Performance Tracker</h1>
        <p className="text-sm text-slate-400 mt-1">Log updates from recent training matches to elevate your metric scores instantly.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* STATS ANALYTICS DISPLAY PANEL (Left 2 columns) */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Card 1: Goals */}
          <div className="bg-white p-5 border border-slate-100 rounded-2xl shadow-sm text-center">
            <span className="text-2xl">⚽</span>
            <div className="text-xs uppercase tracking-widest text-slate-400 font-bold mt-2">Total Goals</div>
            <div className="text-3xl font-black text-slate-800 mt-1">{player.goals}</div>
          </div>

          {/* Card 2: Assists */}
          <div className="bg-white p-5 border border-slate-100 rounded-2xl shadow-sm text-center">
            <span className="text-2xl">👟</span>
            <div className="text-xs uppercase tracking-widest text-slate-400 font-bold mt-2">Total Assists</div>
            <div className="text-3xl font-black text-slate-800 mt-1">{player.assists || 8}</div>
          </div>

          {/* Card 3: Play Time */}
          <div className="bg-white p-5 border border-slate-100 rounded-2xl shadow-sm text-center">
            <span className="text-2xl">⏱️</span>
            <div className="text-xs uppercase tracking-widest text-slate-400 font-bold mt-2">Minutes Played</div>
            <div className="text-3xl font-black text-slate-800 mt-1">{player.minutesPlayed || 450} mins</div>
          </div>
        </div>

        {/* INTERACTIVE TRACKING INTERFACE FORM (Right 1 column) */}
        <div className="md:col-span-1">
          <form onSubmit={handleLogMetrics} className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm space-y-4">
            <h3 className="font-bold text-slate-800 text-base">Log Match Activity</h3>
            
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Select Metric</label>
              <select 
                value={metricType} 
                onChange={(e) => setMetricType(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              >
                <option value="goals">⚽ Goals Scored</option>
                <option value="assists">👟 Assists Made</option>
                <option value="minutes">⏱️ Minutes Played</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Count / Amount</label>
              <input 
                type="number" 
                placeholder="e.g., 2" 
                value={metricValue}
                onChange={(e) => setMetricValue(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
            </div>

            <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-all">
              Update Performance Stats
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default GrowthTracker;
