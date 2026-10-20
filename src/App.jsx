import React, { useState } from 'react';
import Navigation from './components/Navigation';
import AuthPortal from './components/AuthPortal';
import PlayerProfile from './components/PlayerProfile';
import GrowthTracker from './components/GrowthTracker';
import ScoutDashboard from './components/ScoutDashboard';
import RegisterProfile from './components/RegisterProfile';
import TeamManagement from './components/TeamManagement';
import ScoutVerification from './components/ScoutVerification';
import AdminModeration from './components/AdminModeration';

function App() {
  const [userSession, setUserSession] = useState({
    isLoggedIn: false,
    role: 'player', // 'player', 'coach', 'scout', or 'admin'
    email: '',
    associatedId: null
  });

  const [activeScreen, setActiveScreen] = useState('scout');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isProfileActivated, setIsProfileActivated] = useState(false);

  const [player, setPlayer] = useState({
    name: "Ojoele Abdullah",
    position: "Midfielder",
    preferredFoot: "Left",
    ageBand: "U-20",
    location: "Lagos State",
    club: "Lagos Football Academy",
    bio: "Emerging engine room midfielder specializing in quick transitions.",
    videoUrl: "https://youtube.com",
    metrics: {
      goals: { count: 12, confirmedByCoach: true },
      assists: { count: 8, confirmedByCoach: false }
    }
  });

  const [talentPool, setTalentPool] = useState([
    { id: 1, name: "Chidi Okafor", position: "Striker", ageBand: "U-18", location: "Enugu State", club: "Enugu Rangers Academy", videoUrl: "https://youtube.com", goals: 14, assists: 3, verifiedByCoach: true },
    { id: 2, name: "Tunde Bakare", position: "Goalkeeper", ageBand: "U-20", location: "Kano State", club: "Kano Pillars Jrs", videoUrl: "https://youtube.com", goals: 0, assists: 0, verifiedByCoach: false },
    { id: 3, name: "Ojoele Abdullah", position: "Midfielder", ageBand: "U-20", location: "Lagos State", club: "Lagos Football Academy", videoUrl: "https://youtube.com", goals: 12, assists: 8, verifiedByCoach: true }
  ]);

  // 🛡️ PRD REQUISITE: Master Repository for Flags and Verification Actions (PRD Section 11 & 15)
  const [moderationTickets, setModerationTickets] = useState([
    { id: 101, type: "Fraud Claim", targetName: "Fake Agent Joe", details: "Demanded ₦50,000 for guaranteed trials at Malmö FF.", reporter: "Acme Football Academy", status: "Active" },
    { id: 102, type: "Scout Verification Request", targetName: "David Cole", details: "Vetting Chelsea FC official credential documents.", reporter: "System Audit", status: "Pending Manual Review" },
    { id: 103, type: "Suspicious Content", targetName: "Video Link ID #442", details: "External link redirects to promotional gambling content instead of football drills.", reporter: "Chidi Okafor", status: "Active" }
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
      
      <Navigation 
        activeScreen={activeScreen} 
        setActiveScreen={setActiveScreen} 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
        setUserSession={setUserSession}
        userRole={userSession.role}
        isProfileActivated={isProfileActivated}
      />

      <main className="max-w-7xl mx-auto p-4 md:p-8">
        
        {/* Player Routings */}
        {activeScreen === 'register' && userSession.role === 'player' && <RegisterProfile setPlayer={setPlayer} setIsProfileActivated={setIsProfileActivated} setActiveScreen={setActiveScreen} />}
        {activeScreen === 'profile' && userSession.role === 'player' && <PlayerProfile player={player} />}
        {activeScreen === 'tracking' && userSession.role === 'player' && <GrowthTracker player={player} setPlayer={setPlayer} talentPool={talentPool} setTalentPool={setTalentPool} />}

        {/* Coach Routings */}
        {activeScreen === 'team' && userSession.role === 'coach' && <TeamManagement roster={talentPool} setRoster={setTalentPool} />}

        {/* Scout Routings */}
        {activeScreen === 'verify' && userSession.role === 'scout' && <ScoutVerification />}

        {/* Shared Radar Screen */}
        {activeScreen === 'scout' && <ScoutDashboard talentPool={talentPool} userRole={userSession.role} />}

        {/* 🛠️ ADMIN EXCLUSIVE INTERFACE ROUTE */}
        {activeScreen === 'admin' && userSession.role === 'admin' && (
          <AdminModeration tickets={moderationTickets} setTickets={setModerationTickets} />
        )}

      </main>
    </div>
  );
}

export default App;
