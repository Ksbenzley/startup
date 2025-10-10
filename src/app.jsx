import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { Create } from './create/create';
import { CreateAccount } from './createAccount/createAccount';
import { Explore } from './explore/explore';
import { Login } from './login/login';
import { Profile } from './profile/profile';

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();
  const hideNavPages = ['/', '/createAccount']; // pages where nav is hidden
  const shouldHideNav = hideNavPages.includes(location.pathname);

  return (
    <div>
      {/* Header is ALWAYS shown */}
      <header className="container-fluid">
        <div className="header">
          <h1> Jammix </h1>
          <h2> Explore </h2>
        </div>

        {/* Nav is shown ONLY if NOT on login or create account page */}
        {!shouldHideNav && (
          <nav className="navigationBar">
            <menu className="navbar-nav d-flex flex-row gap-3">
              <li className="nav-item">
                <NavLink className="nav-link" to="/explore">Explore</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/create">Create</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/profile">Profile</NavLink>
              </li>
            </menu>
          </nav>
        )}
      </header>

      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/createAccount' element={<CreateAccount />} />
        <Route path='/explore' element={<Explore />} />
        <Route path='/create' element={<Create />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='*' element={<NotFound />} />
      </Routes>

      {/* Footer is hidden on login and create account pages */}
      {!shouldHideNav && (
        <footer>
          <div className="GitHub">
            <a href="https://github.com/Ksbenzley/startup.git">
              <button>GitHub</button>
            </a>
          </div>
          <p className="footer-text">
            Kaden Benzley ©️ 2025. All rights reserved. <br />
            Contact me: benzl@byu.edu
          </p>
        </footer>
      )}
    </div>
  );
}

function NotFound() {
  return (
    <main className="container-fluid bg-secondary text-center">
      404: Return to sender. Address unknown.
    </main>
  );
}
