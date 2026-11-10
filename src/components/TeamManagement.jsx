import React, { useState } from "react";

const INITIAL_TEAMS = ["Rising Stars FC", "Lagos Youth Select"];

function TeamRow({ name, index }) {
  return (
    <div className="team-row">
      <div className="team-crest">{name.slice(0, 2).toUpperCase()}</div>
      <div>
        <b>{name}</b>
        <small className="muted">
          Community team · {index === 0 ? 18 : 12} members
        </small>
      </div>
      <span className="team-arrow">↗</span>
    </div>
  );
}

export default function TeamManagement({ role }) {
  const [teams, setTeams] = useState(INITIAL_TEAMS);
  const [name, setName] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      setTeams([...teams, name.trim()]);
      setName("");
    }
  };

  return (
    <div className="page-content">
      {/* ── Heading ── */}
      <div className="section-heading">
        <div>
          <span className="eyebrow">FOOTBALL COMMUNITY</span>
          <h2>{role === "scout" ? "Manage teams" : "My teams"}</h2>
          <p className="muted">Keep your football network organised.</p>
        </div>
      </div>

      <div className="team-layout">
        {/* ── Team list ── */}
        <section className="panel">
          <h3>Your teams</h3>

          {teams.map((t, i) => (
            <TeamRow key={t} name={t} index={i} />
          ))}

          {teams.length === 0 && (
            <p className="muted">No teams added yet.</p>
          )}
        </section>

        {/* ── Add team ── */}
        <section className="panel">
          <span className="eyebrow">CREATE A NETWORK</span>
          <h3>Add a team</h3>
          <p className="muted">
            Create a space for players, coaches and staff to connect.
          </p>

          <form onSubmit={submit}>
            <label>
              Team name
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter team name"
              />
            </label>
            <button className="primary-btn">Create team +</button>
          </form>
        </section>
      </div>
    </div>
  );
}