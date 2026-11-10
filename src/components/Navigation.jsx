import React from "react";

const PLAYER_LINKS = [
  ["dashboard", "Overview", "⌂"],
  ["profile", "My profile", "◎"],
  ["videos", "Highlight feed", "▶"],
  ["growth", "Growth tracker", "↗"],
  ["teams", "My team", "♧"],
];

const SCOUT_LINKS = [
  ["dashboard", "Discover players", "⌕"],
  ["teams", "Teams", "♧"],
  ["verification", "Verification", "✓"],
  ["videos", "Video feed", "▶"],
];

export default function Navigation({ role, page, onNavigate, onRoleChange, onChat }) {
  const isPlayer = role === "player";
  const links = isPlayer ? PLAYER_LINKS : SCOUT_LINKS;

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">L</div>
        <div>
          <strong>LUNARA</strong>
          <small>FOOTBALL NETWORK</small>
        </div>
      </div>

      <div className="role-switch">
        <button
          className={isPlayer ? "active" : ""}
          onClick={() => onRoleChange("player")}
        >
          Player
        </button>
        <button
          className={!isPlayer ? "active" : ""}
          onClick={() => onRoleChange("scout")}
        >
          Scout
        </button>
      </div>

      <div className="nav-label">WORKSPACE</div>

      <nav>
        {links.map(([id, label, icon]) => (
          <button
            key={id}
            className={`nav-link ${page === id ? "selected" : ""}`}
            onClick={() => onNavigate(id)}
          >
            <span>{icon}</span>
            {label}
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="upgrade-card">
          <div className="upgrade-icon">✦</div>
          <b>Your next level awaits.</b>
          <p>Build your profile. Get discovered. Make your move.</p>
          <button
            onClick={() => onNavigate(isPlayer ? "register" : "verification")}
          >
            Get started ↗
          </button>
        </div>

        <button className="nav-link" onClick={onChat}>
          <span>✉</span>
          Messages <i className="unread-dot" />
        </button>

        <button className="nav-link" onClick={() => onNavigate("admin")}>
          <span>⚙</span>
          Admin tools
        </button>

        <div className="sidebar-user">
          <div className="user-avatar">{isPlayer ? "DO" : "SC"}</div>
          <div>
            <b>{isPlayer ? "David Okafor" : "Scout account"}</b>
            <small>{isPlayer ? "Player account" : "Talent scout"}</small>
          </div>
          <span>•••</span>
        </div>
      </div>
    </aside>
  );
}