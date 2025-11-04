import React, { useEffect, useState } from 'react';
import './exploreStyle.css';

export function Explore({ posts }) {
  const [songOfTheDay, setSongOfTheDay] = useState(null);

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

    fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(randomArtist)}&limit=10&entity=song`)
      .then(res => res.json())
      .then(data => {
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
      .catch(err => console.error('Error fetching song of the day:', err));
  }, []);

  return (
    <main>
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
        {posts.map((post, index) => (
          <div key={index} className="explorePost">
            <h3>{post.title} by {post.userName}</h3>
            {post.imageFile && <img src={URL.createObjectURL(post.imageFile)} alt={post.title} />}
            {post.audioFile && <audio controls src={URL.createObjectURL(post.audioFile)} />}
            <p>{post.description}</p>
            <h4>Requests:</h4>
            <ul>{post.instruments?.map(instr => <li key={instr}>{instr}</li>)}</ul>
          </div>
        ))}
      </div>
    </main>
  );
}
