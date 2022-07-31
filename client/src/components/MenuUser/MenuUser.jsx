import React, { useState } from "react";
import LogoutButton from "../LogoutButton/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "../MenuUser/MenuUser.module.css";
import { useNavigate } from "react-router-dom";

function MenuUser () {
    const { user } = useAuth0();
    const navigate = useNavigate()
    const [visible, setVisible] = useState(false)

    function openCloseMenu (e) {
        e.preventDefault()
        console.log("este de aqui "+ visible)
        setVisible(!visible)
    }

    function goToUserDashboard () {
        navigate("/userDashboard")
        setVisible(!visible)
    }

    function goToUserOrders () {
        navigate("/userOrders")
        setVisible(!visible)
    }

    return (
        <div>
           <p className={styles.btnNav} onClick={ openCloseMenu }>{user.name}</p>
                <ul className={ visible ? styles.showMenu : styles.hideMenu }>
                    <button className={styles.item} onClick={goToUserDashboard}>Mi perfil</button>
                    <button className={styles.item} onClick={goToUserOrders}>Mis pedidos</button>
                    <LogoutButton />
                </ul>
        </div>
    )
}

export default MenuUser