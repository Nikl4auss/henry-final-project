import { Outlet, useNavigate, Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
// import { ShopingCart } from '../ShopingCart/ShopingCart';
import styles from "./NavBar.module.css";
import LoginButton from "../LoginButton/LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../LogoutButton/LogoutButton";

//import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
//import {} from '@fortawesome/free-solid-svg-icons'

export default function NavBar() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth0();

  function clickToShopingCart() {
    navigate("/carrito");
  }

  function clickToShopingCart() {
    navigate("/carrito");
  }

  function clickToHome() {
    navigate("/home");
  }
  return (
    <div>
      <nav className={styles.navbarContainer}>
        <div className={styles.divTop}>
          <div className={styles.logo}>
            <Link to="/home">
              <img
                width="200"
                height="70"
                src="https://res.cloudinary.com/davoshoes/image/upload/v1658524699/LOGO/davo_shoes_1000_500_px_rxlpz2.png"
                alt="page logo"
              />
            </Link>
          </div>
          <SearchBar />
          <button className={styles.btnNav} onClick={clickToShopingCart}>
            Mi carrito
          </button>
          {/* <p className={styles.envío}>Envío gratis en 24hs a partir de $10.000</p> */}
          {isAuthenticated ? (
            <div className={styles.userLoginLogout}>
              <div className={styles.userLogin}>
                <img
                  src={user.picture}
                  alt="profile"
                  className={styles.pictureUser}
                />
                <p>{user.name}</p>
              </div>
              <LogoutButton />
            </div>
          ) : (
            <LoginButton />
          )}
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
      <Outlet />
    </div>
  );
}
