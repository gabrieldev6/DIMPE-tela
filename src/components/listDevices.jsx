import React, { Component } from "react";
import styles from "../style/listDevices.module.css"
import * as icon from "react-icons/ai"

export default class ListDevices extends Component {


    render() {
        return (
            <div className={styles.list}>
                Lista de dispositivos
                <ul>
                    <li><div className={styles.device}>
                        <div className={styles.content}>
                            <icon.AiFillAlert className={styles.icon} size={20}/>
                            <p>Dispositivo</p>
                            
                        </div>
                        <div className={styles.contentStatus}>
                            <div className={styles.status}></div>
                            <icon.AiOutlineRight size={20}/>
                        </div>
                        
                        {/* <button>testar dispositivo</button> */}
                    
                    </div></li>

                    <li><div className={styles.device}>
                        <div className={styles.content}>
                            <icon.AiFillAlert className={styles.icon} size={20}/>
                            <p>Dispositivo</p>
                            
                        </div>
                        <div className={styles.contentStatus}>
                            <div className={styles.status}></div>
                            <icon.AiOutlineRight size={20}/>
                        </div>
                        
                        {/* <button>testar dispositivo</button> */}
                    
                    </div></li>
                    <li><div className={styles.device}>
                        <div className={styles.content}>
                            <icon.AiFillAlert className={styles.icon} size={20}/>
                            <p>Dispositivo</p>
                            
                        </div>
                        <div className={styles.contentStatus}>
                            <div className={styles.status}></div>
                            <icon.AiOutlineRight size={20}/>
                        </div>
                        
                        {/* <button>testar dispositivo</button> */}
                    
                    </div></li>
                    <li><div className={styles.device}>
                        <div className={styles.content}>
                            <icon.AiFillAlert className={styles.icon} size={20}/>
                            <p>Dispositivo</p>
                            
                        </div>
                        <div className={styles.contentStatus}>
                            <div className={styles.status}></div>
                            <icon.AiOutlineRight size={20}/>
                        </div>
                        
                        {/* <button>testar dispositivo</button> */}
                    
                    </div></li>
                    
                </ul>
            </div>
        )
    }
}