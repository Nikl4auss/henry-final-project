import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { addPage } from '../../redux/actions';
import { GrNext, GrPrevious } from 'react-icons/gr'

// import { getProducts } from '../../actions';
import styles from './Paginado.module.css';



function Paginado() {
    let dispatch = useDispatch();
    // eslint-disable-next-line no-unused-vars
    const [products, setProducts] = useState();
    // const dispatch = useDispatch();
    const allProducts = useSelector((state) => state.products);
    const [currentPage, setCurrentPage] = useState(0);
    // eslint-disable-next-line no-unused-vars
    const [productsPerPage, setProductsPerPage] = useState(12);
    const firstItem = useSelector((state) => state.pages.firstValue)
    const pageNumbers = [];
    const [active, setActive] = useState(currentPage)

    let allPage = Math.ceil(allProducts?.length / productsPerPage)

    for (let i = 0; i <= allPage - 1; i++) {
        pageNumbers.push(i)
    };

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
    }

    const previous = function (setActive) {
        if (currentPage >= 1) {
            setCurrentPage(currentPage - 1);
            setActive(currentPage - 1)
            window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
        }
    };

    const next = function (setActive, allPage) {
        if (currentPage < allPage - 1) {
            setCurrentPage(currentPage + 1);
            setActive(currentPage + 1)
            window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
        }
    };

    useEffect(() => {
        dispatch(addPage({ firstValue: currentPage * productsPerPage, lastValue: currentPage * productsPerPage + productsPerPage }))

    }, [dispatch, currentPage]);


    useEffect(() => {
        if (firstItem === 0)
            setActive(0)
    }, [firstItem])

    return (
        <div className={styles.containerpagination} >
            <button className={styles.notActive} onClick={() => previous(setActive)}><GrPrevious /></button>
            <div className={styles.pagination}>
                {pageNumbers && pageNumbers.map((number) => (
                    <button className={number === active ? `${styles.active}` : `${styles.notActive}`}

                        onClick={() => {
                            setActive(number)
                            paginado(number)
                        }} key={number} >{number + 1}</button>
                ))}
            </div>
            <button className={styles.notActive} onClick={() => next(setActive, allPage)}><GrNext /></button>

        </div>


    )
}

export default Paginado;
