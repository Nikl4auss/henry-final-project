import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Landing.module.css';
import { useAuth0 } from "@auth0/auth0-react";

export default function Landing() {
    const { user, isAuthenticated } = useAuth0();
    const { loginWithRedirect, logout } = useAuth0()



    return (
        <div className={styles.landingImg}>
            <div className={styles.logo}>
                <a href="http://localhost:3000/home">
                    <img width="400" height="140" src="https://res.cloudinary.com/davoshoes/image/upload/v1658524699/LOGO/davo_shoes_1000_500_px_rxlpz2.png" />
                </a>
            </div>
            {isAuthenticated ? 
            (<><button type='button' className={styles.ingresa} onClick={() => logout()}>CERRAR SESIÓN</button>
            <NavLink className={styles.invitado} to='/home'>INICIO</NavLink></>)
           : 
           (<><button type='button' className={styles.ingresa} onClick={() => loginWithRedirect()}>INICIAR SESIÓN</button>
           <NavLink className={styles.invitado} to='/home'>INVITADO</NavLink></>)
            }
        </div>
    )
}