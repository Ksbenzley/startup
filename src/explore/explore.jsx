import React, { useState, useEffect } from 'react';
import './exploreStyle.css';

export function Explore({ posts }) {
  const [songOfTheDay, setSongOfTheDay] = useState(null);

  // Fetch Song of the Day on mount
  useEffect(() => {
    const randomArtists = [
      'Coldplay',
      'Adele',
      'Kendrick Lamar',
      'U2',
      'Pink Floyd',
      'Daft Punk',
      'Mai Yamane',
      'Steve Conte',
      'David Bowie',
    ];
    const randomArtist = randomArtists[Math.floor(Math.random() * randomArtists.length)];

    fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(randomArtist)}&limit=10&entity=song`
    )
      .then((res) => res.json())
      .then((data) => {
        const results = data.results;
        if (results && results.length > 0) {
          const randomTrack = results[Math.floor(Math.random() * results.length)];
          setSongOfTheDay({
            title: randomTrack.trackName,
            artist: randomTrack.artistName,
            albumArt: randomTrack.artworkUrl100?.replace('100x100bb', '300x300bb') || null,
          });
        } else {
          setSongOfTheDay({ title: 'No song found', artist: '-', albumArt: null });
        }
      })
      .catch((err) => console.error('Error fetching song of the day:', err));
  }, []);

  return (
    <main>
      {/* Song of the Day */}
      {songOfTheDay && (
        <div className="text-center mt-3">
          <p>
            🎵 Song of the Day: <strong>{songOfTheDay.title}</strong> by {songOfTheDay.artist}
          </p>
          {songOfTheDay.albumArt && (
            <img
              src={songOfTheDay.albumArt}
              alt={`${songOfTheDay.title} cover art`}
              style={{ width: '200px', borderRadius: '10px', marginTop: '10px' }}
            />
          )}
        </div>
      )}

      <div className="wrapper">
        {/* Posts Section */}
        {posts && posts.length > 0 ? (
          posts.map((post, index) => (
            <div className="explorePost" key={index}>
              <h3>
                {post.title} by {post.userName}
              </h3>

              <div className="media-section">
                <img src={post.image || 'placeholder.png'} alt="Post media" />
                <div className="play-buttons">
                  <button className="img-btn">
                    <img src="play_button2.png" alt="Play Post Audio Only" />
                  </button>
                  <button className="img-btn">
                    <img src="play_button.png" alt="Play All Audio" />
                  </button>
                </div>
              </div>

              <p>{post.description}</p>

              <h4>Requests:</h4>
              <ul>
                {post.requests && post.requests.length > 0
                  ? post.requests.map((req, i) => <li key={i}>{req}</li>)
                  : null}
              </ul>

              <button type="button">Proposals</button>

              {/* Proposals for each post */}
              <div className="proposalSection">
                {post.proposals &&
                  post.proposals.map((proposal, i) => (
                    <div className="comment" key={i}>
                      <img src={proposal.userPfp || 'placeholder.png'} alt="comment user" />
                      <h4>{proposal.type}</h4>
                      <div className="proposalBtn">
                        <button type="button">Play</button>
                        <button type="button">Play with Post Audio</button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No posts to display</p>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="navigator">
        <button type="button">Previous Post</button>
        <button type="button">Next Post</button>
      </div>
    </main>
  );
}
