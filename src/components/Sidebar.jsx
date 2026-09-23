import React from 'react';

function Sidebar({ activeScreen, setActiveScreen }) {
  return (
    <div style={{ width: '260px', backgroundColor: '#1a202c', color: 'white', padding: '30px 20px' }}>
      <h2 style={{ color: '#63b3ed', marginBottom: '40px', marginTop: 0 }}>🌙 Lunara App</h2>
      <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
        {['profile', 'tracking', 'scout'].map((screen) => (
          <li 
            key={screen}
            onClick={() => setActiveScreen(screen)}
            style={{ 
              padding: '12px 15px', borderRadius: '6px', cursor: 'pointer', marginBottom: '10px',
              textTransform: 'capitalize',
              backgroundColor: activeScreen === screen ? '#2d3748' : 'transparent',
              color: activeScreen === screen ? '#63b3ed' : '#a0aec0',
              fontWeight: activeScreen === screen ? 'bold' : 'normal'
            }}
          >
            {screen === 'profile' && '👤 Player Profile & Videos'}
            {screen === 'tracking' && '📈 Growth Tracker'}
            {screen === 'scout' && '🔍 Scout Dashboard'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
