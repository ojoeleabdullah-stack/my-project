import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import PlayerProfile from './components/PlayerProfile';
import ScoutDashboard from './components/ScoutDashboard';

function App() {
  const [activeScreen, setActiveScreen] = useState('profile');
  const [player, setPlayer] = useState({
    name: "Ojoele Abdullah",
    position: "Midfielder / Winger",
    age: 19,
    club: "Lagos Football Academy",
    goals: 12
  });

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', backgroundColor: '#f7fafc' }}>
      
      {/* Sidebar Component */}
      <Sidebar activeScreen={activeScreen} setActiveScreen={setActiveScreen} />

      {/* Main Content Router Display */}
      <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        {activeScreen === 'profile' && <PlayerProfile player={player} />}
        
        {activeScreen === 'tracking' && (
          <div>
            <h1 style={{ color: '#2d3748', marginTop: 0 }}>Growth Tracker</h1>
            <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', maxWidth: '400px' }}>
              <p style={{ fontSize: '18px' }}>Total Goals: ⚽ <strong>{player.goals}</strong></p>
              <button onClick={() => setPlayer({ ...player, goals: player.goals + 1 })} style={{ backgroundColor: '#48bb78', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Log Goal (+1)</button>
            </div>
          </div>
        )}

        {activeScreen === 'scout' && <ScoutDashboard />}
      </div>
    </div>
  );
}

export default App;
