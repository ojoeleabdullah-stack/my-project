import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import PlayerProfile from './components/PlayerProfile';
import GrowthTracker from './components/GrowthTracker';
import ScoutDashboard from './components/ScoutDashboard';

function App() {
  const [activeScreen, setActiveScreen] = useState('profile');
  
  // Single source of truth for player data
  const [player, setPlayer] = useState({
    name: "Ojoele Abdullah",
    position: "Midfielder / Winger",
    age: 19,
    club: "Lagos Football Academy",
    goals: 12,
    assists: 8,
    minutesPlayed: 450
  });

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      
      {/* Sidebar Component */}
      <Sidebar activeScreen={activeScreen} setActiveScreen={setActiveScreen} />

      {/* Main Content Pane */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {activeScreen === 'profile' && <PlayerProfile player={player} />}
        
        {activeScreen === 'tracking' && (
          <GrowthTracker player={player} setPlayer={setPlayer} />
        )}

        {activeScreen === 'scout' && <ScoutDashboard />}
      </main>
    </div>
  );
}

export default App;
