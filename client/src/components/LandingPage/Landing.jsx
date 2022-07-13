import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from './Landing.module.css';

export default function Landing(){
    return(
            <div className={styles.landingImg}>
                <h1 className= {styles.logo}>DAVO SHOES</h1>
                <NavLink className={styles.navHome} to ='/home'>INICIO</NavLink>
            </div>
    )
}