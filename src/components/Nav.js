import React, { useState, useEffect, useRef } from "react";

import { gmailLogin, logOut, saveMeme } from "../services/Firebase.js";
import UploadModal from "./UploadModal";

import "./styles/Nav.css";
import CustomizedDialogs from "./CustomizedDialogs.js";
//import categories from "../data/Categories";

export default function({ categories }) {
  //state hooks
  let [user, setUser] = useState(null);
  let [show, setShow] = useState(false);
  let [link, setLink] = useState(null);
  let [meme, setMeme] = useState({});
  //refs
  let inputRef = useRef();

  //life cicles:
  useEffect(() => {
    let userInText = localStorage.getItem("user");
    let user = JSON.parse(userInText);
    setUser(user);
  }, [user]);

  //kind of method
  function login() {
    gmailLogin().then(user => {
      setUser(user);
    });
  }

  function openModal() {
    if (!localStorage.getItem("user")) return alert("Inicia sesión.");
    let input = inputRef.current;

    input.click();
    input.onchange = e => {
      let fr = new FileReader();

      fr.readAsDataURL(e.target.files[0]);
      fr.onload = () => {
        setLink(fr.result);
        setShow(true);
      };
    };
  }

  function onChange(e) {
    let m = { ...meme };
    m[e.target.name] = e.target.value;
    setMeme(m);
  }

  function sendMeme() {
    let m = { ...meme, link };
    //saveMeme(m);
    setShow(false);
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
          {categories.map(option => (
            <button key={option} value={option}>
              {option}
            </button>
          ))}
        </div>
        {user && (
          <div className="upload">
            <button onClick={openModal}>Upload</button>
          </div>
        )}
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
          <span onClick={user ? logOut : login} id="username">
            {user ? user.displayName : "Login"}
          </span>
        </div>
      </nav>
      {/* {console.log(show)} */}
      {show && (
        <CustomizedDialogs
          link={link}
          sendMeme={sendMeme}
          setShow={setShow}
          open={show}
          onChange={onChange}
        />
        // <UploadModal
        //   sendMeme={sendMeme}
        //   onChange={onChange}
        //   link={link}
        //   setShow={setShow}
        // />
      )}
      <input ref={inputRef} accept="image/*" hidden id="file" type="file" />
    </>
  );
}
