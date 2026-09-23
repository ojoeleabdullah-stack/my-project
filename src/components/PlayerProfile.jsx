import React, { useState } from 'react';

function PlayerProfile({ player }) {
  const [videos, setVideos] = useState([
    { id: 1, title: "Morning Cone Drills & Agility", url: "https://w3schools.com" },
    { id: 2, title: "Free Kick Practice (Top Corner)", url: "https://w3schools.com" }
  ]);
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const handleAddVideo = (e) => {
    e.preventDefault();
    if (!newTitle || !newUrl) return alert("Please fill out both fields!");
    setVideos([{ id: Date.now(), title: newTitle, url: newUrl }, ...videos]);
    setNewTitle("");
    setNewUrl("");
  };

  return (
    <div>
      <h1 style={{ color: '#2d3748', marginTop: 0 }}>Player Profile</h1>
      <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', maxWidth: '600px', marginBottom: '30px' }}>
        <h2 style={{ margin: '0 0 10px 0', color: '#2b6cb0' }}>{player.name}</h2>
        <p><strong>Position:</strong> {player.position}</p>
        <p><strong>Age:</strong> {player.age} years old</p>
        <p><strong>Current Club:</strong> {player.club}</p>
      </div>

      <h2 style={{ color: '#2d3748' }}>📹 Training Video Vault</h2>
      <form onSubmit={handleAddVideo} style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', maxWidth: '600px', marginBottom: '30px' }}>
        <h3 style={{ marginTop: 0 }}>Upload New Training Video</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input type="text" placeholder="Video Title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e0' }} />
          <input type="text" placeholder="Video Link URL" value={newUrl} onChange={(e) => setNewUrl(e.target.value)} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e0' }} />
          <button type="submit" style={{ backgroundColor: '#3182ce', color: 'white', border: 'none', padding: '12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Publish Video</button>
        </div>
      </form>

      <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', maxWidth: '900px' }}>
        {videos.map(video => (
          <div key={video.id} style={{ background: 'white', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <video src={video.url} controls style={{ width: '100%', height: '160px', backgroundColor: 'black' }} />
            <div style={{ padding: '15px' }}><h4 style={{ margin: 0, color: '#2d3748' }}>{video.title}</h4></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlayerProfile;
