import React, { useState } from "react";
import Navigation from "./components/Navigation";
import AuthPortal from "./components/AuthPortal";
import PlayerDashboard from "./components/PlayerDashboard";
import PlayerProfile from "./components/PlayerProfile";
import RegisterProfile from "./components/RegisterProfile";
import ScoutDashboard from "./components/ScoutDashboard";
import ScoutVerification from "./components/ScoutVerification";
import TeamManagement from "./components/TeamManagement";
import VideoInstagramFeed from "./components/VideoInstagramFeed";
import GrowthTracker from "./components/GrowthTracker";
import ChatDrawer from "./components/ChatDrawer";
import AdminModeration from "./components/AdminModeration";
import "./App.css";

const initialPlayers = [
  { id: 1, name: "David Okafor", age: 18, position: "Striker", location: "Lagos, Nigeria", club: "Unattached", rating: "92", foot: "Right", pace: 91, shooting: 88, passing: 74, image: "DO", verified: true, bio: "Explosive forward with a strong instinct for goal.", video: "https://example.com/highlight" },
  { id: 2, name: "Samuel Adeyemi", age: 20, position: "Central Midfielder", location: "Ibadan, Nigeria", club: "Rising Stars FC", rating: "89", foot: "Both", pace: 82, shooting: 78, passing: 91, image: "SA", verified: true, bio: "Creative midfielder who controls tempo and creates chances.", video: "" },
  { id: 3, name: "Ibrahim Musa", age: 17, position: "Left Winger", location: "Abuja, Nigeria", club: "Academy 360", rating: "86", foot: "Left", pace: 94, shooting: 81, passing: 79, image: "IM", verified: false, bio: "Quick winger, confident in one-versus-one situations.", video: "" },
];

export default function App() {
  const [role, setRole] = useState("player");
  const [page, setPage] = useState("dashboard");
  const [players, setPlayers] = useState(initialPlayers);
  const [currentPlayer, setCurrentPlayer] = useState(initialPlayers[0]);
  const [chatOpen, setChatOpen] = useState(false);
  const [savedIds, setSavedIds] = useState([2]);

  const navigate = (nextPage) => setPage(nextPage);
  const addPlayer = (player) => {
    const newPlayer = { ...player, id: Date.now(), rating: "—", pace: 50, shooting: 50, passing: 50, verified: false };
    setPlayers((old) => [newPlayer, ...old]);
    setCurrentPlayer(newPlayer);
    setRole("player");
    setPage("dashboard");
  };
  const toggleSave = (id) => setSavedIds((old) => old.includes(id) ? old.filter(x => x !== id) : [...old, id]);

  return (
    <div className="app-shell">
      <Navigation role={role} page={page} onNavigate={navigate} onRoleChange={(r) => { setRole(r); setPage("dashboard"); }} onChat={() => setChatOpen(true)} />
      <main className="main-area">
        <header className="topbar">
          <div><span className="eyebrow">LUNARA / {role.toUpperCase()}</span><h1>{page === "dashboard" ? (role === "player" ? "Player overview" : "Talent discovery") : page.replace(/([A-Z])/g, " $1")}</h1></div>
          <div className="topbar-right"><span className="live-dot"></span><span className="muted small">Opportunity starts here</span><button className="avatar-button" onClick={() => navigate(role === "player" ? "profile" : "verification")}>{role === "player" ? (currentPlayer.image || "PL") : "SC"}</button></div>
        </header>

        {page === "dashboard" && role === "player" && <PlayerDashboard player={currentPlayer} onNavigate={navigate} />}
        {page === "dashboard" && role === "scout" && <ScoutDashboard players={players} onView={(p) => { setCurrentPlayer(p); navigate("profile"); }} savedIds={savedIds} onSave={toggleSave} />}
        {page === "profile" && <PlayerProfile player={currentPlayer} isScout={role === "scout"} onChat={() => setChatOpen(true)} />}
        {page === "register" && <RegisterProfile onCreate={addPlayer} />}
        {page === "verification" && <ScoutVerification />}
        {page === "teams" && <TeamManagement role={role} />}
        {page === "videos" && <VideoInstagramFeed />}
        {page === "growth" && <GrowthTracker />}
        {page === "admin" && <AdminModeration players={players} />}
        <footer className="footer"><span>© 2026 Lunara</span><span>Built for the next generation of football talent.</span></footer>
      </main>
      <ChatDrawer open={chatOpen} onClose={() => setChatOpen(false)} />
      <AuthPortal />
    </div>
  );
}
