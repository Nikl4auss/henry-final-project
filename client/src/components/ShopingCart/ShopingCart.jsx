//import axios from "axios";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOrder } from "../../redux/actions";
import { useLocalStorage } from "../../services/useStorage";
import ProductItem from "./productItem";
import { useAuth0 } from "@auth0/auth0-react";
import { payCart } from "../../services/shopingCart";
import Shipping from "../Payment/Shipping";
import { useNavigate, Link } from "react-router-dom";
import styles from './ShoppingCart.module.css';
import { IoMdClose } from "react-icons/io";


export function ShopingCart() {
    const navigate = useNavigate();
    const { loginWithRedirect, isAuthenticated } = useAuth0()
    let dispatch = useDispatch()
    const [cart, setCart] = useLocalStorage("cart")
    const order = useSelector(state => state.order)
    let arrayOrder = []
    let total = useMemo(() => {
        let count = 0
        order.forEach(pr => count = count + (pr.unit_price * pr.quantity))
        return count
    }, [order])

    let articulos = useMemo(() => {
        let count = 0
        order.forEach(pr => count = count + pr.quantity)
        return count
    }, [order])

    cart.forEach(product => {
        arrayOrder.push({
            stock_product: product.stock_product,
            id: product.id,
            title: product.name,
            unit_price: product.price,
            quantity: product.quantity,
        })
    });

    useEffect(() => {
        dispatch(setOrder(arrayOrder))
    }, [dispatch])

    async function redirectToPay(e) {
        if (total > 0) {
            if (isAuthenticated) {

                navigate('/checkout')
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
                loginWithRedirect()
            }
        }
    }

    function clearCart(e) {
        e.preventDefault()
        dispatch(setOrder([]))
        setCart([])
    }

    return (
        <div className={styles.grid}>
            <div className={styles.cartTitle}>
                <h1 className={styles.title}>Tu carrito</h1>
                <h1 className={styles.quantity}>({articulos} productos)</h1>
            </div>
            <div className={styles.divClose}>
                <Link to= '/home'>
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

