import React, { useEffect, useMemo } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, setProducts } from "../../redux/actions";
import { useLocalStorage } from "../../services/useStorage";
import verifyStock from "../../services/verifyStock";
import Card from "../Card/Card";
import NotFound from "../NotFound/NotFound";
import styles from './cards.module.css'


function Cards () {
    let products = useSelector(state => state.products)
    const pages = useSelector(state => state.pages)
    const filters = useSelector(state => state.filters)
    const name = useSelector(state => state.name)
    const error = useSelector(state => state.error)
    let dispatch = useDispatch()
    const [ cart, setCart ] = useLocalStorage('cart')
    const [ active, setActive ] = useState(false)

    useEffect(() => {
        if(!products.length > 0) {
            dispatch(getProducts(filters, name))
        }
        if(cart === undefined) setCart([])
        if(error.length){
            setActive(!active)
            setTimeout(() => {
                setActive(false)
            }, 10000)
        }
    }, [dispatch, filters, name, error])
    
    const arrayPage = useMemo(()=>{
        products = products?.filter((product) => verifyStock(product.Stocks))
        return products.slice(pages.firstValue, pages.lastValue)
    }, [pages, products])
    console.log(error)
    return(
        <div className={styles.divCards}>
            {active ? <div className={active ? styles.divError : undefined}> {error}</div> : undefined}
            <p className={styles.results}>{products.length} resultados</p>
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