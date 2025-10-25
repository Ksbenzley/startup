import React, { useState } from 'react';
import './createAccountStyle.css';
import { AuthState } from '../login/authState';

export function CreateAccount({ onAuthChange }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [reenter, setReenter] = useState('');
  const [error, setError] = useState('');

  const handleCreate = (e) => {
    e.preventDefault();

    if (password !== reenter) {
      setError('Passwords do not match!');
      return;
    }

    if (!username || !password) {
      setError('Please fill out all fields.');
      return;
    }

    localStorage.setItem('username', username);
    localStorage.setItem('password', password);

    onAuthChange(username, AuthState.Authenticated);
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
