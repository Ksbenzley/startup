import React from 'react';
import './profileStyle.css';

export function Profile({ posts, userName }) {
  // Only show posts by the logged-in user
  const userPosts = posts.filter(post => post.userName === userName);

  return (
    <main className="profileMain">
      {userPosts.length === 0 && <p>You haven’t created any posts yet.</p>}

      <div className="wrapper">
        {userPosts.map((post, index) => (
          <div key={index} className="explorePost">
            <h3>{post.title} by {post.userName}</h3>

            <div className="media-section">
              {post.imageFile && (
                <img
                  src={URL.createObjectURL(post.imageFile)}
                  alt={`${post.title} cover`}
                />
              )}

              <div className="play-buttons">
                {post.audioFile && (
                  <audio controls src={URL.createObjectURL(post.audioFile)} />
                )}
              </div>
            </div>

            <p>{post.description}</p>

            {post.instruments && post.instruments.length > 0 && (
              <>
                <h4>Requests:</h4>
                <ul>
                  {post.instruments.map(instr => (
                    <li key={instr}>{instr}</li>
                  ))}
                </ul>
              </>
            )}

            <button type="button">Proposals</button>
          </div>
        ))}
      </div>
    </main>
  );
}
