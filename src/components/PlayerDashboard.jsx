import React from "react";

const STATS = [
  { label: "Profile views", value: "248", change: "+18% this month" },
  { label: "Scout interest", value: "12", change: "+4 new this week" },
  { label: "Video plays", value: "1.2k", change: "+26% this month" },
  { label: "Profile strength", value: "78%", change: "Good progress" },
];

const TASKS = [
  { label: "Basic information", done: true },
  { label: "Playing position & attributes", done: true },
  { label: "Upload match highlights", done: false },
  { label: "Add coach reference", done: false },
];

const SPOTLIGHT_STATS = [
  { value: "91", label: "Pace" },
  { value: "88", label: "Shooting" },
  { value: "74", label: "Passing" },
];

const PROFILE_COMPLETION = 78;

function Stat({ label, value, change }) {
  return (
    <div className="stat-card">
      <span className="muted">{label}</span>
      <strong>{value}</strong>
      <small className="positive">{change}</small>
    </div>
  );
}

function TaskRow({ label, done }) {
  return (
    <div className="task-row">
      <span className={done ? "task-check" : "task-empty"}>
        {done ? "✓" : null}
      </span>
      <span>{label}</span>
      <small className={done ? undefined : "blue-text"}>
        {done ? "Completed" : "Pending"}
      </small>
    </div>
  );
}

export default function PlayerDashboard({ player, onNavigate }) {
  return (
    <div className="page-content">
      {/* ── Welcome banner ── */}
      <section className="welcome-banner">
        <div>
          <span className="pill">PLAYER DEVELOPMENT</span>
          <h2>
            Every great career
            <br />
            starts with <em>one move.</em>
          </h2>
          <p>
            Keep improving your game. Make your talent visible to the right
            people.
          </p>
          <button className="primary-btn" onClick={() => onNavigate("profile")}>
            View my profile ↗
          </button>
        </div>
        <div className="banner-art">
          <div className="ball">⚽</div>
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <span className="banner-number">01</span>
        </div>
      </section>

      {/* ── Performance stats ── */}
      <div className="section-heading">
        <div>
          <span className="eyebrow">YOUR PERFORMANCE</span>
          <h2>At a glance</h2>
        </div>
        <button className="text-btn" onClick={() => onNavigate("growth")}>
          Full growth report ↗
        </button>
      </div>

      <div className="stats-grid">
        {STATS.map(({ label, value, change }) => (
          <Stat key={label} label={label} value={value} change={change} />
        ))}
      </div>

      <div className="dashboard-grid">
        {/* ── Profile completion checklist ── */}
        <section className="panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">NEXT STEP</span>
              <h3>Complete your player profile</h3>
            </div>
            <span className="completion">{PROFILE_COMPLETION}%</span>
          </div>

          <div className="progress-track">
            <div style={{ width: `${PROFILE_COMPLETION}%` }} />
          </div>

          {TASKS.map(({ label, done }) => (
            <TaskRow key={label} label={label} done={done} />
          ))}

          <button
            className="secondary-btn full"
            onClick={() => onNavigate("profile")}
          >
            Improve my profile
          </button>
        </section>

        {/* ── Player spotlight ── */}
        <section className="panel opportunity-panel">
          <span className="eyebrow">PLAYER SPOTLIGHT</span>
          <div className="spotlight-photo">DO</div>
          <h3>{player?.name || "David Okafor"}</h3>
          <p className="muted">
            {player?.position || "Striker"} · {player?.location || "Lagos, Nigeria"}
          </p>
          <div className="spotlight-stats">
            {SPOTLIGHT_STATS.map(({ value, label }) => (
              <div key={label}>
                <b>{value}</b>
                <small>{label}</small>
              </div>
            ))}
          </div>
          <button
            className="secondary-btn full"
            onClick={() => onNavigate("videos")}
          >
            Explore highlight feed
          </button>
        </section>
      </div>
    </div>
  );
}