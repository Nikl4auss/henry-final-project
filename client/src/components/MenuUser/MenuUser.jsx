import React, { useState } from "react";
import LogoutButton from "../LogoutButton/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "../MenuUser/MenuUser.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { useEffect } from "react";
import { AUDIENCE } from '../../utils/config'

const roleCalimType = AUDIENCE + "/roles";

function MenuUser() {
  const { user, getIdTokenClaims } = useAuth0();
  const [isAdmin, setIsAdmin] = useState(false)
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    async function getRoles() {
      const claims = await getIdTokenClaims();
      return claims[roleCalimType] || [];
    }

    async function checkRoles() {
      const roles = await getRoles();
      if(roles[0] === 'Admin') setIsAdmin(true);
    }

    checkRoles();
  }, [getIdTokenClaims, navigate]);
  

  function openCloseMenu(e) {
    e.preventDefault();
    setVisible(!visible);
  }

  function goToUserDashboard() {
    navigate("/miperfil");
    setVisible(!visible);
  }

  function goToUserOrders() {
    navigate("/misordenes");
    setVisible(!visible);
  }

  return (
    <div>
      <p className={styles.btnNav} 
        onClick={openCloseMenu}
      >
        <FaUserAlt /> 
      </p>
      <ul className={visible ? styles.showMenu : styles.hideMenu}>
        <span className={styles.name}>{user.name}</span>
        {isAdmin ? <NavLink to='/admin' className={styles.item}>Admin</NavLink> :
        <>
          <button className={styles.item} onClick={goToUserDashboard}>
            Mi perfil
          </button>
          <button className={styles.item} onClick={goToUserOrders}>
            Mis pedidos
          </button>
        </>
        }
        <LogoutButton />
      </ul>
    </div>
  );
}

export default MenuUser;
