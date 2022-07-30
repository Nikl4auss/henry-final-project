//import axios from "axios";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart, setOrder } from "../../redux/actions";
import { useLocalStorage } from "../../services/useStorage";
import ProductItem from "./productItem";
import { useAuth0 } from "@auth0/auth0-react";
import { payCart } from "../../services/shopingCart";
import Shipping from "../Payment/Shipping";
import { useNavigate } from "react-router-dom";

export function ShopingCart() {
    const navigate = useNavigate();
    const { loginWithRedirect, isAuthenticated } = useAuth0()
    let dispatch = useDispatch()
    const [cart, setCart] = useLocalStorage("cart")
    const order = useSelector(state => state.order)
    const cartDB = useSelector(state => state.cart)
    let total = useMemo(() => {
        let count = 0
        order?.forEach(pr => count = count + (parseFloat(pr.price) * pr.quantity))
        return count
    }, [order])
    
    console.log(order)
    
    useEffect(() => {
        if(isAuthenticated) {
            dispatch(getCart('5s5f5s5s'))
        } else {
            dispatch(setOrder([...cart]))
        }
    }, [ dispatch ])

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
    function clearCart(e) {
        e.preventDefault()
        dispatch(setOrder([]))
        setCart([])
    }

    return (
        <div>
            <div>
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
            <div>
                <h1>Total:</h1>
                <h1>{total}</h1>
            </div>
            <button onClick={redirectToPay}>Pagar</button>
            <br />

            <button onClick={clearCart}>Borrar todo</button>
        </div>
    )
}

