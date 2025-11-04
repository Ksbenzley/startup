import React, { useState, useEffect } from 'react';
import './style.css';
import { useNavigate, BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { AuthState } from './authState'

export function Login() {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [authState, setAuthState] = useState(AuthState.Unauthenticated);
  const [songOfTheDay, setSongOfTheDay] = useState(null);

  useEffect(() => {
    const randomArtists = [
      'Coldplay',
      'Adele',
      'Kendrick Lamar',
      'U2',
      'Pink Floyd',
      'Daft Punk',
      'Mai Yamane',
      'Steve Conte',
      'David Bowie',
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

  const navigate = useNavigate();

  function handleLogin(e){
    e.preventDefault();

     if (userName.trim() && password.trim()) {
      setAuthState(AuthState.Authenticated);
      console.log('Logged in as', userName);
      navigate('/explore');
    } else {
      alert('Please enter a username and password.');
    }
  }

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
                    value = {userName}
                    onChange = {(e) => setUserName(e.target.value)}
                    />
                    <br />
                    <br />
          
                  <label>Password:</label>
                  <input 
                    type="password" 
                    value = {password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    <br />
                    <br />
              </div>

              <div className="button-group">
                <button type="submit" className="nav-link">Log In</button>
                <NavLink to="/createAccount" className="nav-link">
                  Create Account
                </NavLink>
                <NavLink to="/create" className="nav-link">
                  Take Me Home
                </NavLink>
              </div>
          </form>
      </main>
    </div>
  );
}