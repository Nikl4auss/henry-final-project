import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from './Landing.module.css';

export default function Landing(){
    return(
            <div className={styles.landingImg}>
                <div className={styles.logo}>
                <a href="http://localhost:3000/home">
                    <img width="400" height="140" src="https://res.cloudinary.com/davoshoes/image/upload/v1658524699/LOGO/davo_shoes_1000_500_px_rxlpz2.png"/>
                </a>
                </div>                <NavLink className={styles.navHome} to ='/home'>INICIO</NavLink>
            </div>
    )
}