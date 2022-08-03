//import axios from "axios";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart, setOrder } from "../../redux/actions";
import { useLocalStorage } from "../../services/useStorage";
import ProductItem from "./productItem";
import { useAuth0 } from "@auth0/auth0-react";
import { payCart } from "../../services/shopingCart";
import Shipping from "../Payment/Shipping";
import apiInstance from "../../services/apiAxios";
import { useNavigate, Link } from "react-router-dom";
import styles from './ShoppingCart.module.css';
import { IoMdClose } from "react-icons/io";
import { IoFolder } from "react-icons/io5";
import productItem from "./productItem";

export function ShopingCart() {
    const navigate = useNavigate();
    const { user, loginWithRedirect, isAuthenticated } = useAuth0()
    let dispatch = useDispatch()
    const [cart, setCart] = useLocalStorage("cart")
    const order = useSelector(state => state.order)
    const cartDB = useSelector(state => state.cart)
    let total = useMemo(() => {
        let count = 0
        order?.forEach(pr => count = count + (parseFloat(pr.price) * pr.quantity))
        return count
    }, [order])


    let articulos = useMemo(() => {
        let count = 0
        if(order.length === 0) return 0
        order?.forEach(pr => count = count + pr.quantity)
        return count
    }, [order])

    useEffect(() => {
        if(isAuthenticated) {
            dispatch(getCart(user.sub))
        } else {
            if(cart === undefined){
                setCart([])
            } else dispatch(setOrder([...cart]))
        }
    }, [ dispatch ])

    async function redirectToPay(e) {
        if (order?.length > 0) {
            if (isAuthenticated) {
                const orderCreated = await apiInstance.post('line_order', {
                    totalPrice: total,
                    status: 'Pendiente',
                    //payment_status: 'Pendiente',
                    idUser: user.sub,
                    products: order.map(prod => {
                        return {
                            id_stock: prod.id,
                            quantity: prod.quantity
                        }
                    })
                })
                if(orderCreated.data){
                    await apiInstance.delete(`cart/${user.sub}`)
                    navigate('/checkout')
                }


                // const data = await payCart(order, 15)
                // console.log(data)
                // window.location.href = data
                // axios.post(`http://localhost:3001/payment`, {
                //     itemsCart: order,
                //     idOrder: 15
                // })
                // .then(response =>  {
                //     window.location.href = response.data
                // })
            } else {
                // var pathname = 'http://localhost:3000/checkout'
                loginWithRedirect({
                    // appState: {
                    //     redirectTo: pathname
                    // }
                })
            }
        }
    }

    console.log(order)
    async function clearCart(e) {
        e.preventDefault()
        if(isAuthenticated) {
            try {
                await apiInstance.delete(`/line_cart/all/${user.sub}`)
            } catch (error) {
                console.log(error)
            }
        } else {
            setCart([])
        }
        dispatch(setOrder([]))
    }

    return (
        <div className={styles.grid}>
            <div className={styles.cartTitle}>
                <h1 className={styles.title}>Tu carrito</h1>
                <h1 className={styles.quantity}>({order.length === 0 ? 0 : articulos} productos)</h1>
            </div>
            <div className={styles.divClose}>
                <Link to= '/inicio'>
                <button className={styles.buttonClose}><IoMdClose/></button>
                </Link>
        </div>
            <div className={styles.cartProducts}>
                {order?.map((element, i) => <ProductItem
                    key={i}
                    id={element.id}
                    quantity={element.quantity}
                    stock={element.stock_product}
                    name={element.title}
                    price={element.unit_price}
                />)
                }
            </div>
            <div className={styles.orderInfo}>
                <h1 className={styles.orderResumen}>Resumen del pedido</h1>
                    <h1 className={styles.cartSubtotal}>Subtotal:</h1>
                <div className={styles.cartTotal}>
                    <h1 className={styles.cartTotalTitle}>Total:</h1>
                    <h1 className={styles.cartTotalPrice}>${total}.00</h1>
                </div>
                <div className={styles.btnContainer}>
                <button onClick={redirectToPay} className={styles.buyBtn} >COMPRAR</button>
                </div>
                <br />
                <div className={styles.btnContainer}>
                    <button onClick={clearCart} className={styles.deleteCart}>Borrar el carrito</button>
                </div>
            </div>
        </div>
    )
}

