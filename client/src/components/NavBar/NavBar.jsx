import { Outlet, useNavigate, Link, NavLink } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
// import { ShopingCart } from '../ShopingCart/ShopingCart';
import styles from "./NavBar.module.css";
import LoginButton from "../LoginButton/LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../LogoutButton/LogoutButton";
import { useLocalStorage } from "../../services/useStorage";
import apiInstance from "../../services/apiAxios";
import MenuUser from "../MenuUser/MenuUser"

//import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
//import {} from '@fortawesome/free-solid-svg-icons'

export default function NavBar() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth0();
  const [cart, setCart] = useLocalStorage('cart')


  function clickToShopingCart() {
    if (isAuthenticated) {
      if (cart) {
        cart.forEach(async pr => {
          await apiInstance.post(`/line_cart/${pr.id}`, {
            id_Cart: user.sub,
            quantity: pr.quantity
          })
        })
        setCart([])
      }
    }
    navigate("/carrito");
  }

  function clickToShopingCart() {
    if (isAuthenticated) {
      if (cart.length > 0) {
        cart.forEach(async pr => {
          await apiInstance.post(`/line_cart/${pr.id}`, {
            id_Cart: user.sub,
            quantity: pr.quantity
          })
        })
        setCart([])
      }
    }
    navigate("/carrito");
  }

  function clickToHome() {
    navigate("/inicio");
  }

  return (
    <div>
      <nav className={styles.navbarContainer}>
        <div className={styles.divTop}>
          <div className={styles.logo}>
            <Link to="/inicio">
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
          {isAuthenticated ? <NavLink className={styles.btnNav} to='/admin' >Admin</NavLink> : undefined}
          {/* <p className={styles.envío}>Envío gratis en 24hs a partir de $10.000</p> */}
          {isAuthenticated ? (
            <div>
              <MenuUser />
            </div>
          ) : (
            <LoginButton />
          )}
        </div>
      </nav>
      <Outlet />
    </div>
  );
}
