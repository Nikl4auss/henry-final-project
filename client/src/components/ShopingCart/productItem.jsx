import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { useLocalStorage } from "../../services/useStorage"
import styles from "./productItem.module.css"
import { setOrder } from "../../redux/actions"

function ProductItem ({id, color, size, quantity, stock}) {
//me llega un array de objetos, así: [0: {id: 225, stock_product: 5, SizeId: 12, MainColorId: 11, StoreId: 1, ProductId: 15}  
const [product, setProduct] = useState({})
const [cantidad, setCantidad] = useState(quantity)


    const getStock = async function (id) {
        try{
            const stockBD = await axios.get(`http://localhost:3001/stock/${id}`)
            let allStock = stockBD.data
            return allStock 
        } catch(error) {
            console.log("este es el error "+error)
        }
    }

    useEffect(() => {
        getStock(id).then(data => setProduct(data))
        setOrder({
            title: product?.Product.name,
            unit_price: product?.Product.price * cantidad,
            quantity: cantidad,
        })
    },[id,cantidad])
  
    function oneMore (e) {
        e.preventDefault()
        if(cantidad < stock) setCantidad(cantidad + 1)
    }

    function oneLess (e) {
        e.preventDefault()
        if(cantidad > 1) setCantidad(cantidad - 1)
    }

    function clearCart () {
    }

    return (<div>{
        product.id ? 
            <div className={styles.cardCart}>
                <h3>{product?.Product.name}</h3>
                <h3>${product?.Product.price}.00</h3>
                <div className={styles.conteinerQuantity}>
                    <h3>Cantidad: {cantidad}</h3>
                    <div className={styles.containerBttn}>
                        <button className={styles.button} onClick={oneMore}>+</button>
                        <button className={styles.button} onClick={oneLess}>-</button>
                    </div>
                </div>
                <div>Subtotal: ${product?.Product.price * cantidad}.00</div>
            </div>
         : <div>loading</div>
    }</div>
    )
}

export default React.memo(ProductItem)