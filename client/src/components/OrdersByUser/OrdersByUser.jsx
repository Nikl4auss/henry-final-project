import { useAuth0 } from "@auth0/auth0-react"
import React, { useEffect } from "react"
import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { getOrdersByUser } from "../../services/productsServices"
import Loading from "../Loading/Loading"
import styles from './OrdersByUser.module.css'


export default function OrdersByUser() {
    const [ orders, setOrders ] = useState([])
    const { user } = useAuth0()

    useEffect(() => {
        getOrdersByUser(user.sub).then(data => setOrders(data))

        return () => {
            setOrders([])
        }
    }, [])

    console.log(orders)
    return (
        orders?.length > 0 ?
            orders.map(order => {
                return (
                    <div>
                    <div>
                        <h2>Orden N°: {order.id}</h2>
                        <p>Estado de envío: {order.status}</p>
                        <p>Estado de pago: {order.payment_status}</p>
                    </div>
                        <Link to={`${order.id}`}>Ver detalle de la orden</Link>
                    <h1>Total: ${order.totalPrice}</h1>
                </div>
                )
            }) : <Loading />
    )
}