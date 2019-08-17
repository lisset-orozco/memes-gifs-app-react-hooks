import React from "react";

import "../components/styles/Errors.css";

import ImgNoResults from "../images/not_found4.png";

const NoResults = ({ onClickCategory }) => {
  let value = "Home";
  return (
    <div className="text-center Error_Margin" align="center">
      <img src={ImgNoResults} alt="NoResults" className="Error_Image" />
      <br />
      <span style={{ color: "#00c853", fontSize: "50px" }}>Sorry</span>
      <br />
      <button
        onClick={() => onClickCategory(value)}
        style={{
          backgroundColor: "#311e68",
          fontSize: "30px",
          color: "white",
          cursor: "pointer",
          borderRadius: "50px",
          padding: "10px 35px",
          border: "none",
          outline: "none",
          outlineOffset: "none"
        }}
      >
        No results found! :(
      </button>
    </div>
  );
};

export default NoResults;
