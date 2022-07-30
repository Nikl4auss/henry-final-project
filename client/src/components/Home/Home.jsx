import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart, getProducts } from "../../redux/actions";
import NavBar from "../NavBar/NavBar";
import Filters from "../Filters/Filters";
import Cards from "../Cards/Cards";
import styles from './Home.module.css';
import Paginado from "../Paginado/Paginado";
import { useLocalStorage } from "../../services/useStorage";
import { useAuth0 } from "@auth0/auth0-react";


export default function Home() {
    let products = useSelector(state => state.products)
    const [ cart ] = useLocalStorage('cart')
    
    let dispatch = useDispatch()
    const { loginWithRedirect, isAuthenticated } = useAuth0()

    useEffect(() => {
        dispatch(getCart('5s5f5s5s'))
    }, [dispatch])

    return (
        <div className={styles.homeGrid}>
            <div className={styles.filtersContainer}>
                <Filters />
            </div>
            <div>
                <Paginado />
                <div className={styles.cardsContainer}>
                    {products.length === 0 ? 'Cargando...' : <Cards />}
                </div>
            </div>
        </div>
    )
}