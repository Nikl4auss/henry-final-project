import { Outlet, useNavigate, Link, NavLink } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./NavBar.module.css";
import LoginButton from "../LoginButton/LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
import MenuUser from "../MenuUser/MenuUser"
import { IoCartSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";

//import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
//import {} from '@fortawesome/free-solid-svg-icons'

export default function NavBar() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();
  const order = useSelector(state => state.order)

  console.log(order)


  function clickToShopingCart() {
    navigate("/carrito");
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
          <div className={styles.btnContainers}>
            <div className={styles.cartContainer}>
              <button className={styles.btnCart} onClick={clickToShopingCart}>
                <IoCartSharp />
              </button>
              {order.length ? <span className={styles.spanCart}>{order.length}</span> : undefined}
            </div>
            <NavLink to='/favoritos' className={styles.btnHeart}>
              <FaHeart />
            </NavLink>
            {isAuthenticated ? (
              <div>
                <MenuUser />
              </div>
            ) : 
                <LoginButton />
              }
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}
