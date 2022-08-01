import React from 'react'
import styles from './Footer.module.css'

function Footer() {

return (
    <div className= {styles.containerFooter}>
        <footer>
            <div className={styles.logoFooter}>
                <img src="img/davoShoes.jpeg" alt=""></img>
            </div>
            <div className={styles.redesFooter}>
                <a href="#"><i class="fa-brands fa-facebook"></i></a>
                <a href="#"><i class="fa-brands fa-instagram"></i></a>
                <a href="#"><i class="fa-brands fa-google-plus-g"></i></a>
            </div>
            <hr>
            <h4>Davo Shoes- Todos los Derechos Reservados</h4>
            </hr>
        </footer>

    </div>
)

}


export default Footer;