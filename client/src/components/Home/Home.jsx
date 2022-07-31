import React from "react";
import { useSelector } from "react-redux";

import Filters from "../Filters/Filters";
import Cards from "../Cards/Cards";
import styles from './Home.module.css';
import Paginado from "../Paginado/Paginado";


export default function Home() {
    let products = useSelector(state => state.products)

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