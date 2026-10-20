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
  const [userSession, setUserSession] = useState({
    isLoggedIn: false,
    role: 'player', // 'player', 'coach', or 'scout' 
    email: ''
  });

  const [activeScreen, setActiveScreen] = useState('profile');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isProfileActivated, setIsProfileActivated] = useState(false);

  // Core structured data shape 
  const [player, setPlayer] = useState({
    name: "Ojoele Abdullah",
    position: "Midfielder",
    preferredFoot: "Left",
    ageBand: "U-20", 
    location: "Lagos State",
    club: "Lagos Football Academy",
    bio: "Emerging central midfielder specializing in transition play and vision.",
    videoUrl: "https://youtube.com",
    metrics: {
      goals: { count: 12, confirmedByCoach: true }, // Segregated statistics
      assists: { count: 8, confirmedByCoach: false }
    }
  });

 // TeamRoster state variable:
const [teamRoster, setTeamRoster] = useState([
  { id: 1, name: "Chidi Okafor", position: "Striker", ageBand: "U-18", goalsReported: 14, assistsReported: 3, status: "Verified" },
  { id: 2, name: "Tunde Bakare", position: "Goalkeeper", ageBand: "U-20", goalsReported: 0, assistsReported: 0, status: "Unverified" }
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
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-20 md:pb-0">
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
        {activeScreen === 'register' && <RegisterProfile setPlayer={setPlayer} setIsProfileActivated={setIsProfileActivated} setActiveScreen={setActiveScreen} />}
        {activeScreen === 'profile' && <PlayerProfile player={player} setPlayer={setPlayer} />}
        {activeScreen === 'tracking' && <GrowthTracker player={player} setPlayer={setPlayer} />}
        {activeScreen === 'scout' && <ScoutDashboard playerProfile={player} />}
        {activeScreen === 'team' && <TeamManagement roster={teamRoster} setRoster={setTeamRoster} />}
        {activeScreen === 'verify' && <ScoutVerification />}
      </main>
    </div>
  );
}

export default App;
