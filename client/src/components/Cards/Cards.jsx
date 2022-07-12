import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions";
import Card from "../Card/Card";
import styles from './cards.module.css'


function Cards () {
    const products = useSelector(state => state.products)
    const filters = useSelector(state => state.filters)
    const name = useSelector(state => state.name)
    const error = useSelector(state => state.error)
    let dispatch = useDispatch()

    useEffect(() => {
        if(products.length > 0) return;
        else dispatch(getProducts(filters, name))
    }, [dispatch, filters, name, products])

    return(
        <div className={styles.divCards}>
            {error.length ? <div>{error}</div> : undefined}
            <div className={styles.divProducts}>
                {products?.map(product => {
                    return <Card 
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        image={product.image}
                        price={product.price}
                    />
                })}
            </div>
        </div>
    )
}

export default React.memo(Cards)