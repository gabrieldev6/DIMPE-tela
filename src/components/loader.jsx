import React from "react";
import styles from "../style/loader.module.css";

const Loader = (props) => {
  return (
    <div className={styles.wrapper} {...props}>
      <div className={styles.spinner}></div>
      <div>
        <h2>detecção com YOLOv7</h2>
        <p>{props.children}</p>
      </div>
    </div>
  );
};

export default Loader;
