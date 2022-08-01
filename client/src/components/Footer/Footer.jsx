import React from 'react'
import { FaFacebook, FaInstagram, FaGooglePlusG } from 'react-icons/fa'
import styles from './Footer.module.css'

function Footer() {

return (
    <div className= {styles.containerFooter}>
        <footer>
            <div className={styles.logoFooter}>
                <img src="img/davoShoes.jpeg" alt=""></img>
            </div>
            <div className={styles.redesFooter}>
                <a href="#"><FaFacebook /></a>
                <a href="#"><FaInstagram /></a>
                <a href="#"><FaGooglePlusG /></a>
            </div>
            <hr />
            <h4>Davo Shoes- Todos los Derechos Reservados</h4>
            <hr />
        </footer>

    </div>
)

}


export default Footer;
