import React, { useState, useEffect } from "react";

import { memesRef } from "../services/Firebase";
import Results from "./Results";
import "./styles/Search.css";
import Nav from "./Nav";

export default function() {
  //hooks
  let [results, setResults] = useState([]);
  let [list, setList] = useState([]);

  useEffect(() => {
    let unsubscribe = memesRef.onSnapshot(function(snap) {
      let memes = [];
      snap.forEach(doc => {
        memes.push(doc.data());
      });
      setResults(memes);
      setList(memes);
    });

    return unsubscribe;
  }, []);

  function onClick(e) {
    let result = [];
    let value = e.target.value;

    if (e.target.name === "home") home();
    else {
      memesRef.onSnapshot(function(snap) {
        snap.forEach(doc => {
          let data = doc.data();
          if (data.category === value) result.push(doc.data());
        });
        if (result.length > 0 ? setResults(result) : home());
      });
    }
  }

  function home() {
    setResults(list);
  }

  function onChange(e) {
    let value = e.target.value;
    let regex = new RegExp(value, "i");
    let filtered = list.filter(r => regex.test(r.tags));
    setResults(filtered);
  }

  return (
    <>
      <Nav onClick={onClick} />
      <section className="search">
        <input
          id="searching"
          placeholder="Search for Memes you love"
          type="text"
          onChange={onChange}
        />
        <img
          src="https://blog.airtable.com/content/images/2018/04/blockIconImages-2F3zZbh6x3QMSH6WqBjMGH_search-icon.png"
          alt="search"
        />
      </section>
      {true && <Results results={results} />}
    </>
  );
}
