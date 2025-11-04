import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './createStyle.css';

export function Create({ onNewPost, userName }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [requests, setRequests] = useState([]);

  const navigate = useNavigate();

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setRequests([...requests, value]);
    } else {
      setRequests(requests.filter((r) => r !== value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create URLs for uploaded files so they can be displayed
    const imageUrl = imageFile ? URL.createObjectURL(imageFile) : null;
    const audioUrl = audioFile ? URL.createObjectURL(audioFile) : null;

    const newPost = {
      title,
      description,
      userName,
      image: imageUrl,
      audio: audioUrl,
      requests,
      proposals: [],
    };

    // Add the post to App.jsx
    if (onNewPost) onNewPost(newPost);

    // Reset form
    setTitle('');
    setDescription('');
    setImageFile(null);
    setAudioFile(null);
    setRequests([]);

    // Navigate to explore after creating post
    navigate('/explore');
  };

  return (
    <main>
      <div className="newPostMaker">
        <form className="inputs" onSubmit={handleSubmit}>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <br /><br />

          <label>Post Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
          <br /><br />

          <label>Audio Upload</label>
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setAudioFile(e.target.files[0])}
          />
          <br /><br />

          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            required
          />
          <br /><br />

          <div className="checklist">
            <label>Requests:</label><br />
            {['Drums', 'Bass', 'Vocals', 'Guitar', 'Keyboard'].map((instr) => (
              <label key={instr}>
                <input
                  type="checkbox"
                  value={instr}
                  checked={requests.includes(instr)}
                  onChange={handleCheckboxChange}
                />{' '}
                {instr}
              </label>
            ))}
          </div>

          <div className="submitBtn">
            <br />
            <button type="submit">Create / Post</button>
          </div>
        </form>
      </div>
    </main>
  );
}



// export function Create() {
//   return (
//     <main>
//       <div className="newPostMaker">
//         <form className="inputs">
//             <label for="post">Title</label>
//             <input type="text" id="post" name="post" /><br/><br/>
//             <label for="post">Post Image</label>
//             <input type="file" id="post" name="post" accept="image/*"/><br/><br/>
//             <label for="post">Audio Upload</label>
//             <input type="file" id="post" name="post" accept="audio/*"/><br/><br/>
//             <label for="post">Text Description</label>
//             <input type="text" id="post" name="post" /><br/><br/>
//         </form>
//         <div className="checklist">
//             <label>
//                 Requested:
//             </label><br/>

//             <label>
//                 <input type="checkbox" name="instruments" value="Drums" /> Drums
//             </label><br/>

//             <label>
//                 <input type="checkbox" name="instruments" value="Bass" /> Bass
//             </label><br/>

//             <label>
//                 <input type="checkbox" name="instruments" value="Vocals" /> Vocals
//             </label><br/>

//             <label>
//                 <input type="checkbox" name="instruments" value="Guitar" /> Guitar
//             </label><br/>

//             <label>
//                 <input type="checkbox" name="instruments" value="Keyboard" /> Keyboard
//             </label>
//         </div>
//         <div className="submitBtn">
//             <br/>
//             <button>Create/Post</button>
//         </div>
//     </div>

//     </main>
//   );
// }