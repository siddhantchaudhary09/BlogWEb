import React from "react";
import download from "../assets/download.jpeg";

function Logo({ width = "100px" }) {
  return (
    <div className="w-[100px]">
      <img src={download} alt="logo" />
    </div>
  );
}

export default Logo;
