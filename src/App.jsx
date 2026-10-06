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
  // Global auth state populated from the login portal
  const [userSession, setUserSession] = useState({
    isLoggedIn: false,
    role: 'player', // 'player' or 'scout'
    email: ''
  });

  const [activeScreen, setActiveScreen] = useState('feed');
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      title: "Explosive Striker Drills ⚡ #Striker #NaijaTalent", 
      url: "https://w3schools.com",
      likes: 124,
      commentsCount: 14,
      club: "Enugu Rangers Academy",
      isLiked: false
    },
    { 
      id: 2, 
      playerName: "Ojoele Abdullah", 
      title: "Morning Cone Drills & Agility work at Lagos National Stadium", 
      url: "https://w3schools.com",
      likes: 89,
      commentsCount: 6,
      club: "Lagos Football Academy",
      isLiked: false
    }
  ]);

  if (!userSession.isLoggedIn) {
    return <AuthPortal setUserSession={setUserSession} setActiveScreen={setActiveScreen} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-20 md:pb-0">
      
      {/* 🧭 HYBRID NAVIGATION CONTROLLER WITH ROLE PROTECTION */}
      <Navigation 
        activeScreen={activeScreen} 
        setActiveScreen={setActiveScreen} 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
        setUserSession={setUserSession}
        userRole={userSession.role}
      />

      {/* 💻 CONTROLLER MAIN SCROLL VIEWPORT */}
      <main className="max-w-7xl mx-auto p-0 md:p-8">
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
