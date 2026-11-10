import React from "react";

function Stat({ label, value, note }) {
  return (
    <div className="stat-card">
      <span className="muted">{label}</span>
      <strong>{value}</strong>
      <small className="muted">{note}</small>
    </div>
  );
}

function ReviewRow({ player }) {
  return (
    <div className="review-row">
      <div className="player-avatar small-avatar">{player.image}</div>
      <div>
        <b>{player.name}</b>
        <small className="muted">
          {player.position} · {player.location}
        </small>
      </div>
      <span
        className={player.verified ? "status-verified" : "status-pending"}
      >
        {player.verified ? "Verified" : "Needs review"}
      </span>
    </div>
  );
}

export default function AdminModeration({ players }) {
  const stats = [
    {
      label: "Player profiles",
      value: players.length,
      note: "In this prototype",
    },
    {
      label: "Awaiting review",
      value: players.filter((p) => !p.verified).length,
      note: "Unverified profiles",
    },
    { label: "Reports", value: 0, note: "No open reports" },
    { label: "Scout checks", value: "—", note: "Backend not connected" },
  ];

  return (
    <div className="page-content">
      {/* ── Heading ── */}
      <div className="section-heading">
        <div>
          <span className="eyebrow">PLATFORM OPERATIONS</span>
          <h2>Admin moderation</h2>
          <p className="muted">
            Review profiles and maintain a safer talent network.
          </p>
        </div>
        <span className="pill">DEMO ADMIN</span>
      </div>

      {/* ── Stats ── */}
      <div className="stats-grid">
        {stats.map(({ label, value, note }) => (
          <Stat key={label} label={label} value={value} note={note} />
        ))}
      </div>

      {/* ── Review queue ── */}
      <section className="panel">
        <h3>Player review queue</h3>
        {players.map((p) => (
          <ReviewRow key={p.id} player={p} />
        ))}
      </section>

      {/* ── Footnote ── */}
      <p className="small muted">
        Do not use this demo interface to make real verification decisions.
        Production moderation requires secure authentication, audit logs and
        evidence review.
      </p>
    </div>
  );
}