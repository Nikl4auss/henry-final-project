import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions";
import NavBar from "../NavBar/NavBar";
import Filters from "../Filters/Filters";
import Cards from "../Cards/Cards";
import styles from './Home.module.css';
import { Outlet } from "react-router-dom";
import { useSessionStorage } from "../../services/useStorage";

export default function Home(){
    let nameSearched = useSelector(state => state.name)
    let filtersSelected = useSelector(state => state.filtersSelected)
    const dispatch = useDispatch();

    const [filtersToApply] = useSessionStorage('filtersSelected', filtersSelected)
    const [ name ] = useSessionStorage('filtersSelected', nameSearched)

    useEffect(()=> {
        dispatch(getProducts(filtersToApply, name))
    }, [dispatch])

    return (
        <div className={styles.homeGrid}>
            <div className={styles.filtersContainer}>
            <Filters />
            </div>
            <div className={styles.cardsContainer}>
            <Cards />
            </div>
        </div>
    )
}