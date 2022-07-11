import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions";
import Card from "../Card/Card";
import styles from './cards.module.css'


export default function Cards () {
    console.log('Me estoy renderizando')
    const products = useSelector(state => state.products)
    const filters = useSelector(state => state.filters)
    const name = useSelector(state => state.name)
    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProducts(filters, name))
    }, [dispatch])



    return(
        <div className={styles.divCards}>
            {products.map(product => {
                return <Card 
                    id={product.id}
                    name={product.name}
                    image={product.image}
                    price={product.price}
                />
            })}
        </div>
    )
}