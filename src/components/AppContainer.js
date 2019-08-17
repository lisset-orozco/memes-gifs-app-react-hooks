import React, { useState, useEffect, useRef } from "react";

import { saveMeme } from "../services/Firebase.js";
import categories from "../data/Categories";
import "./styles/Results.css";

import CustomizedDialogs from "./CustomizedDialogs.js";
import { memesRef } from "../services/Firebase";

import DrawerBar from "./DrawerBar.js";

const AppContainer = () => {
  //hooks
  let [results, setResults] = useState([]);
  let [list, setList] = useState([]);
  let [show, setShow] = useState(false);
  let [link, setLink] = useState(null);
  let [meme, setMeme] = useState({});
  let [load, setLoad] = useState(true);

  // ref
  let inputRef = useRef();

  useEffect(() => {
    let unsubscribe = memesRef.onSnapshot(function(snap) {
      let memes = [];
      snap.forEach(doc => {
        memes.push(doc.data());
      });
      setResults(memes);
      setList(memes);
      if (memes.length > 0) setLoad(false);
    });

    return unsubscribe;
  }, []);

  function onClickCategory(value) {
    setLoad(false);
    let result = [];
    if (value === "Home") home();
    else {
      memesRef.onSnapshot(function(snap) {
        snap.forEach(doc => {
          let data = doc.data();

          if (data.category === value) {
            result.push(data);
          }
        });
        if (result.length > 0) {
          setResults(result);
        } else {
          setResults([]);
        }
      });
    }
  }

  function home() {
    setResults(list);
  }

  function onChangeSearch(e) {
    let value = e.target.value;
    let regex = new RegExp(value, "i");
    let filtered = list.filter(r => regex.test(r.tags));
    // if (filtered.length > 0) setFound(true);
    setResults(filtered);
  }

  function onClickUpload(e) {
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
    saveMeme(m);
    setShow(false);
  }

  return (
    <>
      <DrawerBar
        onClickCategory={onClickCategory}
        onChangeSearch={onChangeSearch}
        onClickUpload={onClickUpload}
        results={results}
        load={load}
      />

      {show && (
        <CustomizedDialogs
          link={link}
          sendMeme={sendMeme}
          setShow={setShow}
          open={show}
          onChange={onChange}
          categories={categories}
        />
      )}
      <input ref={inputRef} accept="image/*" hidden id="file" type="file" />
    </>
  );
};
export default AppContainer;
