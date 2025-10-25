import React, { useState } from 'react';
import './createStyle.css';

export function Create({ onNewPost }) {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = { title, imageFile, audioFile, description, instruments };
    console.log('Creating post:', newPost);

    // Call a parent function to store this post (or send to backend)
    if (onNewPost) {
      onNewPost(newPost);
    }

    // Reset form
    setTitle('');
    setImageFile(null);
    setAudioFile(null);
    setDescription('');
    setInstruments([]);
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
            <label>Requested:</label><br />
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