import React from "react";
import "../style/loader.module.css";

const Loader = (props) => {
  return (
    <div className="wrapper" {...props}>
      <div className="spinner"></div>
      <div>
        <h2>detecção com YOLOv7</h2>
        <p>{props.children}</p>
      </div>
    </div>
  );
};

export default Loader;
