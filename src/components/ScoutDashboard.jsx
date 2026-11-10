import React, { useMemo, useState } from "react";

function PlayerCard({ player, saved, onSave, onView }) {
  return (
    <article className="player-card panel">
      <div className="player-card-top">
        <div className="player-avatar">{player.image}</div>
        <button
          className={`save-btn ${saved ? "saved" : ""}`}
          onClick={() => onSave(player.id)}
        >
          {saved ? "★" : "☆"}
        </button>
      </div>

      <h3>{player.name}</h3>
      <p className="muted">
        {player.position} · {player.age} years
      </p>
      <p className="small muted">⌖ {player.location}</p>

      <div className="player-card-stats">
        <span>
          <b>{player.pace}</b>
          <small>PAC</small>
        </span>
        <span>
          <b>{player.shooting}</b>
          <small>SHO</small>
        </span>
        <span>
          <b>{player.passing}</b>
          <small>PAS</small>
        </span>
      </div>

      <button className="secondary-btn full" onClick={() => onView(player)}>
        View player profile ↗
      </button>
    </article>
  );
}

export default function ScoutDashboard({ players, onView, savedIds, onSave }) {
  const [search, setSearch] = useState("");
  const [position, setPosition] = useState("All positions");

  const filtered = useMemo(
    () =>
      players.filter(
        (p) =>
          (p.name + " " + p.location + " " + p.position)
            .toLowerCase()
            .includes(search.toLowerCase()) &&
          (position === "All positions" || p.position === position)
      ),
    [players, search, position]
  );

  const positions = [...new Set(players.map((p) => p.position))];

  return (
    <div className="page-content">
      {/* ── Welcome banner ── */}
      <section className="welcome-banner scout-banner">
        <div>
          <span className="pill">SCOUT WORKSPACE</span>
          <h2>
            Find the next
            <br />
            <em>game changer.</em>
          </h2>
          <p>Discover emerging football talent and build your shortlist.</p>
        </div>
        <div className="banner-art">
          <div className="ball">⌕</div>
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
        </div>
      </section>

      {/* ── Section heading ── */}
      <div className="section-heading">
        <div>
          <span className="eyebrow">TALENT NETWORK</span>
          <h2>Discover players</h2>
          <p className="muted">
            Explore player profiles and identify prospects.
          </p>
        </div>
        <span className="pill">{filtered.length} players</span>
      </div>

      {/* ── Filters ── */}
      <div className="filter-bar">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name, location or position..."
        />
        <select value={position} onChange={(e) => setPosition(e.target.value)}>
          <option>All positions</option>
          {positions.map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
      </div>

      {/* ── Player grid ── */}
      <div className="player-grid">
        {filtered.map((p) => (
          <PlayerCard
            key={p.id}
            player={p}
            saved={savedIds.includes(p.id)}
            onSave={onSave}
            onView={onView}
          />
        ))}
      </div>

      {/* ── Empty state ── */}
      {filtered.length === 0 && (
        <div className="empty-state panel">
          No players match that search. Try another name or position.
        </div>
      )}
    </div>
  );
}