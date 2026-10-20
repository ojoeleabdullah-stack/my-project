import React, { useState } from 'react';
import Navigation from './components/Navigation';
import AuthPortal from './components/AuthPortal';
import PlayerProfile from './components/PlayerProfile';
import GrowthTracker from './components/GrowthTracker';
import ScoutDashboard from './components/ScoutDashboard';
import RegisterProfile from './components/RegisterProfile';
import TeamManagement from './components/TeamManagement';
import ScoutVerification from './components/ScoutVerification';

function App() {
  // Master User Authentication State matching PRD Section 6.1
  const [userSession, setUserSession] = useState({
    isLoggedIn: false,
    role: 'player', // 'player', 'coach', or 'scout'
    email: '',
    associatedId: null
  });

  const [activeScreen, setActiveScreen] = useState('scout');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isProfileActivated, setIsProfileActivated] = useState(false);

  // Structural Player Registry Shape (PRD Section 6.2)
  const [player, setPlayer] = useState({
    name: "Ojoele Abdullah",
    position: "Midfielder",
    preferredFoot: "Left",
    ageBand: "U-20",
    location: "Lagos State",
    club: "Lagos Football Academy",
    bio: "Emerging engine room midfielder specializing in quick transitions and vertical direct passing pipelines.",
    videoUrl: "https://youtube.com",
    metrics: {
      goals: { count: 12, confirmedByCoach: true },
      assists: { count: 8, confirmedByCoach: false }
    }
  });

  // Master Global Talent Pool Registry shared across dashboards
  const [talentPool, setTalentPool] = useState([
    { id: 1, name: "Chidi Okafor", position: "Striker", ageBand: "U-18", location: "Enugu State", club: "Enugu Rangers Academy", videoUrl: "https://youtube.com", goals: 14, assists: 3, verifiedByCoach: true },
    { id: 2, name: "Tunde Bakare", position: "Goalkeeper", ageBand: "U-20", location: "Kano State", club: "Kano Pillars Jrs", videoUrl: "https://youtube.com", goals: 0, assists: 0, verifiedByCoach: false },
    { id: 3, name: "Ojoele Abdullah", position: "Midfielder", ageBand: "U-20", location: "Lagos State", club: "Lagos Football Academy", videoUrl: "https://youtube.com", goals: 12, assists: 8, verifiedByCoach: true }
  ]);

  if (!userSession.isLoggedIn) {
    return (
      <AuthPortal 
        setUserSession={setUserSession} 
        setActiveScreen={setActiveScreen} 
        isProfileActivated={isProfileActivated} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-20 md:pb-0 select-none">
      
      {/* 🧭 ROLE CONTROLLER INTERCEPTOR NAVIGATION */}
      <Navigation 
        activeScreen={activeScreen} 
        setActiveScreen={setActiveScreen} 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
        setUserSession={setUserSession}
        userRole={userSession.role}
        isProfileActivated={isProfileActivated}
      />

      {/* 💻 CONSOLE DISPATCHER PANELS */}
      <main className="max-w-7xl mx-auto p-4 md:p-8">
        
        {/* PLAYER EXCLUSIVE SCREENS */}
        {activeScreen === 'register' && userSession.role === 'player' && (
          <RegisterProfile setPlayer={setPlayer} setIsProfileActivated={setIsProfileActivated} setActiveScreen={setActiveScreen} />
        )}
        {activeScreen === 'profile' && userSession.role === 'player' && (
          <PlayerProfile player={player} />
        )}
        {activeScreen === 'tracking' && userSession.role === 'player' && (
          <GrowthTracker player={player} setPlayer={setPlayer} talentPool={talentPool} setTalentPool={setTalentPool} />
        )}

        {/* COACH EXCLUSIVE SCREENS */}
        {activeScreen === 'team' && userSession.role === 'coach' && (
          <TeamManagement roster={talentPool} setRoster={setTalentPool} />
        )}

        {/* SHARED DISCOVERY RADAR ACCESSIBLE BASED ON ROLE */}
        {activeScreen === 'scout' && (userSession.role === 'scout' || userSession.role === 'coach' || userSession.role === 'player') && (
          <ScoutDashboard talentPool={talentPool} userRole={userSession.role} />
        )}
        
        {/* SCOUT EXCLUSIVE COMPLIANCE MATRIX */}
        {activeScreen === 'verify' && userSession.role === 'scout' && (
          <ScoutVerification />
        )}

      </main>
    </div>
  );
}

export default App;
