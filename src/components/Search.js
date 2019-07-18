import React from "react";
import "./styles/Search.css";
import Results from "./Results";

export default function() {
  return (
    <>
      <section className="search">
        <input
          id="searching"
          placeholder="Search for Memes you love"
          type="text"
        />
        <img
          src="https://blog.airtable.com/content/images/2018/04/blockIconImages-2F3zZbh6x3QMSH6WqBjMGH_search-icon.png"
          alt="search"
        />
      </section>
      {true && <Results />}
    </>
  );
}
