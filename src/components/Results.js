import React from "react";

import "./styles/Results.css";

export default function({ results }) {
  return (
    <section id="results" className="results">
      {results.map((meme, index) => {
        return (
          <figure key={index}>
            <img alt="result" src={meme.link} style={{ maxHeight: "256px" }} />
          </figure>
        );
      })}
    </section>
  );
}
