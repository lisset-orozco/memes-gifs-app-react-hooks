import React, { useState, useEffect } from "react";

import { memesRef } from "../services/Firebase";
import Results from "./Results";
import "./styles/Search.css";

export default function() {
  //hooks
  let [results, setResults] = useState([]);
  let [list, setList] = useState([]);

  useEffect(() => {
    let unsubscribe = memesRef.onSnapshot(function(snap) {
      let memes = [];
      snap.forEach(doc => {
        memes.push(doc);
      });
      setResults(memes);
      setList(memes);
    });

    return unsubscribe;
  });

  function onChange(e) {
    let value = e.target.value;
    let regex = new RegExp(value, "i");
    let filtered = list.filter(r => regex.test(r.tags));
    setResults(filtered);
  }

  return (
    <>
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
