
import React, { useState } from "react";

const NAVIGATION = {
  player: [
    ["dashboard", "Overview", "⌂"],
    ["profile", "My profile", "◎"],
    ["videos", "Highlight feed", "▶"],
    ["growth", "Growth tracker", "↗"],
    ["teams", "My team", "♧"],
  ],
  scout: [
    ["dashboard", "Discover players", "⌕"],
    ["teams", "Teams", "♧"],
    ["verification", "Verification", "✓"],
    ["videos", "Video feed", "▶"],
  ],
  admin: [
    ["dashboard", "Overview", "⌂"],
    ["admin", "Moderation", "⚙"],
    ["verification", "Scout verification", "✓"],
  ],
};

export default function Navigation({
  role,
  page,
  onNavigate,
  onChat,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = NAVIGATION[role] || NAVIGATION.player;
  const isPlayer = role === "player";
  const isAdmin = role === "admin";

  const navigateTo = (nextPage) => {
    onNavigate(nextPage);
    setMobileMenuOpen(false);
  };

  const openMessages = () => {
  setMobileMenuOpen(false);
  onChat();
  };

  const getStartedPage = isPlayer
    ? "register"
    : isAdmin
      ? "admin"
      : "verification";

  const accountName = isPlayer
    ? "David Okafor"
    : isAdmin
      ? "Administrator"
      : "Scout account";

  const accountRole = isPlayer
    ? "Player account"
    : isAdmin
      ? "Admin account"
      : "Talent scout";

  return (
    <>
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">L</div>
          <div>
            <strong>LUNARA</strong>
            <small>FOOTBALL NETWORK</small>
          </div>
        </div>

        <div className="workspace-label">
          <span className="nav-label">WORKSPACE</span>
          <span className="workspace-role">{role.toUpperCase()}</span>
        </div>

        <nav className="sidebar-nav">
          {links.map(([id, label, icon]) => (
            <button
              key={id}
              className={`nav-link ${page === id ? "selected" : ""}`}
              onClick={() => navigateTo(id)}
              aria-current={page === id ? "page" : undefined}
            >
              <span className="nav-icon">{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          {!isAdmin && (
            <div className="upgrade-card">
              <div className="upgrade-icon">✦</div>
              <b>Your next level awaits.</b>
              <p>
                {isPlayer
                  ? "Build your profile. Get discovered. Make your move."
                  : "Find emerging talent. Discover the next generation."}
              </p>
              <button onClick={() => navigateTo(getStartedPage)}>
                Get started ↗
              </button>
            </div>
          )}

          <button className="nav-link messages-link" onClick={openMessages}>
            <span className="nav-icon">✉</span>
            <span>Messages</span>
            <i className="unread-dot" />
          </button>

          {isAdmin && (
            <button
              className={`nav-link ${page === "admin" ? "selected" : ""}`}
              onClick={() => navigateTo("admin")}
            >
              <span className="nav-icon">⚙</span>
              <span>Admin tools</span>
            </button>
          )}

          <div className="sidebar-user">
            <div className="user-avatar">
              {isPlayer ? "DO" : isAdmin ? "AD" : "SC"}
            </div>
            <div className="sidebar-user-info">
              <b>{accountName}</b>
              <small>{accountRole}</small>
            </div>
            <span className="user-more">•••</span>
          </div>
        </div>
      </aside>

      {/* Mobile navigation */}
      <nav className="mobile-nav" aria-label="Mobile navigation">
        {links.slice(0, 3).map(([id, label, icon]) => (
          <button
            key={id}
            className={`mobile-nav-item ${page === id ? "selected" : ""}`}
            onClick={() => navigateTo(id)}
            aria-current={page === id ? "page" : undefined}
          >
            <span>{icon}</span>
            <small>{label}</small>
          </button>
        ))}

        <button
          className={`mobile-nav-item ${mobileMenuOpen ? "selected" : ""}`}
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-expanded={mobileMenuOpen}
        >
          <span>☰</span>
          <small>More</small>
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="mobile-menu">
          {links.slice(3).map(([id, label, icon]) => (
            <button
              key={id}
              className={`nav-link ${page === id ? "selected" : ""}`}
              onClick={() => navigateTo(id)}
            >
              <span className="nav-icon">{icon}</span>
              {label}
            </button>
          ))}

          <button className="nav-link" onClick={openMessages}>
            <span className="nav-icon">✉</span>
            Messages
          </button>

          {isAdmin && (
            <button
              className="nav-link"
              onClick={() => navigateTo("admin")}
            >
              <span className="nav-icon">⚙</span>
              Admin tools
            </button>
          )}
        </div>
      )}
    </>
  );
}
