import { Outlet } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'
import styles from './NavBar.module.css'
//import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
//import {} from '@fortawesome/free-solid-svg-icons'



export default function NavBar(){
    return(
        <div>
        <nav className={styles.navbarContainer}>
            <div className={styles.divTop}>
                <div className={styles.logo}>
                    <h4>Davo Shoes</h4>
                </div>
                <SearchBar/>
                <p className={styles.envío}>Envío gratis en 24hs a partir de $10.000</p>
            <button className={styles.btnNav}>Cargar Productos</button>
            </div>
            {/* <div className= {styles.menuGral}>
            <ul className= {styles.menu}>
                <li><button>Categorías</button></li>
                <li><button>Género</button></li>
                <li><button>Marcas</button></li>
            </ul>
            <ul className= {styles.menu2}>
                <li><button>Creá tu cuenta</button></li>
                <li><button>Iniciar sesión</button></li>
                <li><button>Favoritos</button></li>
                <li><button>Carrito</button></li>
            </ul>
            </div> */}
        </nav>
        <Outlet/>
    </div>
    )
}