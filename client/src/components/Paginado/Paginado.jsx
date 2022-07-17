import React, { useState , useEffect } from 'react';

import {useDispatch, useSelector} from 'react-redux';

import { getProducts } from '../../actions';
import './Paginado.css';



export function Paginado() {
    // eslint-disable-next-line no-unused-vars
    const [products, setProducts] = useState();
    const dispatch = useDispatch();
    const allProducts = useSelector( (state) =>  state.products  );
    const [currentPage , setCurrentPage] = useState(1);
    // eslint-disable-next-line no-unused-vars
    const [productsPerPage , setProductsPerPage] = useState(12);
    const indexOfLastOfProduct = currentPage * productsPerPage;
    const indexOfFirstOfProduct = indexOfLastOfProduct - productsPerPage;
    const currentProducts  = allProducts.slice(indexOfFirstOfProduct , indexOfLastOfProduct);

    const pageNumbers = [];
    const [active, setActive] = useState(1)
    let allPage = Math.ceil(allProducts/productsPerPage) 

    for (let i = 1; i <= allPage; i++) {
        pageNumbers.push(i)
    };   

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
    
	const previous = function (setActive) {
        if(currentPage > 1){
        setCurrentPage(currentPage - 1);
        setActive(currentPage - 1)
        }  
	};

    const next = function (setActive, allPage) {
        if(currentPage < allPage) {
        setCurrentPage(currentPage + 1);
        setActive(currentPage + 1)
        }
	}; 

    useEffect(() => {
        dispatch(getProducts())      
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className= 'container-pagination' >
            {currentProducts.length ? 
                <Paginado
                    productsPerPage={productsPerPage}
                    allProducts={allProducts.length}
                    paginado={paginado}
                    previous={previous}
                    next={next}>
                </Paginado> :
                <div></div>
                }

        <div className="pagination">
        <div className='btn-page' onClick={() => previous(setActive)}>Prev</div>
            {pageNumbers && pageNumbers.map((number) => (
        <div className= {number === active? 'active' : ''}
        
        onClick={() => {
            setActive(number)
            paginado(number)}} key={number} >{number}</div>
            ))}
        <div className='btn-page' onClick={() => next(setActive, allPage)}>Next</div> 
        </div>
        
        </div>
        

            )
}

export default Paginado;
