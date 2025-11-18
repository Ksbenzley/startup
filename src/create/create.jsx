import React, { useState } from 'react';
import './createStyle.css';

export function Create({ onNewPost, currentUserName }) {
  const [title, setTitle] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [description, setDescription] = useState('');
  const [instruments, setInstruments] = useState([]);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setInstruments([...instruments, value]);
    } else {
      setInstruments(instruments.filter((i) => i !== value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      title,
      description,
      instruments,
      userName: currentUserName,
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Failed to save post');
      }

      const saved = await res.json();

      if (onNewPost) {
        onNewPost({ ...newPost, _id: saved.id });
      }

      // Reset the form
      setTitle('');
      setImageFile(null);
      setAudioFile(null);
      setDescription('');
      setInstruments([]);

    } catch (err) {
      console.error('Error saving post:', err);
    }
  };


  return (
    <main>
      <div className="newPostMaker">
        <form className="inputs" onSubmit={handleSubmit}>
          <label>Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} /><br /><br />

          <label>Post Image</label>
          <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} /><br /><br />

          <label>Audio Upload</label>
          <input type="file" accept="audio/*" onChange={(e) => setAudioFile(e.target.files[0])} /><br /><br />

          <label>Text Description</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} /><br /><br />

          <div className="checklist">
            <label>Requested Instruments:</label><br />
            {['Drums', 'Bass', 'Vocals', 'Guitar', 'Keyboard'].map((instr) => (
              <label key={instr}>
                <input
                  type="checkbox"
                  value={instr}
                  checked={instruments.includes(instr)}
                  onChange={handleCheckboxChange}
                />{' '}
                {instr}
              </label>
            ))}
          </div>

          <div className="submitBtn">
            <br />
            <button type="submit">Create/Post</button>
          </div>
        </form>
      </div>
    </main>
  );
}
