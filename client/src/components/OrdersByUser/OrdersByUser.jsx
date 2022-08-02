import { useAuth0 } from "@auth0/auth0-react"
import React, { useEffect } from "react"
import { useState } from "react"
import { NavLink } from "react-router-dom"
import { getOrdersByUser } from "../../services/productsServices"
import styles from './OrdersByUser.module.css'


export default function Orders() {
    const [ orders, setOrders ] = useState([])
    const { user } = useAuth0()

    useEffect(() => {
        getOrdersByUser(user.sub).then(data => setOrders(data))
    }, [])

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
                    <div>
                        <h2>Detalle de productos</h2>
                        {
                            order.Line_orders?.map(prod => {
                                return (
                                    <div className={styles.divContainerProduct}>
                                        <div className={styles.divInfoProduct}>
                                            <img 
                                                className={styles.image}
                                                src={prod.Stock.Product.images[0].image}   
                                                alt="Producto" />
                                            <div className={styles.dates}>
                                                <h2>Nombre: {prod.Stock.Product.name}</h2>
                                                <p>Modelo: {prod.Stock.Product.model}</p>
                                                    <span>Talle: {prod.Stock.Size.name}</span>
                                                    <span>Color: {prod.Stock.MainColor.name}</span>
                                                    <span>Cantidad: {prod.quantity}</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <h1>Total: ${order.totalPrice}</h1>
                </div>
                )
            }) : <div>Cargando...</div>
    )
}