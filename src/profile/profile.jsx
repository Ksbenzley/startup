import React, { useEffect, useState } from 'react';
import './profileStyle.css';

export function Profile({ userName }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/posts`, {
          credentials: 'include',
        });

        if (!res.ok) {
          throw new Error("Failed to load posts");
        }

        const data = await res.json();
        setPosts(data);

      } catch (err) {
        console.error("Error loading posts:", err);
      }
    };

    loadPosts();
  }, []);

  // Posts created by logged-in user
  const userPosts = posts.filter(post => post.userName === userName);

  return (
    <main className="profileMain">
      {userPosts.length === 0 && (
        <p>You haven’t created any posts yet.</p>
      )}

      <div className="wrapper">
        {userPosts.map((post) => {
          const imgUrl = post.imageId
            ? `${import.meta.env.VITE_API_URL}/api/posts/${post._id}/image`
            : null;

          const audioUrl = post.audioId
            ? `${import.meta.env.VITE_API_URL}/api/posts/${post._id}/audio`
            : null;

          return (
            <div key={post._id} className="explorePost">
              <h3>{post.title} by {post.userName}</h3>

              <div className="media-section">
                {imgUrl && (
                  <img
                    src={imgUrl}
                    alt={`${post.title} cover`}
                  />
                )}

                <div className="play-buttons">
                  {audioUrl && (
                    <audio controls src={audioUrl}></audio>
                  )}
                </div>
              </div>

              <p>{post.description}</p>

              {post.instruments && post.instruments.length > 0 && (
                <>
                  <h4>Requests:</h4>
                  <ul>
                    {post.instruments.map((instr) => (
                      <li key={instr}>{instr}</li>
                    ))}
                  </ul>
                </>
              )}

              <button type="button">Proposals</button>
            </div>
          );
        })}
      </div>
    </main>
  );
}
