import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
    <div className="body bg-dark text-light">
      <header className="container-fluid">
        <div class="header">
            <h1> Jammix </h1>
            <h2> Explore </h2>
        </div>
      </header>

      <main>App components go here</main>

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
  );
}