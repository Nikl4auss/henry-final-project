import { useEffect } from "react"
import { useState } from "react"
import { IoArrowBackOutline } from "react-icons/io5"
import { Link, NavLink, useParams } from "react-router-dom"
import apiInstance from "../../services/apiAxios"
import Loading from "../Loading/Loading"
import styles from './DetailOrder.module.css'

export default function DetailOrder() {
    const { id } = useParams()
    const [order, setOrder] = useState({})

    useEffect(() => {
        apiInstance.get(`/order/${id}`).then(response => setOrder(response.data))

        return () => {
            setOrder({})
        }
    }, [])

    console.log(order)

    return (

        <div className={styles.container}>
            <NavLink
                className={styles.back}
                to='/misordenes'><IoArrowBackOutline /> Volver</NavLink>
            {order.id ?
                order.Line_orders?.map(prod => {
                    return (
                        <div className={styles.divContainerProduct}>
                            <div className={styles.divInfoProduct}>
                                <Link to={`/producto/${prod.Stock.Product.id}`}>
                                    <img
                                        className={styles.image}
                                        src={prod.Stock.Product.images[0].image}
                                        alt="Producto" />
                                </Link>
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
                : <Loading />}
        </div>
    )
}