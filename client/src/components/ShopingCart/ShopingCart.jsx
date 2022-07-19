import axios from "axios";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from 'react-router-dom'
import { setOrder } from "../../redux/actions";
import { useLocalStorage } from "../../services/useStorage";
import { API_URL } from "../../utils/config";
import ProductItem from "./productItem";
import { useAuth0 } from "@auth0/auth0-react";

const producto = [{
    id: 234,
    stock_product: 3,
    Size: { name: "11" },
    MainColor: { name: "rojo" },
    quantity: 1
},
{
    id: 236,
    stock_product: 3,
    Size: { name: 111 },
    MainColor: { name: 8 },
    quantity: 2
},
{
    id: 459,
    stock_product: 5,
    Size: { name: 111 },
    MainColor: { name: 5 },
    quantity: 3
}]

export function ShopingCart() {
    const { loginWithRedirect, isAuthenticated } = useAuth0()
    let dispatch = useDispatch()
    const [cart, setCart] = useLocalStorage("cart")
    const order = useSelector(state => state.order)
    console.log(order)
    let arrayOrder = []
    let total = useMemo(() => {
        let count = 0
        order.forEach(pr => count = count + (pr.unit_price * pr.quantity))
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

    function redirectToPay(e) {
        if(isAuthenticated) {
            axios.post(`http://localhost:3001/payment`, {
                itemsCart: order,
                idOrder: 15
            })
            .then(response =>  {
                window.location.href = response.data
            })
        }   else {
            loginWithRedirect()
        }
    }

    function clearCart(e) {
        e.preventDefault()
        dispatch(setOrder([]))
        setCart([])
    }

    return (
        <div>
            <div>
                {order?.map((element) => <ProductItem
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

