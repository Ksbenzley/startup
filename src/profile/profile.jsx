import React from 'react';
import './profileStyle.css';

export function Profile({ posts }) {
  return (
    <main>

        <div className="pfp">
            <img src="placeholder.png" alt="user profile pic" />
        </div>

      <div className="wrapper">
        <div className="posts-container">
        {posts.length === 0 ? (
          <p>No posts yet. Create one!</p>
        ) : (
          posts.map((post, index) => (
            <div className="explorePost" key={index}>
              <h3>{post.title} by {localStorage.getItem('userName')}</h3>

              <div className="media-section">
                {post.imageFile ? (
                  <img src={URL.createObjectURL(post.imageFile)} alt="User's chosen image" />
                ) : (
                  <img src="placeholder.png" alt="placeholder image" />
                )}

                {post.audioFile && (
                  <div className="play-buttons">
                    <audio controls src={URL.createObjectURL(post.audioFile)} />
                  </div>
                )}
              </div>

              <p>{post.description}</p>

              <h4>Requests:</h4>
              {post.instruments.length > 0 ? (
                <ul>
                  {post.instruments.map((instr, idx) => (
                    <li key={idx}>{instr}</li>
                  ))}
                </ul>
              ) : (
                <p>None</p>
              )}

              <button type="button">Proposals</button>
            </div>
          ))
        )}
        </div>

        {/* Placeholder for proposals section */}
        <div className="proposalSection">
          <label>This is where websocket will come in, updating comments for the user</label>
          <h3>Proposals</h3>
          <div className="comment">
            <img src="placeholder.png" alt="commenting user's pfp" />
            <h4>Type of Proposal</h4>
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
