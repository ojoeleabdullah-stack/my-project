import React, { useState } from 'react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, AreaChart, Area 
} from 'recharts';
import { LayoutDashboard, User, Trophy, BarChart3, Settings, Search, Bell } from 'lucide-react';

// --- MOCK DATA MATCHING THE DIAGRAM ---
const cognitiveMetricsData = [
  { subject: 'Perception', player: 88, average: 70 },
  { subject: 'Decision', player: 85, average: 75 },
  { subject: 'Execution', player: 80, average: 65 },
  { subject: 'Adaptation', player: 75, average: 72 },
  { subject: 'Creativity', player: 82, average: 60 },
];

const profilePieData = [
  { name: 'Perception (30%)', value: 30, color: '#06b6d4' },
  { name: 'Decision (25%)', value: 25, color: '#0891b2' },
  { name: 'Execution (20%)', value: 20, color: '#0e7490' },
  { name: 'Adaptation (15%)', value: 15, color: '#155e75' },
  { name: 'Creativity (10%)', value: 10, color: '#1e40af' },
];

const keyAttributesData = [
  { name: 'Technical', Player: 85, TeamTarget: 80 },
  { name: 'Physical', Player: 92, TeamTarget: 85 },
  { name: 'Tactical', Player: 73, TeamTarget: 80 },
  { name: 'Mental', Player: 76, TeamTarget: 84 },
];

const recentPerformanceData = [
  { name: 'Game 1', Goals: 0, Assists: 1, Passes: 60, Distance: 10 },
  { name: 'Game 2', Goals: 1, Assists: 0, Passes: 75, Distance: 11 },
  { name: 'Game 3', Goals: 0, Assists: 2, Passes: 68, Distance: 10.5 },
  { name: 'Game 4', Goals: 2, Assists: 0, Passes: 80, Distance: 12 },
  { name: 'Game 5', Goals: 1, Assists: 1, Passes: 72, Distance: 11.2 },
];

const developmentData = [
  { season: 'Season 1', score: 65 },
  { season: 'Season 2', score: 72 },
  { season: 'Season 3', score: 70 },
  { season: 'Season 4', score: 81 },
  { season: 'Season 5', score: 86 },
];

export default function PlayerDashboard() {
  const [activeTab, setActiveTab] = useState('Cognitive');

  return (
    <div className="flex min-h-screen bg-[#090F1C] text-slate-200 font-sans">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-16 bg-[#0E1726] flex flex-col items-center py-6 justify-between border-r border-slate-800 shrink-0">
        <div className="flex flex-col gap-8 items-center w-full">
          <div className="text-cyan-400 font-black text-xl tracking-wider">P</div>
          <nav className="flex flex-col gap-6 w-full items-center">
            <button className="p-2 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-cyan-400 transition">
              <LayoutDashboard size={20} />
            </button>
            <button className="p-2 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-cyan-400 transition">
              <User size={20} />
            </button>
            <button className="p-2 rounded-xl text-[#00f3ff] bg-slate-800/50 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
              <BarChart3 size={20} />
            </button>
            <button className="p-2 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-cyan-400 transition">
              <Trophy size={20} />
            </button>
          </nav>
        </div>
        <button className="p-2 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-cyan-400 transition">
          <Settings size={20} />
        </button>
      </aside>

      {/* MAIN CONTAINER */}
      <main className="flex-1 p-6 overflow-y-auto">
        
        {/* TOP BAR / HEADER */}
        <header className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white mb-2">Player Dashboard</h1>
            <div className="flex gap-4 border-b border-slate-800 text-sm">
              {['Cognitive', 'Key Attributes'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 px-1 transition-all ${
                    activeTab === tab 
                      ? 'text-cyan-400 border-b-2 border-cyan-400 font-medium' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-slate-500" size={16} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-[#111A2E] border border-slate-800 rounded-full pl-9 pr-4 py-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-500 w-48"
              />
            </div>
            <button className="p-2 rounded-full bg-[#111A2E] text-slate-400 hover:text-white border border-slate-800">
              <Bell size={16} />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center font-bold text-xs text-white">
              JD
            </div>
          </div>
        </header>

        {/* DASHBOARD GRID SYSTEM */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* 1. PLAYER COGNITIVE METRICS (RADAR) */}
          <div className="bg-[#0E1726] border border-slate-800/60 rounded-xl p-5 lg:col-span-2 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-semibold tracking-wide text-slate-300">Player Cognitive Metrics</h2>
              <span className="text-[10px] text-slate-500 bg-slate-800/40 px-2 py-0.5 rounded border border-slate-700/50">League average &gt;&gt;</span>
            </div>
            <div className="h-64 flex justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={cognitiveMetricsData}>
                  <PolarGrid stroke="#1e293b" />
                  <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={11} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="Current Player" dataKey="player" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.3} />
                  <Radar name="League Average" dataKey="average" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.05} strokeDasharray="4 4" />
                  <Tooltip contentStyle={{ backgroundColor: '#111a2e', borderColor: '#334155', color: '#fff' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 text-xs mt-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-cyan-500" />
                <span className="text-slate-400">Current Player</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-1 border-t-2 border-dashed border-blue-500" />
                <span className="text-slate-400">League Average</span>
              </div>
            </div>
          </div>

          {/* 2. PLAYER COGNITIVE PROFILE (DONUT) */}
          <div className="bg-[#0E1726] border border-slate-800/60 rounded-xl p-5 shadow-xl flex flex-col justify-between">
            <h2 className="text-sm font-semibold tracking-wide text-slate-300 mb-4">Player Cognitive Profile</h2>
            <div className="flex items-center justify-between gap-2 h-full">
              <div className="relative w-1/2 flex justify-center items-center">
                <ResponsiveContainer width="100%" height={160}>
                  <PieChart>
                    <Pie
                      data={profilePieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={52}
                      outerRadius={70}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {profilePieData.Item?.map ? null : profilePieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                {/* Center Text Badge */}
                <div className="absolute text-center flex flex-col justify-center items-center pointer-events-none">
                  <span className="text-3xl font-black tracking-tight text-white leading-none">86</span>
                  <span className="text-[9px] text-slate-400 tracking-wider mt-1 uppercase">Overall Cognitive<br/>Rating</span>
                </div>
              </div>
              
              {/* Legend List */}
              <div className="w-1/2 flex flex-col gap-2 text-[11px] text-slate-400 pl-2">
                {profilePieData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="truncate">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3. PLAYER KEY ATTRIBUTES (BAR CHART) */}
          <div className="bg-[#0E1726] border border-slate-800/60 rounded-xl p-5 shadow-xl lg:col-span-3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-semibold tracking-wide text-slate-300">Player Key Attributes</h2>
              <div className="flex gap-4 text-[10px]">
                <span className="text-cyan-400 flex items-center gap-1">● Player</span>
                <span className="text-blue-500 flex items-center gap-1">■ Team Target</span>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={keyAttributesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 100]} />
                  <Tooltip contentStyle={{ backgroundColor: '#111a2e', borderColor: '#334155', color: '#fff' }} />
                  <Bar dataKey="Player" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="TeamTarget" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}