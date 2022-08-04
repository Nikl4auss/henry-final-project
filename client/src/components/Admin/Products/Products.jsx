import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProducts, setProducts } from "../../../redux/actions"
import CardProduct from "../CardProduct/CardProduct"
import Paginado from '../../Paginado/Paginado'
import styles from './Products.module.css'
import { Outlet } from "react-router-dom"


export default function Products (){
    const products = useSelector(state => state.products)
    const pages = useSelector(state => state.pages)
    const name = useSelector(state => state.name)
    let dispatch = useDispatch()
  
    useEffect(() => {
        if(products.length > 0) return;
        else dispatch(getProducts({}, name))
    }, [dispatch,name, products])

    const arrayPage = useMemo(()=>{
        return products.slice(pages.firstValue, pages.lastValue)
    }, [pages, products])

    return (
        <div>
            <div className={styles.title}>Lista de productos</div>
            {arrayPage?.map(prod => {
                return <CardProduct 
                image={prod.images[0].image}
                name={prod.name}
                price={prod.price}
                brand={prod.Brand.name}
                model={prod.model}
                id={prod.id}
                update={prod.updateDate}
                status={prod.status}
                />
            })}
            <Paginado />
            <Outlet />
        </div>
    )
}
