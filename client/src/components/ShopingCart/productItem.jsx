import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { useLocalStorage } from "../../services/useStorage"
import styles from "./productItem.module.css"
import { setOrder } from "../../redux/actions"
import {API_URL} from '../../utils/config.js'
import { BsChevronUp, BsChevronDown } from "react-icons/bs";

function ProductItem({ id, price, quantity, stock, name }) {
    let dispatch = useDispatch()
    const [product, setProduct] = useState({})
    const [cantidad, setCantidad] = useState(quantity)
    const order = useSelector(state => state.order)
    const [cart, setCart] = useLocalStorage('cart')

    const getStock = async function (id) {
        try { 
            const stockBD = await axios.get(`${API_URL}/stock/${id}`)
            let allStock = stockBD.data
            return allStock
        } catch (error) {
            console.log("este es el error " + error)
        }
    }

    useEffect(() => {
        getStock(id).then(data => setProduct(data))
    }, [id])

    function oneMore(e) {
        e.preventDefault()
        if (cantidad < stock) {
            let orderFiltered = []
            order.forEach(prod => {
                if (prod.id === id) {
                    orderFiltered.push({
                        id: id,
                        title: name,
                        unit_price: price,
                        quantity: cantidad + 1,
                        stock_product: stock
                    })
                } else {
                    orderFiltered.push(prod)
                }
            })
            dispatch(setOrder(orderFiltered))
            setCantidad(cantidad + 1)
        }
    }

    function oneLess(e) {
        e.preventDefault()
        if (cantidad > 1) {
            let orderFiltered = []
            order.forEach(prod => {
                if (prod.id === id) {
                    orderFiltered.push({
                        id: id,
                        title: name,
                        unit_price: price,
                        quantity: cantidad - 1,
                        stock_product: stock
                    })
                } else {
                    orderFiltered.push(prod)
                }
                dispatch(setOrder(orderFiltered))
                setCantidad(cantidad - 1)
            })
        }
    }

    function productDeleted() {
        let cartFilter = cart.filter(prod => prod.id !== id)
        let orderFilter = order.filter(prod => prod.id !== id)
        setCart(cartFilter)
        dispatch(setOrder(orderFilter))
    }

    return (
    <div className={styles.cardGrid}>
        {
            product?.id ?
                <div className={styles.cardCart}>
                    <div className={styles.line1}>
                        <h3 className={styles.cardName}>{product?.Product.name}</h3>
                        {/* <div>{product?.Image_Product.image}</div> */}
                        <h3 className={styles.cardPrice}>${product?.Product.price}</h3>
                    </div>
                    
                    <div className={styles.line2}>
                        <div className={styles.conteinerQuantity}>
                            <h3>Cantidad: {cantidad}</h3>
                            <div className={styles.containerBttn}>
                            <button className={styles.button} onClick={oneMore}><BsChevronUp /></button>
                            <button className={styles.button} onClick={oneLess}><BsChevronDown /></button>
                        </div>
                    </div>
                    <div className={styles.cardSubtotal}>Subtotal:  ${product?.Product.price * cantidad}.00</div>
                    </div>
                    <div className={styles.cardDeleteCont}>
                        <button className={styles.cardDelete}
                        onClick={(e) => productDeleted(e)}>Eliminar producto</button>
                    </div>
                </div>
                : <div>loading</div>
        }
    </div>
    )
}

export default React.memo(ProductItem)