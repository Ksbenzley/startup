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
  Navigate,
} from 'react-router-dom';

import { Create } from './create/create';
import { CreateAccount } from './createAccount/createAccount';
import { Explore } from './explore/explore';
import { Login } from './login/login';
import { Profile } from './profile/profile';

// Single ProtectedRoute declaration
function ProtectedRoute({ authState, children }) {
  if (authState !== AuthState.Authenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
}

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
  const [posts, setPosts] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [socket, setSocket] = useState(null);

  const hideNavPages = ['/', '/createAccount'];
  const shouldHideNav = hideNavPages.includes(location.pathname);

  // --- Handle authentication changes ---
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
      if (res.ok) onAuthChange('', AuthState.Unauthenticated);
      else alert('Logout failed');
    } catch (err) {
      console.error('Error connecting to backend:', err);
      alert('Error connecting to server');
    }
  };

  const addPost = (newPost) => {
    setPosts([...posts, newPost]);
    navigate('/profile');
  };

  // --- WebSocket integration ---
  useEffect(() => {
    // Adjust port or protocol as needed
    const wsProtocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const wsUrl = `${wsProtocol}://${window.location.hostname}:4000`;
    const socket = new WebSocket(wsUrl);
    setSocket(socket);

    socket.onopen = () => console.log('WebSocket connected!');

    socket.onmessage = (event) => {
      const msg = event.data;

      try {
        // Try parsing as a post
        const parsed = JSON.parse(msg);
        setPosts((prev) => [...prev, parsed]);
        showNotification(`${parsed.userName} made a post!`);
      } catch {
        // If not JSON, treat as a general notification
        showNotification(msg);
      }
    };

    socket.onclose = () => console.log('WebSocket disconnected');
    socket.onerror = (err) => console.error('WebSocket error:', err);

    return () => socket.close();
  }, []);

  // --- Notifications helper ---
  const showNotification = (msg) => {
    setNotifications((prev) => [...prev, msg]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n !== msg));
    }, 5000); // auto-remove after 5s
  };

  // Optional: Send a test message via backend POST to broadcast
  const handleSendTest = async () => {
    if (!userName) return alert('You must be logged in to send a test message.');

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Test WebSocket Message',
          userName: userName,
        }),
      });

      if (res.ok) {
        showNotification('Test post sent!');
      } else {
        alert('Failed to send test message.');
      }
    } catch (err) {
      console.error(err);
      alert('Error sending test message.');
    }
  };

  return (
    <div>
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

      {/* --- Notifications under header --- */}
      {notifications.length > 0 && (
        <div className="notifications">
          {notifications.map((note, idx) => (
            <div key={idx} className="notification">
              {note}
            </div>
          ))}
        </div>
      )}

      <Routes>
        <Route
          path="/"
          element={<Login userName={userName} authState={authState} onAuthChange={onAuthChange} />}
        />
        <Route path="/createAccount" element={<CreateAccount onAuthChange={onAuthChange} />} />
        <Route
          path="/explore"
          element={
            <ProtectedRoute authState={authState}>
              <Explore posts={posts} />
              <button onClick={handleSendTest} style={{ marginTop: '10px' }}>
                Send Test Message
              </button>
            </ProtectedRoute>
          }
        />
        <Route
          path="/create"
          element={
            <ProtectedRoute authState={authState}>
              <Create onNewPost={addPost} currentUserName={userName} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute authState={authState}>
              <Profile posts={posts} userName={userName} />
            </ProtectedRoute>
          }
        />
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
