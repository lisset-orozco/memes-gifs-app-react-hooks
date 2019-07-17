import React from "react";
import "./styles/Nav.css";

export default function() {
  return (
    <nav>
      <figure>
        <img
          src="https://firebasemx.com/static/media/firemx.018fbe39.png"
          alt="pizza"
        />
      </figure>
      <div className="categories">
        <button>Reactions</button>
        <button>Entertainment</button>
        <button>Sports</button>
        <button>Stickers</button>
        <button>Artists</button>
        <button>Icon</button>
      </div>
      <div className="upload">
        <button>Upload</button>
        <button>Create</button>
      </div>
      <div className="user">
        <img
          id="photoURL"
          src="https://media.giphy.com/avatars/default3.gif"
          alt="eyes"
        />
        <span id="username">Login</span>
      </div>
    </nav>
  );
}
