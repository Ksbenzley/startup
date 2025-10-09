import React from 'react';
import './style.css';

export function Login() {
  return (
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
              </div>
          </form>

          <nav className="nav-bar">
              <NavLink to="/explore" className="nav-link">Take Me Home</NavLink><br/><br/>
          </nav>
    </main>
  );
}