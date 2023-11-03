import React, { Component } from "react";
import logo from "../img/logo.png"
import styles from "../style/topbar.module.css"
import * as icon from "react-icons/ai"


export default class Topbar extends Component {

    render() {
        return (
            <div className={styles.div}>
                <img src={logo} alt="" className={styles.img}/>

                <a href=""><div className={styles.menu}>
                    <icon.AiOutlineMenu color="white" size={30}/>
                </div></a>
            </div>
        )
    }
}

