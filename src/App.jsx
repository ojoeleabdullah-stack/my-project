import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import PlayerProfile from './components/PlayerProfile';
import GrowthTracker from './components/GrowthTracker';
import ScoutDashboard from './components/ScoutDashboard';
import RegisterProfile from './components/RegisterProfile';
import VideoInstagramFeed from './components/VideoInstagramFeed';
import ScoutVerification from './components/ScoutVerification';


function App() {
  const [activeScreen, setActiveScreen] = useState('feed'); // Start on the Instagram feed!

  // Global player state (starts with yours)
  const [player, setPlayer] = useState({
    name: "Ojoele Abdullah",
    position: "Midfielder / Winger",
    age: 19,
    club: "Lagos Football Academy",
    goals: 12,
    assists: 8,
    minutesPlayed: 450
  });

  // Global shared video vault (The public Instagram feed data)
  const [globalVideos, setGlobalVideos] = useState([
    { 
      id: 1, 
      playerName: "Chidi Okafor", 
      title: "Explosive Striker Drills ⚡", 
      url: "https://w3schools.com",
      likes: 24,
      club: "Enugu Rangers Academy"
    },
    { 
      id: 2, 
      playerName: "Ojoele Abdullah", 
      title: "Morning Cone Drills & Agility", 
      url: "https://w3schools.com",
      likes: 42,
      club: "Lagos Football Academy"
    }
  ]);

  return (
    <div className="flex min-h-screen bg-slate-950 font-sans text-slate-100">
      
      {/* Sidebar Component */}
      <Sidebar activeScreen={activeScreen} setActiveScreen={setActiveScreen} />

      {/* Main Screen Router Routing Panel */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto max-h-screen">
        {activeScreen === 'feed' && (
          <VideoInstagramFeed globalVideos={globalVideos} setGlobalVideos={setGlobalVideos} />
        )}
        {activeScreen === 'verify' && <ScoutVerification />}

        
        {activeScreen === 'register' && (
          <RegisterProfile setPlayer={setPlayer} setActiveScreen={setActiveScreen} />
        )}

        {activeScreen === 'profile' && (
          <PlayerProfile player={player} globalVideos={globalVideos} setGlobalVideos={setGlobalVideos} />
        )}
        
        {activeScreen === 'tracking' && (
          <GrowthTracker player={player} setPlayer={setPlayer} />
        )}

        {activeScreen === 'scout' && <ScoutDashboard />}
      </main>
    </div>
  );
}

export default App;
