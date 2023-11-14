import React, { useState, useEffect, useRef } from "react";
import Detection from "./components/detection";
import Selector from "./components/selector";
import ListDevices from "./components/listDevices";
import Topbar from "./components/topbar"
import styles from "./style/App.module.css"


const App = () => {
  return (
    <div className={styles.app}>
      
      <Topbar/>
      <div className={styles.playground}>
        <div className={styles.camera}>
          <Detection></Detection>
        </div>
        <div className={styles.lista}>
            <ListDevices></ListDevices>
        </div>
      </div>
      
      
    </div>
  );
}
  
export default App;
