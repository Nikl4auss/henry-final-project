import React, { useEffect } from "react"
import { useState } from "react"
import { NavLink } from "react-router-dom"
import { getOrders } from "../../../services/productsServices"
import { useSessionStorage } from "../../../services/useStorage"
import styles from './Orders.module.css'


export default function Orders() {
    const [orders, setOrders] = useState([])
    const [filterOrders, setFilterOrders] = useSessionStorage('filterOrder', 'empty')
    const [filterPayment, setFilterPayment ] = useSessionStorage('filterPayment', 'empty')

    useEffect(() => {
        getOrders(filterOrders, filterPayment).then(data => setOrders(data))
    }, [])

    function handleSelect(e) {
        e.preventDefault()
        getOrders(e.target.value, filterPayment).then(data => setOrders(data))
        setFilterOrders(e.target.value)
    }

    function handleSelectPayment(e) {
        e.preventDefault()
        getOrders(filterOrders, e.target.value).then(data => setOrders(data))
        setFilterPayment(e.target.value)
    }


    return (
        <div className={styles.allContainer}>
            <div>
                <select name='select' defaultValue={filterOrders} onChange={handleSelect}>
                    <option value='empty' disabled hidden>Estado de entrega</option>
                    <option value='Todos'>Todos</option>
                    <option value='Pendiente'>Pendiente</option>
                    <option value='Despachado'>Despachado</option>
                    <option value='Entregado'>Entregado</option>
                    <option value='Cancelado'>Cancelado</option>
                    <option value='Devuelto'>Devuelto</option>
                </select>
                <select name='select' defaultValue={filterPayment} onChange={handleSelectPayment}>
                    <option value='empty' disabled hidden>Estado de pago</option>
                    <option value='Todos'>Todos</option>
                    <option value='approved'>Aprobado</option>
                    <option value='pending'>Pendiete</option>
                    <option value='failure'>Fallado</option>
                </select>
            </div>
            {orders?.length > 0 ?
                orders.map(order => {
                    return (
                        <div className={styles.container}>
                            <div className={styles.interContainer}>
                                <div className={styles.divPrice}>
                                    <h2>Orden N°: {order.id}</h2>
                                    <h4>Total: ${order.totalPrice}</h4>
                                </div>
                                <div className={styles.divPrice}>
                                    <span>Estado de entrega: {order.status}</span>
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
                })
                : <div className={styles.loading}>Cargando...</div>}
        </div>
    )
}