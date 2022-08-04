import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { getProducts } from "../../../redux/actions";
import apiInstance from "../../../services/apiAxios";
import styles from './cardProduct.module.css'

export default function MenuDesplegable( { id, status } ) {
    const [ active, setActive ] = useState(false)
    let dispatch = useDispatch()
    const navigate = useNavigate()

    async function habilitarProducto(){
        const response = await apiInstance.delete(`/producto/${id}?status=ennabled`)
        dispatch(getProducts({}, ''))
    }

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
                        <NavLink className={styles.link} 
                        to={`/admin/editarProducto/${id}`}>Editar</NavLink>
                        </li>
                        <li className={styles.liContainer}>
                            {status === 'disabled' ?
                                <button
                                className={styles.link}
                                onClick={() => {
                                    habilitarProducto()
                                    setActive(!active)
                                }}
                            >
                                Habilitar
                            </button>
                            : <button
                                className={styles.link}
                                onClick={() => {
                                    navigate(`eliminar/${id}`)
                                    setActive(!active)
                                    }}
                            >
                                Deshabilitar
                            </button>}
                        </li>
                    </ul>
                </nav>}
        </div>
    )
}