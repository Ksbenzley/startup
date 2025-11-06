import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { AuthState } from './login/authState';
import {
  BrowserRouter,
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';

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
  const navigate = useNavigate();

  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
  const [authState, setAuthState] = useState(
    userName ? AuthState.Authenticated : AuthState.Unauthenticated
  );
  const [posts, setPosts] = useState([]); // New: store posts

  const hideNavPages = ['/', '/createAccount']; // pages where nav is hidden
  const shouldHideNav = hideNavPages.includes(location.pathname);

  const onAuthChange = (user, newAuthState) => {
    setUserName(user);
    setAuthState(newAuthState);

    if (newAuthState === AuthState.Authenticated) {
      localStorage.setItem('userName', user);
      navigate('/explore');
    } else {
      localStorage.removeItem('userName');
      navigate('/');
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/logout', { method: 'POST' });
      if (res.ok) {
        // Clear frontend state
        onAuthChange('', AuthState.Unauthenticated);
        alert('Logged out successfully!');
      } else {
        console.error('Logout failed');
        alert('Logout failed');
      }
    } catch (err) {
      console.error('Error connecting to backend:', err);
      alert('Error connecting to server');
    }
  };


  // New: function to add a post
  const addPost = (newPost) => {
    setPosts([...posts, newPost]);
    navigate('/profile'); // optional: go to profile after posting
  };

  return (
    <div>
      {/* Header */}
      <header className="container-fluid">
        <div className="header">
          <h1>Jammix</h1>
          <h2>Explore</h2>
        </div>

        {!shouldHideNav && (
          <nav className="navigationBar">
            <menu className="navbar-nav d-flex flex-row gap-3">
              <li className="nav-item">
                <NavLink className="nav-link" to="/explore">
                  Explore
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/create">
                  Create
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/profile">
                  Profile
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogout();
                  }}
                >
                  Log Out
                </NavLink>
              </li>
            </menu>
          </nav>
        )}
      </header>

      {/* Routes */}
      <Routes>
        <Route
          path="/"
          element={
            <Login userName={userName} authState={authState} onAuthChange={onAuthChange} />
          }
        />
        <Route
          path="/createAccount"
          element={<CreateAccount onAuthChange={onAuthChange} />}
        />
        <Route path="/explore" element={<Explore posts={posts} />} />
        <Route path="/create" element={<Create onNewPost={addPost} currentUserName={userName} />} />
        <Route path="/profile" element={<Profile posts={posts} userName={userName} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>


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
