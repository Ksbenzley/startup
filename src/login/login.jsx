import React from 'react';
import './style.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';

export function Login() {

  return (
    <div className="loginBody">
    <main className="page-container">
        <form className="login-form">
              <div className="form-group">
                  <label>Username:</label>
                  <input type="text" /><br/><br/>
          
                  <label>Password:</label>
                  <input type="password" /><br/><br/>
              </div>

              <div className="button-group">
                  <NavLink to="/" className="nav-link">Log In</NavLink>
                  <NavLink to="/createAccount" className="nav-link">Create Account</NavLink>
                  <NavLink to="/create" className="nav-link">Take Me Home</NavLink>
              </div>
          </form>
    </main>
    </div>
  );
}