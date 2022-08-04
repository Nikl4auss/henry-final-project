import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import styles from './Orders.module.css'

export default function MenuDesplegable( { order, editActive, setEditActive } ) {
    const [ active, setActive ] = useState(false)

    return (
        <div>
            <button 
            className={styles.btnMenu}
            onClick={() => setActive(!active)}
            >
                <BsThreeDotsVertical />
            </button>
                {active && <nav className={styles.menuOptionsActive}>
                    <ul className={styles.ulStyle}>
                        <li className={styles.liContainer}>
                            <NavLink
                                className={styles.link}
                                to={`${order.id}`}
                            >
                                Ver
                            </NavLink>
                        </li>
                        <li className={styles.liContainer}>
                            <button onClick={() => {
                                setActive(!active)
                                setEditActive(!editActive)
                                }}>
                                Editar
                            </button>
                        </li>
                    </ul>
                </nav>}
        </div>
    )
}