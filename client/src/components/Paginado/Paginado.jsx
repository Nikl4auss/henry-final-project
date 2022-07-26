import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { addPage } from '../../redux/actions';

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

    const pageNumbers = [];
    const [active, setActive] = useState(currentPage)

    let allPage = Math.ceil(allProducts?.length / productsPerPage)

    for (let i = 0; i <= allPage-1; i++) {
        pageNumbers.push(i)
    };

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const previous = function (setActive) {
        if (currentPage >= 1) {
            setCurrentPage(currentPage - 1);
            setActive(currentPage - 1)
        }
    };

    const next = function (setActive, allPage) {
        if (currentPage < allPage-1) {
            setCurrentPage(currentPage + 1);
            setActive(currentPage + 1)
        }
    };

    useEffect(() => {  
        dispatch(addPage({firstValue:currentPage*productsPerPage, lastValue:currentPage*productsPerPage+productsPerPage}))
    }, [dispatch, currentPage]);

    return (
        <div className= {styles.containerpagination} >
            <div className={styles.pagination}>
                {console.log(allPage)}
                <button className={styles.btnpage} onClick={() => previous(setActive)}>Prev</button>
                {pageNumbers && pageNumbers.map((number) => (
                    <button className={number === active ? `${styles.active}` : '' }

                        onClick={() => {
                            setActive(number)
                            paginado(number)
                        }} key={number} >{number+1}</button>
                ))}
                <button className={styles.btnpage} onClick={() => next(setActive, allPage)}>Next</button>
            </div>

        </div>


    )
}

export default Paginado;
