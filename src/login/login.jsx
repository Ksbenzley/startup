import React, { useState } from 'react';
import './style.css';
import { useNavigate, BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { AuthState } from './authState'

export function Login() {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [authState, setAuthState] = useState(AuthState.Unauthenticated);

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