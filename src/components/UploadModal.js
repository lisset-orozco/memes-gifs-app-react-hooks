import React from "react";
import "./styles/Modal.css";

export default function() {
  return (
    <>
      <div className="modal">
        <div id="tache">X</div>
        <div className="modal-form">
          <h2>Sube tu hermoso meme</h2>
          <img id="preview" alt="preview" />
          <br />
          <input id="title" name="title" placeholder="título" type="text" />
          <br />
          <input
            id="tags"
            placeholder="TAGS: amlo bliss firebase polloyon"
            name="tags"
            type="text"
          />
          <button id="upload">Subir</button>
        </div>
      </div>

      {/* Inputs */}
      <input accept="image/*" hidden id="file" type="file" />
    </>
  );
}
