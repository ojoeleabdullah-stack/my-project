import React, { useState } from 'react';

function GrowthTracker({ player, setPlayer, userEmail }) {
  const [metricType, setMetricType] = useState('goals');
  const [metricValue, setMetricValue] = useState('');
  
  // Track continuous records stream to prevent unverified entries confusion
  const [historyLogs, setHistoryLogs] = useState([
    { id: 1, type: "Goals", amount: 12, date: "2026-10-15", status: "Coach Confirmed" },
    { id: 2, type: "Assists", amount: 8, date: "2026-10-18", status: "Self Reported" }
  ]);

    const handleLogSubmit = (e) => {
    e.preventDefault();
    const count = parseInt(metricValue);
    if (isNaN(count) || count <= 0) return alert("Enter a valid integer quantity.");

    let updatedMetrics;
    if (metricType === 'goals') {
      updatedMetrics = { ...player.metrics, goals: { count: player.metrics.goals.count + count, confirmedByCoach: false } };
    } else {
      updatedMetrics = { ...player.metrics, assists: { count: player.metrics.assists.count + count, confirmedByCoach: false } };
    }

    const updatedPlayer = { ...player, metrics: updatedMetrics };
    
    // Save updated telemetry structure instantly to memory!
    localStorage.setItem(`lunara_profile_${userEmail.toLowerCase()}`, JSON.stringify(updatedPlayer));
    
    setPlayer(updatedPlayer);

    const newLog = {
      id: Date.now(),
      type: metricType === 'goals' ? 'Goals' : 'Assists',
      amount: count,
      date: new Date().toISOString().split('T')[0],
      status: "Self Reported"
    };

    setHistoryLogs([newLog, ...historyLogs]);
    setMetricValue('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-slate-100 font-sans animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-md">
        <h1 className="text-xl font-bold tracking-tight text-white font-mono uppercase">Performance Tracking Ledger</h1>
        <p className="text-xs text-slate-400 mt-0.5">Document training metrics. Self-reported records display secondary warnings until coach validation overrides.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* DATA SUBMISSION CONTROL CONSOLE */}
        <div className="md:col-span-1">
          <form onSubmit={handleLogSubmit} className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">Log Activity Event</h3>
            
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Target Dimension</label>
              <select value={metricType} onChange={(e) => setMetricType(e.target.value)} className="w-full bg-slate-950 border border-slate-800 px-3 py-2 rounded text-xs text-slate-300 focus:outline-none">
                <option value="goals">Goals Scored</option>
                <option value="assists">Assists Cleared</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Quantity Count</label>
              <input type="number" value={metricValue} onChange={(e) => setMetricValue(e.target.value)} placeholder="e.g., 1" className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-sky-500" />
            </div>

            <button type="submit" className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-2 rounded text-xs transition-colors uppercase tracking-wider">
              Append Metric to Record
            </button>
          </form>
        </div>

        {/* METRIC STREAM AUDITING LIST */}
        <div className="md:col-span-2 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Sequential Performance Logs</h3>
          
          <div className="space-y-2">
            {historyLogs.map(log => (
              <div key={log.id} className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex justify-between items-center text-xs font-mono">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">+{log.amount} {log.type}</span>
                    <span className={`text-[8px] font-bold px-1.5 py-0.2 rounded border
                      ${log.status === 'Coach Confirmed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                      {log.status}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">Logged timestamp entry date: {log.date}</p>
                </div>
                <span className="text-slate-400 text-[11px] font-bold">MVP System Node</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default GrowthTracker;
