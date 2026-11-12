import React from "react";

const DEFAULT_PLAYER = {
  name: "David Okafor",
  age: 18,
  position: "Striker",
  location: "Lagos, Nigeria",
  club: "Unattached",
  foot: "Right",
  pace: 91,
  shooting: 88,
  passing: 74,
  bio: "An ambitious young footballer working towards the next level.",
};

const ATTRIBUTES = [
  ["Dribbling", 80],
  ["Defending", 52],
  ["Physical", 76],
];

function Attribute({ label, value }) {
  return (
    <div className="panel attribute">
      <div>
        <b>{label}</b>
        <strong>{value}</strong>
      </div>
      <div className="progress-track">
        <div style={{ width: `${Number(value) || 0}%` }} />
      </div>
    </div>
  );
}

export default function PlayerProfile({ player, isScout, onChat }) {
  const p = player || DEFAULT_PLAYER;

  const attributes = [
    ["Pace", p.pace],
    ["Shooting", p.shooting],
    ["Passing", p.passing],
    ...ATTRIBUTES,
  ];

  return (
    <div className="page-content">
      {/* ── Profile hero ── */}
      <section className="profile-hero panel">
        <div className="profile-avatar">{p.image || "PL"}</div>

        <div className="profile-main">
          <div className="profile-title">
            <div>
              <span className="pill">
                PLAYER PROFILE {p.verified && "· VERIFIED"}
              </span>
              <h2>{p.name}</h2>
              <p className="muted">
                {p.position} · {p.age} years · {p.location}
              </p>
            </div>
            {isScout && (
              <button className="primary-btn" onClick={onChat}>
                Contact player ↗
              </button>
            )}
          </div>

          <p>{p.bio}</p>

          <div className="profile-tags">
            <span>{p.club || "Independent player"}</span>
            <span>{p.foot || "Right"} foot</span>
            <span>{p.verified ? "Verified" : "Awaiting verification"}</span>
          </div>
        </div>
      </section>

      {/* ── Technical attributes ── */}
      <div className="section-heading">
        <div>
          <span className="eyebrow">PLAYER DATA</span>
          <h2>Technical attributes</h2>
        </div>
      </div>

      <div className="attribute-grid">
        {attributes.map(([label, value]) => (
          <Attribute key={label} label={label} value={value} />
        ))}
      </div>

      {/* ── Player story ── */}
      <section className="panel bio-panel">
        <span className="eyebrow">ABOUT THE PLAYER</span>
        <h3>Player story</h3>
        <p>{p.bio}</p>
        <p className="muted">
          Halil bey grew up playing futsal on neighborhood courts before joining a club academy at 15. 
          A right-footed central striker, he is known for scanning before receiving, 
          breaking lines with one-touch passes, goal scoring ability, and leading by example.
        </p>
      </section>
    </div>
  );
}