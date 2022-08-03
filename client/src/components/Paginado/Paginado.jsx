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
    const firstItem = useSelector((state)=> state.pages.firstValue)
    const pageNumbers = [];
    const [active, setActive] = useState(currentPage)

    let allPage = Math.ceil(allProducts?.length / productsPerPage)

    for (let i = 0; i <= allPage-1; i++) {
        pageNumbers.push(i)
    };

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scroll(0, 0)
    }

    const previous = function (setActive) {
        if (currentPage >= 1) {
            setCurrentPage(currentPage - 1);
            setActive(currentPage - 1)
            window.scroll(0, 0)
        }
    };

    const next = function (setActive, allPage) {
        if (currentPage < allPage-1) {
            setCurrentPage(currentPage + 1);
            setActive(currentPage + 1)
            window.scroll(0, 0)
        }
    };

    useEffect(() => {  
        dispatch(addPage({firstValue:currentPage*productsPerPage, lastValue:currentPage*productsPerPage+productsPerPage}))
    
    }, [dispatch, currentPage]);


    useEffect(()=>{
    if(firstItem===0)
        setActive(0)
    },[firstItem])

    return (
        <div className= {styles.containerpagination} >
            <div className={styles.pagination}>
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
