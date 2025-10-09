import React from 'react';
import './createStyle.css';

export function Create() {
  return (
    <main>
      <div className="newPostMaker">
        <form className="inputs">
            <label for="post">Title</label>
            <input type="text" id="post" name="post" /><br/><br/>
            <label for="post">Post Image</label>
            <input type="file" id="post" name="post" accept="image/*"/><br/><br/>
            <label for="post">Audio Upload</label>
            <input type="file" id="post" name="post" accept="audio/*"/><br/><br/>
            <label for="post">Text Description</label>
            <input type="text" id="post" name="post" /><br/><br/>
        </form>
        <div className="checklist">
            <label>
                Requested:
            </label><br/>

            <label>
                <input type="checkbox" name="instruments" value="Drums" /> Drums
            </label><br/>

            <label>
                <input type="checkbox" name="instruments" value="Bass" /> Bass
            </label><br/>

            <label>
                <input type="checkbox" name="instruments" value="Vocals" /> Vocals
            </label><br/>

            <label>
                <input type="checkbox" name="instruments" value="Guitar" /> Guitar
            </label><br/>

            <label>
                <input type="checkbox" name="instruments" value="Keyboard" /> Keyboard
            </label>
        </div>
        <div class="submitBtn">
            <br/>
            <button>Create/Post</button>
        </div>
    </div>

    </main>
  );
}