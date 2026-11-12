import React from "react";

const GOALS = [
  ["Ball control", "Complete 3 focused sessions weekly", 2, 3],
  ["Fitness", "Build speed and endurance", 3, 4],
  ["Match performance", "Record and review match footage", 1, 2],
  ["Technical development", "Complete weak-foot drills", 4, 5],
];

const STATS = [
  { label: "Training sessions", value: "10", note: "This month", tone: "positive" },
  { label: "Goals completed", value: "7/10", note: "70% completion", tone: "positive" },
  { label: "Consistency", value: "82%", note: "+8% this month", tone: "positive" },
  { label: "Next review", value: "Friday", note: "Weekly check-in", tone: "muted" },
];

function GoalRow({ name, desc, done, total }) {
  return (
    <div className="goal-row">
      <div>
        <b>{name}</b>
        <small className="muted">{desc}</small>
      </div>
      <span>{done}/{total}</span>
      <div className="progress-track">
        <div style={{ width: `${(done / total) * 100}%` }} />
      </div>
    </div>
  );
}

export default function GrowthTracker() {
  return (
    <div className="page-content">
      <div className="section-heading">
        <div>
          <span className="eyebrow">DEVELOPMENT PLAN</span>
          <h2>Your growth tracker</h2>
          <p className="muted">
            Small, consistent improvements create better players.
          </p>
        </div>
        <span className="pill">WEEK 04</span>
      </div>

      <div className="stats-grid">
        {STATS.map(({ label, value, note, tone }) => (
          <div className="stat-card" key={label}>
            <span className="muted">{label}</span>
            <strong>{value}</strong>
            <small className={tone}>{note}</small>
          </div>
        ))}
      </div>

      <section className="panel goals-panel">
        <span className="eyebrow">WEEKLY TARGETS</span>
        <h3>Training goals</h3>
        {GOALS.map(([name, desc, done, total]) => (
          <GoalRow
            key={name}
            name={name}
            desc={desc}
            done={done}
            total={total}
          />
        ))}
      </section>
    </div>
  );
}