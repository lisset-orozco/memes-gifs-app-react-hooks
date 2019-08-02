import React from "react";
import "./styles/Modal.css";

export default function({ setShow, link, sendMeme, onChange }) {
  return (
    <>
      <div style={{ display: "flex" }} className="modal">
        <div
          onClick={() => {
            setShow(false);
          }}
          id="tache"
        >
          X
        </div>
        <div className="modal-form">
          <h2>Sube tu hermoso meme</h2>
          <img src={link} id="preview" alt="preview" />
          <br />
          <input
            onChange={onChange}
            id="title"
            name="title"
            placeholder="título"
            type="text"
          />
          <br />
          <input
            onChange={onChange}
            id="tags"
            placeholder="TAGS: amlo bliss firebase polloyon"
            name="tags"
            type="text"
          />
          <button onClick={sendMeme} id="upload">
            Subir
          </button>
        </div>
      </div>
    </>
  );
}
