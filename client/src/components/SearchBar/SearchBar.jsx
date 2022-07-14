import React from 'react';
import { useEffect } from 'react';
import {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../actions';
import { useSessionStorage } from '../../services/useStorage';

import styles from './SearchBar.module.css'

export default function SearchBar (){
    
    const dispatch = useDispatch()
    const [name, setName] = useSessionStorage("name", '')//seteo un estado local


    function handleInputChange(e){ 
        e.preventDefault()
        setName(e.target.value) //el value del input toma el value del state
    }

    function handleSubmit(e){ 
        e.preventDefault()
        dispatch(getProducts({}, name)) //name es mi estado local que lo estan pasando en la search bar
        setName('')
    }

    return (
        <>
        <div className={styles.busqueda}>
            <input
            type = 'text'
            value= {name}
            placeholder = "Buscar..."
            onChange = {(e) => handleInputChange(e)}
            />
            <button className={styles.btnSearch} type='submit' onClick = {(e) => handleSubmit(e)}>Buscar</button>
        </div>
         {/* <div>
            <Link to='/producto' className='crear nuevo producto'>Crear nuevo producto</Link>
         </div> */}
         </>
    )
}