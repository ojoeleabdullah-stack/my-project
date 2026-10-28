import React, { useState, useEffect } from 'react';
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
    role: 'player', 
    email: ''
  });

  const [activeScreen, setActiveScreen] = useState('scout');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isProfileActivated, setIsProfileActivated] = useState(false);

  const [player, setPlayer] = useState({
    name: "", position: "", preferredFoot: "", ageBand: "", location: "", club: "", bio: "", videoUrl: "",
    metrics: { goals: { count: 0, confirmedByCoach: false }, assists: { count: 0, confirmedByCoach: false } }
  });

  //  REQUISITE: Check browser memory whenever user session changes (Login/Logout)
  useEffect(() => {
    if (userSession.isLoggedIn && userSession.role === 'player') {
      // Look into the browser storage for this specific email's profile
      const savedProfile = localStorage.getItem(`lunara_profile_${userSession.email.toLowerCase()}`);
      
      if (savedProfile) {
        setPlayer(JSON.parse(savedProfile));
        setIsProfileActivated(true);
        setActiveScreen('profile'); // Send them straight to their card!
      } else {
        setIsProfileActivated(false);
        setActiveScreen('register'); // Brand new email, go to registration form
      }
    }
  }, [userSession]);

  const [talentPool, setTalentPool] = useState([
    { id: 1, name: "Chidi Okafor", position: "Striker", ageBand: "U-18", location: "Enugu State", club: "Enugu Rangers Academy", videoUrl: "https://youtube.com", goals: 14, assists: 3, verifiedByCoach: true },
    { id: 2, name: "Tunde Bakare", position: "Goalkeeper", ageBand: "U-20", location: "Kano State", club: "Kano Pillars Jrs", videoUrl: "https://youtube.com", goals: 0, assists: 0, verifiedByCoach: false }
  ]);

  const [moderationTickets, setModerationTickets] = useState([
    { id: 101, type: "Fraud Claim", targetName: "Fake Agent Joe", details: "Demanded ₦50,000 for guaranteed trials.", reporter: "Acme Football Academy", status: "Active" }
  ]);

  if (!userSession.isLoggedIn) {
    return (
      <AuthPortal 
        setUserSession={setUserSession} 
        setActiveScreen={setActiveScreen} 
        setIsProfileActivated={setIsProfileActivated}
        setPlayer={setPlayer}
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
        {activeScreen === 'register' && userSession.role === 'player' && !isProfileActivated && (
          <RegisterProfile setPlayer={setPlayer} setIsProfileActivated={setIsProfileActivated} setActiveScreen={setActiveScreen} userEmail={userSession.email} />
        )}
        {activeScreen === 'profile' && userSession.role === 'player' && <PlayerProfile player={player} />}
        {activeScreen === 'tracking' && userSession.role === 'player' && <GrowthTracker player={player} setPlayer={setPlayer} talentPool={talentPool} setTalentPool={setTalentPool} userEmail={userSession.email} />}
        {activeScreen === 'team' && userSession.role === 'coach' && <TeamManagement roster={talentPool} setRoster={setTalentPool} />}
        {activeScreen === 'verify' && userSession.role === 'scout' && <ScoutVerification />}
        {activeScreen === 'scout' && <ScoutDashboard talentPool={talentPool} userRole={userSession.role} />}
        {activeScreen === 'admin' && userSession.role === 'admin' && <AdminModeration tickets={moderationTickets} setTickets={setModerationTickets} />}
      </main>
    </div>
  );
}

export default App;
