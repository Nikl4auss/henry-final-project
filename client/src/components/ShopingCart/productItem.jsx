import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProducts } from "../../actions"
import axios from "axios"
import { GET_STOCK } from "../../actions/actions_types"
import { useLocalStorage } from "../../services/useStorage"
import styles from "./productItem.module.css"

export function ProductItem ({id, color, size, quantity, stock}) {
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
    },[id])
    
    console.log(product)
  
    function oneMore (e) {
        e.preventDefault()
        setCantidad = cantidad + 1
    }

    function oneLess (e) {
        e.preventDefault()
        setCantidad = cantidad - 1
    }

    function clearCart () {
    }

    return (<div>{
        product.id ? 
            <div className={styles.cardCart}>
                <h3>{product?.Product.name}</h3>
                <h3>${product?.Product.price}.00</h3>
                <div className={styles.conteinerQuantity}>
                    <h3>Cantidad: {quantity}</h3>
                    <div className={styles.containerBttn}>
                        <button className={styles.button} onClick={oneMore}>+</button>
                        <button className={styles.button} onClick={oneLess}>-</button>
                    </div>
                </div>
                <div>Total: ${product?.Product.price * quantity}.00</div>
            </div>
         : <div>loading</div>
    }</div>
    )
}