
import React, { useState, useCallback, useMemo } from "react";

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
  {
    id: 1,
    name: "Halil Bey",
    age: 18,
    position: "Striker",
    location: "Lagos, Nigeria",
    club: "Unattached",
    rating: "92",
    foot: "Right",
    pace: 91,
    shooting: 88,
    passing: 74,
    image: "HB",
    verified: true,
    bio: "Explosive forward with a strong instinct for goal.",
    video: "https://example.com/highlight",
  },
  {
    id: 2,
    name: "Samuel Adeyemi",
    age: 20,
    position: "Central Midfielder",
    location: "Ibadan, Nigeria",
    club: "Rising Stars FC",
    rating: "89",
    foot: "Both",
    pace: 82,
    shooting: 78,
    passing: 91,
    image: "SA",
    verified: true,
    bio: "Creative midfielder who controls tempo and creates chances.",
    video: "",
  },
  {
    id: 3,
    name: "Ibrahim Musa",
    age: 17,
    position: "Left Winger",
    location: "Abuja, Nigeria",
    club: "Academy 360",
    rating: "86",
    foot: "Left",
    pace: 94,
    shooting: 81,
    passing: 79,
    image: "IM",
    verified: false,
    bio: "Quick winger, confident in one-versus-one situations.",
    video: "",
  },
];

const ROLE_PAGES = {
  player: [
    "dashboard",
    "profile",
    "register",
    "teams",
    "videos",
    "growth",
  ],
  scout: [
    "dashboard",
    "profile",
    "verification",
    "teams",
    "videos",
  ],
  admin: [
    "dashboard",
    "admin",
    "verification",
  ],
};

const PAGE_TITLES = {
  dashboard: {
    player: "Player overview",
    scout: "Talent discovery",
    admin: "Admin overview",
  },
  profile: "Player profile",
  register: "Create player profile",
  verification: "Scout verification",
  teams: "Team management",
  videos: "Video highlights",
  growth: "Growth tracker",
  admin: "Content moderation",
};

export default function App() {
  // Authentication state
  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState(null);
  const [scoutStatus, setScoutStatus] = useState(null);

  // Application state
  const [page, setPage] = useState("dashboard");
  const [players, setPlayers] = useState(initialPlayers);
  const [currentPlayer, setCurrentPlayer] = useState(initialPlayers[0]);
  const [chatOpen, setChatOpen] = useState(false);
  const [savedIds, setSavedIds] = useState([2]);

  // Handle successful frontend authentication simulation
  const handleAuthenticated = useCallback((account) => {
    setCurrentUser(account.user);
    setRole(account.role);
    setScoutStatus(account.scoutStatus || null);
    setChatOpen(false);

    // Pending scouts go directly to verification.
    setPage(
      account.role === "scout" ? "verification" : "dashboard"
    );
  }, []);

  // Log out
  const handleLogout = useCallback(() => {
    setCurrentUser(null);
    setRole(null);
    setScoutStatus(null);
    setPage("dashboard");
    setChatOpen(false);
  }, []);

  // Pending scouts can only access verification.
  const allowedPages =
    role === "scout" && scoutStatus !== "verified"
      ? ["verification"]
      : ROLE_PAGES[role] || [];

  const navigate = useCallback(
    (nextPage) => {
      if (!allowedPages.includes(nextPage)) {
        setPage(
          role === "scout" && scoutStatus !== "verified"
            ? "verification"
            : "dashboard"
        );
        return;
      }

      setPage(nextPage);
    },
    [allowedPages, role, scoutStatus]
  );

  // Add a new player profile
  const addPlayer = useCallback((player) => {
    const newPlayer = {
      ...player,
      id: Date.now(),
      rating: "—",
      pace: 50,
      shooting: 50,
      passing: 50,
      verified: false,
    };

    setPlayers((previous) => [newPlayer, ...previous]);
    setCurrentPlayer(newPlayer);
    setPage("dashboard");
  }, []);

  // Save or unsave a player
  const toggleSave = useCallback((id) => {
    setSavedIds((previous) =>
      previous.includes(id)
        ? previous.filter((savedId) => savedId !== id)
        : [...previous, id]
    );
  }, []);

  const pageTitle = useMemo(() => {
    const title = PAGE_TITLES[page];

    if (!title) return "Lunara";

    if (typeof title === "string") return title;

    return title[role] || "Lunara";
  }, [page, role]);

  // Render the appropriate workspace page
  const renderPage = () => {
    switch (page) {
      case "dashboard":
        if (role === "player") {
          return (
            <PlayerDashboard
              player={currentPlayer}
              onNavigate={navigate}
            />
          );
        }

        if (role === "scout") {
          return (
            <ScoutDashboard
              players={players}
              onView={(player) => {
                setCurrentPlayer(player);
                navigate("profile");
              }}
              savedIds={savedIds}
              onSave={toggleSave}
            />
          );
        }

        if (role === "admin") {
          return <AdminModeration players={players} />;
        }

        return null;

      case "profile":
        return (
          <PlayerProfile
            player={currentPlayer}
            isScout={role === "scout"}
            onChat={() => setChatOpen(true)}
          />
        );

      case "register":
        return <RegisterProfile onCreate={addPlayer} />;

      case "verification":
        return <ScoutVerification />;

      case "teams":
        return <TeamManagement role={role} />;

      case "videos":
        return <VideoInstagramFeed />;

      case "growth":
        return <GrowthTracker />;

      case "admin":
        return <AdminModeration players={players} />;

      default:
        return null;
    }
  };

  // Show authentication before entering the application
  if (!currentUser || !role) {
    return (
      <AuthPortal onAuthenticated={handleAuthenticated} />
    );
  }

  const isPendingScout =
    role === "scout" && scoutStatus !== "verified";

  return (
    <div className={`app-shell role-${role}`}>
      {/* Pending scouts receive a restricted verification workspace. */}
      {!isPendingScout && (
        <Navigation
          role={role}
          page={page}
          onNavigate={navigate}
          onChat={() => setChatOpen(true)}
        />
      )}

      <main className="main-area">
        <header className="topbar">
          <div className="topbar-heading">
            <span className="eyebrow">
              LUNARA / {role.toUpperCase()}
            </span>

            <h1>{pageTitle}</h1>
          </div>

          <div className="topbar-right">
            {!isPendingScout && (
              <>
                <span className="live-dot" />
                <span className="muted small">
                  Opportunity starts here
                </span>
              </>
            )}

            <span className="muted small">
              {currentUser.name}
            </span>

            <button
              className="logout-button"
              onClick={handleLogout}
              type="button"
            >
              Log out
            </button>
          </div>
        </header>

        <div className="page-content" key={`${role}-${page}`}>
          {isPendingScout ? (
            <div className="scout-pending-notice">
              <h2>Scout account pending verification</h2>
              <p>
                Your account needs approval from the Lunara
                administration team before you can access
                protected scouting features.
              </p>
            </div>
          ) : null}

          {renderPage()}
        </div>

        <footer className="footer">
          <span>© 2026 Lunara</span>
          <span>
            Built for the next generation of football talent.
          </span>
        </footer>
      </main>

      {!isPendingScout && (
        <ChatDrawer
          open={chatOpen}
          onClose={() => setChatOpen(false)}
        />
      )}
    </div>
  );
}
