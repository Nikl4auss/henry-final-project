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
                <li><button>Categorías</button></li>
                <li><button>Género</button></li>
                <li><button>Marcas</button></li>
            </ul>
            <ul>
                <li><button>Creá tu cuenta</button></li>
                <li><button>Iniciar sesión</button></li>
                <li><button>Favoritos</button></li>
                <li><button>Carrito</button></li>
            </ul>
        </nav>
    )
}