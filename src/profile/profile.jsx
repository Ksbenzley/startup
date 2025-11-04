import React from 'react';
import './profileStyle.css';

export function Profile({ posts, userName }) {
  // Filter posts to only show those created by this user
  const userPosts = posts.filter(post => post.userName === userName);

  return (
    <main>
      <h2 className="text-center">My Profile</h2>
      <div className="wrapper">
        {userPosts.length > 0 ? (
          userPosts.map((post, index) => (
            <div key={index} className="explorePost">
              <h3>{post.title} by {post.userName}</h3>
              {post.image && <img src={post.image} alt={`${post.title} cover`} />}
              {post.audio && (
                <audio controls>
                  <source src={post.audio} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              )}
              <p>{post.description}</p>
              {post.requests && post.requests.length > 0 && (
                <>
                  <h4>Requests:</h4>
                  <ul>
                    {post.requests.map((instr, i) => <li key={i}>{instr}</li>)}
                  </ul>
                </>
              )}
            </div>
          ))
        ) : (
          <p>No posts yet.</p>
        )}
      </div>
    </main>
  );
}
