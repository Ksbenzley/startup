import React, { useState } from 'react';
import './createAccountStyle.css';
import { AuthState } from '../login/authState';
import { useNavigate } from 'react-router-dom';

export function CreateAccount({ onAuthChange }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [reenter, setReenter] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

const handleCreate = async (e) => {
  e.preventDefault();

  if (password !== reenter) {
    setError('Passwords do not match!');
    return;
  }

  if (!username || !password) {
    setError('Please fill out all fields.');
    return;
  }

  try {
    // Call your backend API to register
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      // Redirect to login page without authenticating yet
      alert('Account created successfully! Please log in.');
      window.location.href = '/'; // or use navigate('/') if using useNavigate
    } else {
      const data = await res.json();
      setError(data.error || 'Registration failed');
    }
  } catch (err) {
    console.error(err);
    setError('Error connecting to server');
  }
};


  return (
    <main>
      <form className="signup-form" onSubmit={handleCreate}>
        <div className="form-group">
          <label>Username:</label>
          <input 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          /><br/><br/>

          <label>Password:</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /><br/><br/>

          <label>Re-enter Password:</label>
          <input 
            type="password" 
            value={reenter}
            onChange={(e) => setReenter(e.target.value)}
          /><br/><br/>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div className="button-group">
          <button type="submit">Create Account</button>
        </div>
      </form>
    </main>
  );
}
