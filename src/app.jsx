import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Create } from './create/create';
import { createAccount } from './createAccount/createAccount';
import { Explore } from './explore/explore';
import { Login } from './login/login';
import { Profile } from './profile/profile';

export default function App() {
  return (
    <BrowserRouter>
      <div className="body bg-dark text-light">
        <header className="container-fluid">
          <div class="header">
              <h1> Jammix </h1>
              <h2> Explore </h2>
            </div>

              <nav className="navigationBar">
                <menu className="navbar-nav d-flex flex-row gap-3">
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/">Login</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/createAccount">Create Account</NavLink>
                  </li>
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
        </header>

        <Routes>
          <Route path='/' element={<Login />} exact />
          <Route path='/createAccount' element={<createAccount />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/create' element={<Create />} />
          <Route path='/profile' elemen={<Profile />} />
          <Route path='*' element={<NotFound />} />
        </Routes>

        <footer className="bg-dark text-white-50">
          <div class="GitHub">
              <a href="https://github.com/Ksbenzley/startup.git">
                  <button>GitHub</button>
              </a>
          </div>
          <p class="footer-text">
              Kaden Benzley ©️ 2025. All rights reserved. <br/>
              Contact me: benzl@byu.edu
          </p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}