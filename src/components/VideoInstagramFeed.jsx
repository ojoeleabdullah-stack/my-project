import React, { useState } from "react";

const CLIPS = [
  {
    name: "David Okafor",
    position: "Striker · Lagos",
    caption: "Finishing drills — week 04",
    tag: "FINISHING",
  },
  {
    name: "Samuel Adeyemi",
    position: "Midfielder · Ibadan",
    caption: "Vision and passing range",
    tag: "MIDFIELD",
  },
  {
    name: "Ibrahim Musa",
    position: "Winger · Abuja",
    caption: "1v1 attacking practice",
    tag: "SKILLS",
  },
];

function VideoCard({ clip, index, liked, onToggleLike }) {
  return (
    <article className="video-card panel">
      <div className={`video-placeholder video-${index}`}>
        <span className="video-tag">{clip.tag}</span>
        <span className="play-button">▶</span>
        <small>HIGHLIGHT PREVIEW</small>
      </div>

      <div className="video-info">
        <div>
          <b>{clip.name}</b>
          <small className="muted">{clip.position}</small>
        </div>
        <button
          className={liked ? "liked like-btn" : "like-btn"}
          onClick={onToggleLike}
        >
          {liked ? "♥" : "♡"}
        </button>
      </div>

      <p>{clip.caption}</p>
      <small className="muted">
        Demo content · Upload integration not connected
      </small>
    </article>
  );
}

export default function VideoInstagramFeed() {
  const [liked, setLiked] = useState([]);

  const toggleLike = (i) =>
    setLiked((old) =>
      old.includes(i) ? old.filter((x) => x !== i) : [...old, i]
    );

  return (
    <div className="page-content">
      {/* ── Heading ── */}
      <div className="section-heading">
        <div>
          <span className="eyebrow">SHOW YOUR GAME</span>
          <h2>Highlight feed</h2>
          <p className="muted">
            A place for players to make their football visible.
          </p>
        </div>
      </div>

      {/* ── Video grid ── */}
      <div className="video-grid">
        {CLIPS.map((c, i) => (
          <VideoCard
            key={c.name}
            clip={c}
            index={i}
            liked={liked.includes(i)}
            onToggleLike={() => toggleLike(i)}
          />
        ))}
      </div>
    </div>
  );
}