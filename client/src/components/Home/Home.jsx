import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart, getProducts, setProducts } from "../../redux/actions";
import NavBar from "../NavBar/NavBar";
import Filters from "../Filters/Filters";
import Footer from "../Footer/Footer";
import Cards from "../Cards/Cards";
import styles from './Home.module.css';
import Paginado from "../Paginado/Paginado";
import { useLocalStorage } from "../../services/useStorage";
import { useAuth0 } from "@auth0/auth0-react";
import { Loader } from "../Admin/loader";
import Loading from "../Loading/Loading";
import { Outlet } from "react-router-dom";


export default function Home() {
    let products = useSelector(state => state.products)
    const [ cart ] = useLocalStorage('cart')
    
    let dispatch = useDispatch()
    const { user, loginWithRedirect, isAuthenticated } = useAuth0()

    useEffect(() => {
        if(isAuthenticated) {
            dispatch(getCart(user.sub))
        }

       
    }, [dispatch, isAuthenticated])

    return (
        <div className={styles.homeGrid}>
            <div className={styles.filtersContainer}>
                <Filters />
            </div>

            <div>
                <div className={styles.cardsContainer}>
                    {products.length === 0 ? <Loading /> : <Cards />}
                </div>
                <Paginado />
                <Outlet />
            </div>
            <div className={styles.footerContainer}>
                <Footer />
            </div>
        </div>
    )
}