import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Landing.module.css';
import { useAuth0 } from "@auth0/auth0-react";
import img1 from './imgLanding/1.png'
import img2 from './imgLanding/2.png'

export default function Landing() {
    const { user, isAuthenticated } = useAuth0();
    const { loginWithRedirect, logout } = useAuth0()



    return (
        <div className={styles.landingImg}>
            <div className={styles.topbar}>
                <div className={styles.topbarItem}>
                    {/* <div className={styles.logo}>
                    <a href="http://localhost:3000/inicio">
                        <img width="250" height="140" src="https://res.cloudinary.com/davoshoes/image/upload/v1658524699/LOGO/davo_shoes_1000_500_px_rxlpz2.png" alt=""/>
                    </a>
                    </div>  */}
                    <div>
                    {isAuthenticated ? 
                    (<div className={styles.div1}>
                        <div className={styles.btn1}>
                        <button type='button' className={styles.ingresa} onClick={() => logout()}>CERRAR SESIÓN</button>
                        </div>
                        <div className={styles.btn1}>
                        <NavLink className={styles.invitado} to='/inicio'>INICIO</NavLink>
                        </div>
                    </div>)
                    : 
                    (<div className={styles.div1}>
                        <div className={styles.btn1}>
                        <button type='button' className={styles.ingresa} onClick={() => loginWithRedirect()}>INICIAR SESIÓN</button>
                        </div>
                        <div className={styles.btn1}>
                        <NavLink className={styles.invitado} to='/inicio'>INVITADO</NavLink></div>
                    </div>)
                    }
                    </div>
                </div>
                
            </div>
                <img src={img1} alt="" />
                <img src={img2} alt="" />
        </div>
    )
}