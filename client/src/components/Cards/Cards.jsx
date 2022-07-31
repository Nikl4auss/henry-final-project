import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/actions";
import verifyStock from "../../services/verifyStock";
import Card from "../Card/Card";
import styles from './cards.module.css'


function Cards () {
    let products = useSelector(state => state.products)
    
    const pages = useSelector(state => state.pages)
    const filters = useSelector(state => state.filters)
    const name = useSelector(state => state.name)
    const error = useSelector(state => state.error)
    let dispatch = useDispatch()
    
    useEffect(() => {
        if(products.length > 0) return;
    
        else dispatch(getProducts(filters, name))
    return products = []
    }, [dispatch, filters, name, products])
    
    const arrayPage = useMemo(()=>{
        products = products.filter((product)=>verifyStock(product.Stocks))
        return products.slice(pages.firstValue, pages.lastValue)
    }, [pages, products])
    return(
        <div className={styles.divCards}>
            {error.length ? <div>{error}</div> : undefined}
            <div className={styles.divProducts}>
                {arrayPage?.map(product => {
                    
                    if(product.Stocks.length === 0 ) return undefined;
                    return <Card 
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        image={product.images[0].image}
                        price={product.price}
                        brand={product.brand}
                        stock={product.Stocks}
                    />
                })}
            </div>
        </div>
    )
}

export default React.memo(Cards)