import React, { useEffect, useState } from 'react';
import './profileStyle.css';

export function Profile({ userName }) {
  const [posts, setPosts] = useState([]);

  // Fetch all posts from the backend
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

  // Only show posts created by the logged-in user
  const userPosts = posts.filter(post => post.userName === userName);

  return (
    <main className="profileMain">
      {userPosts.length === 0 && (
        <p>You haven’t created any posts yet.</p>
      )}

      <div className="wrapper">
        {userPosts.map((post) => (
          <div key={post._id || post.id} className="explorePost">
            <h3>{post.title} by {post.userName}</h3>

            <div className="media-section">
              {/* Image/audio disabled until upload system is added */}
              {post.image && (
                <img
                  src={post.image}
                  alt={`${post.title} cover`}
                />
              )}

              <div className="play-buttons">
                {post.audio && (
                  <audio controls src={post.audio}></audio>
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
        ))}
      </div>
    </main>
  );
}

