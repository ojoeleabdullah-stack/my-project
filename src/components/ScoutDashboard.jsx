import React from 'react';

function ScoutDashboard() {
  const talentPool = [
    { id: 1, name: "Chidi Okafor", position: "Striker", age: 18, rating: "⭐ 4.8" },
    { id: 2, name: "Tunde Bakare", position: "Goalkeeper", age: 20, rating: "⭐ 4.5" },
    { id: 3, name: "Ojoele Abdullah", position: "Midfielder", age: 19, rating: "⭐ 4.9" },
  ];

  return (
    <div>
      <h1 style={{ color: '#2d3748', marginTop: 0 }}>Scout Talent Radar</h1>
      <p style={{ color: '#718096' }}>Review top up-and-coming players based on performance tracking metrics.</p>
      <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', marginTop: '20px' }}>
        {talentPool.map(talent => (
          <div key={talent.id} style={{ background: 'white', padding: '20px', borderRadius: '8px', borderLeft: '5px solid #3182ce', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <h3 style={{ margin: '0 0 5px 0' }}>{talent.name}</h3>
            <p style={{ margin: '0 0 10px 0', color: '#718096', fontSize: '14px' }}>{talent.position} • {talent.age} yrs</p>
            <span style={{ fontWeight: 'bold', color: '#b7791f' }}>{talent.rating}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScoutDashboard;
