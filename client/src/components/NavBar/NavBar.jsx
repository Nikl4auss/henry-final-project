import SearchBar from '../SearchBar/SearchBar'
import styles from './NavBar.module.css'



export default function NavBar(){
    return(
        <nav>
            <div>
                <div className={styles.logo}>
                    <h4>Davo Shoes</h4>
                </div>
                <SearchBar/>
                <p>Envío gratis en 24hs a partir de $10.000</p>
            </div>
            <ul>
                <li><a href='styles'>Categorías</a></li>
                <li><a href='styles'>Género</a></li>
                <li><a href='styles'>Marcas</a></li>
            </ul>
            <ul>
                <li><a href='styles'>Creá tu cuenta</a></li>
                <li><a href='styles'>Iniciar sesión</a></li>
                <li><a href='styles'>Favoritos</a></li>
                <li><a href='styles'>Carrito</a></li>
                {/*<li><button><i class="fas fa-bell"></i></button></li>*/}
            </ul>
        </nav>
    )
}