import React, { useState } from "react";

const POSITIONS = [
  "Goalkeeper",
  "Right Back",
  "Left Back",
  "Centre Back",
  "Defensive Midfielder",
  "Central Midfielder",
  "Attacking Midfielder",
  "Right Winger",
  "Left Winger",
  "Striker",
];

const FEET = ["Right", "Left", "Both"];

const INITIAL_FORM = {
  name: "",
  age: "",
  position: "Striker",
  location: "",
  club: "",
  foot: "Right",
  bio: "",
};

function Field({ label, className, children }) {
  return (
    <label className={className}>
      {label}
      {children}
    </label>
  );
}

export default function RegisterProfile({ onCreate }) {
  const [form, setForm] = useState(INITIAL_FORM);

  const update = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.age || !form.location.trim()) return;

    onCreate({
      ...form,
      age: Number(form.age),
      image: form.name
        .split(" ")
        .map((x) => x[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
    });
  };

  return (
    <div className="page-content narrow">
      {/* ── Heading ── */}
      <div className="section-heading">
        <div>
          <span className="eyebrow">JOIN THE NETWORK</span>
          <h2>Create your player profile</h2>
          <p className="muted">
            Give scouts a clear picture of who you are and how you play.
          </p>
        </div>
      </div>

      {/* ── Registration form ── */}
      <form className="panel form-grid" onSubmit={submit}>
        <Field label="Full name">
          <input
            name="name"
            value={form.name}
            onChange={update}
            placeholder="e.g. David Okafor"
            required
          />
        </Field>

        <Field label="Age">
          <input
            name="age"
            type="number"
            min="12"
            max="45"
            value={form.age}
            onChange={update}
            placeholder="Your age"
            required
          />
        </Field>

        <Field label="Playing position">
          <select name="position" value={form.position} onChange={update}>
            {POSITIONS.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </Field>

        <Field label="Location">
          <input
            name="location"
            value={form.location}
            onChange={update}
            placeholder="City, Country"
            required
          />
        </Field>

        <Field label="Current club / academy">
          <input
            name="club"
            value={form.club}
            onChange={update}
            placeholder="Club or independent"
          />
        </Field>

        <Field label="Preferred foot">
          <select name="foot" value={form.foot} onChange={update}>
            {FEET.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </Field>

        <Field label="Short player bio" className="span-two">
          <textarea
            name="bio"
            value={form.bio}
            onChange={update}
            placeholder="Tell scouts about your playing style and ambitions."
          />
        </Field>

        <div className="span-two">
          <button className="primary-btn" type="submit">
            Create player profile ↗
          </button>
        </div>
      </form>
    </div>
  );
}