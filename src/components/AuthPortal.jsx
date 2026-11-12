
import React, { useState } from "react";

export default function AuthPortal({ onAuthenticated }) {
  const [mode, setMode] = useState("login");
  const [role, setRole] = useState("player");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const isRegister = mode === "register";

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (isRegister && password !== confirmPassword) {
      setError("Your passwords do not match.");
      return;
    }

    if (isRegister && !name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    // Frontend demonstration only.
    // Real authentication will be handled by the Go backend.
    onAuthenticated?.({
      role,
      user: {
        name: isRegister ? name.trim() : email.split("@")[0],
        email,
      },
      scoutStatus: role === "scout" ? "pending" : null,
    });
  };

  return (
    <div className="auth-screen">
      <div className="auth-brand">
        <div className="auth-logo">L</div>
        <h1>LUNARA</h1>
        <p>THE NEXT GENERATION OF FOOTBALL TALENT</p>
      </div>

      <div className="auth-card">
        <div className="auth-heading">
          <span className="auth-eyebrow">
            {isRegister ? "JOIN THE NETWORK" : "WELCOME BACK"}
          </span>

          <h2>
            {isRegister ? "Create your account" : "Your next opportunity starts here."}
          </h2>

          <p>
            {isRegister
              ? "Choose your account type and join the Lunara network."
              : "Sign in to continue your football journey."}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <>
              <label className="auth-label">Joining As</label>

              <div className="auth-role-options">
                <button
                  type="button"
                  className={`auth-role-option ${role === "player" ? "active" : ""}`}
                  onClick={() => setRole("player")}
                >
                  <span>⚽</span>
                  <b>Player</b>
                </button>

                <button
                  type="button"
                  className={`auth-role-option ${role === "scout" ? "active" : ""}`}
                  onClick={() => setRole("scout")}
                >
                  <span>⌕</span>
                  <b>Scout</b>
                </button>
              </div>

              <label className="auth-label" htmlFor="auth-name">
                Full name
              </label>

              <input
                id="auth-name"
                className="auth-input"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </>
          )}

          {!isRegister && (
            <>
              <label className="auth-label">Sign in as</label>

              <div className="auth-role-options">
                <button
                  type="button"
                  className={`auth-role-option ${role === "player" ? "active" : ""}`}
                  onClick={() => setRole("player")}
                >
                  <span>⚽</span>
                  <b>Player</b>
                </button>

                <button
                  type="button"
                  className={`auth-role-option ${role === "scout" ? "active" : ""}`}
                  onClick={() => setRole("scout")}
                >
                  <span>⌕</span>
                  <b>Scout</b>
                </button>
              </div>
            </>
          )}

          <label className="auth-label" htmlFor="auth-email">
            Email address
          </label>

          <input
            id="auth-email"
            className="auth-input"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="auth-label" htmlFor="auth-password">
            Password
          </label>

          <input
            id="auth-password"
            className="auth-input"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            required
          />

          {isRegister && (
            <>
              <label className="auth-label" htmlFor="auth-confirm">
                Confirm password
              </label>

              <input
                id="auth-confirm"
                className="auth-input"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                minLength={8}
                required
              />
            </>
          )}

          {error && <p className="auth-error">{error}</p>}

          {isRegister && role === "scout" && (
            <div className="auth-notice">
              Scout accounts require manual verification by the Lunara
              administration team before accessing protected scouting features.
            </div>
          )}

          <button className="auth-submit" type="submit">
            {isRegister ? "Create account" : "Sign in"} <span>→</span>
          </button>
        </form>

        <div className="auth-switch">
          {isRegister ? "Already have an account?" : "New to Lunara?"}

          <button
            type="button"
            onClick={() => {
              setMode(isRegister ? "login" : "register");
              setError("");
            }}
          >
            {isRegister ? "Sign in" : "Create an account"}
          </button>
        </div>
      </div>

      <div className="auth-footer">
        © 2026 Lunara · Built for the next generation of football talent.
      </div>
    </div>
  );
}
