import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import styles from './OrdersByUser.module.css'
import { setIdOrder, setOrder } from "../../redux/actions";
import { getOrdersByUser, putOrder } from "../../services/productsServices";

export default function Menu({ order, setOrders, user }) {
    const navigate = useNavigate();
    const [active, setActive] = useState(false);
    let dispatch = useDispatch()

    const orderToPay = order.Line_orders.map(el => {
        return {
            name: el.Stock.Product.name,
            price: el.Stock.Product.price,
            quantity: el.quantity
        }
    })

    function goCheckout() {
        dispatch(setIdOrder({ orderId: order.id }))
        dispatch(setOrder(orderToPay))
        navigate('/checkout')
    }

    function cancelOrder() {
        putOrder(order.id, 'Cancelada', '').then(data => {
            console.log(data)
            getOrdersByUser(user?.sub).then(data => setOrders(data))
            setActive(!active)
        }
        )
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
                        <NavLink
                            className={styles.link}
                            to={`${order.id}`}
                        >
                            Ver Detalle
                        </NavLink>
                    </li>
                    {order.payment_status === 'pending' && order.status !== 'Cancelada' ?
                        <>
                            <li className={styles.liContainer}>
                                <button 
                                className={styles.link}
                                onClick={goCheckout}>
                                    Pagar
                                </button>
                            </li>
                            <li className={styles.liContainer}>
                                <button 
                                className={styles.link}
                                onClick={cancelOrder}>
                                    Cancelar
                                </button>
                            </li>
                        </>
                        : undefined}

                </ul>
            </nav>}
        </div>
    )
}