import React from 'react';
import './profileStyle.css';

export function Profile({ posts }) {
  const userName = localStorage.getItem('userName');

  return (
    <main>
      {/* Profile picture and name */}
      <div className="pfp">
        <img src="placeholder.png" alt="user profile pic" />
        <h2 className="profile-name">{userName}</h2>
      </div>

      {/* Horizontal scroll container for all post-proposal pairs */}
      <div className="scroll-container">
      <div className="posts-wrapper">
        {posts.length === 0 ? (
          <p>No posts yet. Create one!</p>
        ) : (
          posts.map((post, index) => (
            <div className="post-unit" key={index}>
              {/* Post section */}
              <div className="explorePost">
                <h3>{post.title} by {userName}</h3>

                <div className="media-section">
                  {post.imageFile ? (
                    <img
                      src={URL.createObjectURL(post.imageFile)}
                      alt="User's chosen image"
                      className="post-image"
                    />
                  ) : (
                    <img
                      src="placeholder.png"
                      alt="placeholder image"
                      className="post-image"
                    />
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
              </div>

              {/* Proposals section attached to the right */}
              <div className="proposalSection">
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
          ))
        )}
      </div>
      </div>
    </main>
  );
}
