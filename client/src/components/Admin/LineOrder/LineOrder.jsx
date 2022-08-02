import { useState } from "react"
import { useEffect } from "react"
import { IoArrowBackOutline } from "react-icons/io5"
import { NavLink, useParams } from "react-router-dom"
import { getOrder } from "../../../services/productsServices"
import styles from './lineOrder.module.css'


export default function LineOrder(){
    const { id } = useParams()
    const [ order, setOrder ] = useState({})
    

    useEffect(() => {
        getOrder(id).then(data => setOrder(data))
    }, [id])

    console.log(order)

    return (
        <div className={styles.container}>
            <NavLink 
            className={styles.back}
            to='/admin/ordenes'><IoArrowBackOutline /> Volver</NavLink>
            <div>
                <h1>Detalle de orden</h1>
                <div>
                    <h3>Orden N°: {order.id}</h3>
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
        </div>
    )
}