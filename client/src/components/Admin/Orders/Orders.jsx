import React, { useEffect } from "react"
import { useState } from "react"
import { NavLink } from "react-router-dom"
import { getOrders } from "../../../services/productsServices"
import styles from './Orders.module.css'


export default function Orders() {
    const [ orders, setOrders ] = useState([])

    useEffect(() => {
        getOrders().then(data => setOrders(data))
    }, [])

    return (
        orders?.length > 0 ?
            orders.map(order => {
                return (
                    <div className={styles.container}>
                        <div className={styles.interContainer}>
                            <div className={styles.divPrice}>
                                <h2>Orden N°: {order.id}</h2>
                                <h4>Total: ${order.totalPrice}</h4>
                            </div>
                            <div className={styles.divPrice}>
                                <span>Entrega: {order.status}</span>
                                <span>Estado de pago: {order.payment_status}</span>
                            </div>
                                <NavLink 
                                    className={styles.link}
                                    to={`${order.id}`}
                                >
                                    Ver orden
                                </NavLink>
                        </div>
                    </div>
                )
            }) : <div className={styles.loading}>Cargando...</div>
    )
}