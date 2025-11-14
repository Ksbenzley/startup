import React, { useState, useEffect } from 'react';
import './style.css';
import { useNavigate, NavLink } from 'react-router-dom';
import { AuthState } from './authState';

export function Login({ onAuthChange }) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [songOfTheDay, setSongOfTheDay] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const randomArtists = [
      'Coldplay','Adele','Kendrick Lamar','U2','Pink Floyd','Daft Punk',
      'Mai Yamane','Steve Conte','David Bowie',
    ];
    const randomArtist = randomArtists[Math.floor(Math.random() * randomArtists.length)];

    fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(randomArtist)}&limit=10&entity=song`)
      .then(res => res.json())
      .then(data => {
        const results = data.results;
        if (results && results.length > 0) {
          const randomTrack = results[Math.floor(Math.random() * results.length)];
          setSongOfTheDay({
            title: randomTrack.trackName,
            artist: randomTrack.artistName,
            albumArt: randomTrack.artworkUrl100?.replace('100x100bb', '300x300bb') || null,
          });
        } else {
          setSongOfTheDay({ title: 'No song found', artist: '-', albumArt: null });
        }
      })
      .catch(err => console.error('Error fetching song of the day:', err));
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!userName.trim() || !password.trim()) {
      setError('Please enter a username and password.');
      return;
    }

    try {
      const res = await fetch('http://localhost:4000/api/login', { // full backend URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: userName, password }),
        credentials: 'include', // include cookies for session token
      });

      const data = await res.json();

      if (res.ok) {
        onAuthChange(userName, AuthState.Authenticated);
        navigate('/explore'); // go to explore page
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      console.error('Error connecting to backend:', err);
      setError('Error connecting to server');
    }
  };

  return (
    <div className="loginBody">
      <main className="page-container">
        {songOfTheDay && (
          <div className="text-center mt-3">
            <p>
              🎵 Song of the Day: <strong>{songOfTheDay.title}</strong> by {songOfTheDay.artist}
            </p>
            {songOfTheDay.albumArt && (
              <img
                src={songOfTheDay.albumArt}
                alt={`${songOfTheDay.title} cover art`}
                style={{ width: '200px', borderRadius: '10px', marginTop: '10px' }}
              />
            )}
          </div>
        )}

        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            /><br/><br/>

            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            /><br/><br/>
          </div>

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <div className="button-group">
            <button type="submit" className="nav-link">Log In</button>
            <NavLink to="/createAccount" className="nav-link">Create Account</NavLink>
          </div>
        </form>
      </main>
    </div>
  );
}
