import React from 'react';
import './profileStyle.css';

export function Profile() {
  return (
    <main>
      <div className="pfp">
        <img src="placeholder.png" alt="user profile pic" />
      </div>

      <div className="wrapper">
          <div className="explorePost">
              <h3> Title of Post by userName</h3>

              <div className="media-section">
                  <img src="placeholder.png" alt="User's chosen image to associate with their file"/>

                  <div className="play-buttons">
                      <button class="img-btn">
                          <img src="play_button2.png" alt="Play Post Audio Only"/>
                      </button>
                      <button className="img-btn">
                          <img src="play_button.png" alt="Play All Audio"/>
                      </button>
                  </div>
              </div>

              <p> description of the post goes here...</p>
              <h4>Requests:</h4>
              <ul>
                  <li>Drums</li>
                  <li>Guitar</li>
                  <li>Vocals</li>
              </ul>
              <button type="button">Proposals</button>
          </div>

          <div className="proposalSection">
              <label>This is where websocket will come in, updating comments for the user</label>
              <h3>  Proposals </h3>
              <div className="comment">
                  <img src="placeholder.png" alt="commenting user's pfp"/>
                  <h4> Type of Proposal </h4>
                  <div className="proposalBtn">
                      <button type="button">Play</button>
                      <button type="button">Play with Post Audio</button>
                  </div>
              </div>
          </div>
      </div>

      <div className="navigator">
          <button type="button">Previous Post</button>
          <button type="button">Next Post</button>
      </div>
      </main>
  );
}




      /*<div className="navigationBar">
          <NavLink className="nav-link" to="/explore">Explore</NavLink>

          <NavLink className="nav-link" to="/create">Create</NavLink>
              
          <NavLink className="nav-link" to="/profile">Profile</NavLink>
              
          <NavLink className="nav-link" to="/login">Login</NavLink>
      </div>
      <br/><br/>

          <div className="GitHub">
          <a href="https://github.com/Ksbenzley/startup.git">
              <button>GitHub</button>
          </a>
      </div>
    </main>
  );
}*/