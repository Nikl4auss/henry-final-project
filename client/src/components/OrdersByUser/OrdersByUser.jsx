import { useAuth0 } from "@auth0/auth0-react"
import React, { useEffect } from "react"
import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { getOrdersByUser } from "../../services/productsServices"
import traslate from "../../services/traslate"
import Loading from "../Loading/Loading"
import Menu from "./Menu"
import styles from './OrdersByUser.module.css'


export default function OrdersByUser() {
    const [orders, setOrders] = useState([])
    const { user } = useAuth0()

    useEffect(() => {
        getOrdersByUser(user?.sub).then(data => setOrders(data))

        return () => {
            setOrders([])
        }
    }, [])

    console.log(orders)
    function createdAtDay(date) {
        const dateArray = date.split('T')
        const dateModified = dateArray[0].split('-')
        return `${dateModified[2]}/${dateModified[1]}/${dateModified[0]}`
    }

    return (
        <div className={styles.generalContainer}>
            <h1 className={styles.title}>Mis pedidos:</h1>
            {orders?.length > 0 ?
                orders.map(order => {
                    return (
                        <div className={styles.container}>
                            <div>
                                <h2>Orden N°: {order.id}</h2>
                                {order.payment_status === 'pending' && order.status !== 'Cancelada'
                                ? undefined 
                                : <p>Estado de la orden: {order.status}</p>}
                                {order.status === 'Cancelada' ? undefined 
                                : <p>Estado de pago: {traslate(order.payment_status)}</p>}
                            </div>
                            <div>
                                <h1>Total: ${order.totalPrice}</h1>
                                <div>
                                    <span>Última modificación: </span>
                                    <span>{createdAtDay(order.updatedAt)}</span>
                                </div>
                            </div>
                            <Menu
                                order={order}
                                setOrders={setOrders}
                                user={user}
                            />
                        </div>
                    )
                }) : <Loading />}
        </div>
    )
}