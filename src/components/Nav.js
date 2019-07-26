import React, { useState } from "react";

import { gmailLogin } from "../services/Firebase.js";
import UploadModal from "./UploadModal";

import "./styles/Nav.css";

export default function() {
  //state hooks
  let [user, setUser] = useState(null);
  //kind of method
  function login() {
    gmailLogin().then(user => {
      setUser(user);
    });
  }

  return (
    <>
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
            src={
              user
                ? user.photoURL
                : "https://media.giphy.com/avatars/default3.gif"
            }
            alt="eyes"
          />
          <span onClick={login} id="username">
            {user ? user.displayName : "Login"}
          </span>
        </div>
      </nav>
      {false && <UploadModal />}
    </>
  );
}
