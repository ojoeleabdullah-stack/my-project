import React, { useState } from 'react';
import Navigation from './components/Navigation';
import AuthPortal from './components/AuthPortal';
import PlayerProfile from './components/PlayerProfile';
import GrowthTracker from './components/GrowthTracker';
import ScoutDashboard from './components/ScoutDashboard';
import RegisterProfile from './components/RegisterProfile';
import VideoInstagramFeed from './components/VideoInstagramFeed';
import ScoutVerification from './components/ScoutVerification';

function App() {
  // Global user connection tracking
  const [userSession, setUserSession] = useState({
    isLoggedIn: false,
    role: 'player' // 'player' or 'scout'
  });

  const [activeScreen, setActiveScreen] = useState('feed');
  const [sidebarOpen, setSidebarOpen] = useState(false); // Controls desktop drawer toggle

  const [player, setPlayer] = useState({
    name: "Ojoele Abdullah",
    position: "Midfielder / Winger",
    age: 19,
    club: "Lagos Football Academy",
    goals: 12,
    assists: 8,
    minutesPlayed: 450
  });

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

  // If user hasn't authenticated, lock the screens and show the Login/Sign-up screen
  if (!userSession.isLoggedIn) {
    return <AuthPortal setUserSession={setUserSession} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-20 md:pb-0">
      
      {/* 🧭 MODERN CONDENSED CONTROLLER NAVIGATION */}
      <Navigation 
        activeScreen={activeScreen} 
        setActiveScreen={setActiveScreen} 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
        setUserSession={setUserSession}
      />

      {/* 💻 MAIN FLUID SCROLL PANELS */}
      <main className="max-w-7xl mx-auto p-4 md:p-8">
        {activeScreen === 'feed' && <VideoInstagramFeed globalVideos={globalVideos} setGlobalVideos={setGlobalVideos} />}
        {activeScreen === 'register' && <RegisterProfile setPlayer={setPlayer} setActiveScreen={setActiveScreen} />}
        {activeScreen === 'profile' && <PlayerProfile player={player} globalVideos={globalVideos} setGlobalVideos={setGlobalVideos} />}
        {activeScreen === 'tracking' && <GrowthTracker player={player} setPlayer={setPlayer} />}
        {activeScreen === 'scout' && <ScoutDashboard />}
        {activeScreen === 'verify' && <ScoutVerification />}
      </main>
    </div>
  );
}

export default App;
