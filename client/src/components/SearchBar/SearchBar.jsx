import React from 'react';
import {useState} from 'react';
import { useDispatch } from 'react-redux';
import { getProducts } from '../../actions';


import styles from './SearchBar.module.css'

export default function SearchBar (){
    
    const dispatch = useDispatch()
    const [name, setName] = useState('')//seteo un estado local


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
        <div className={styles.busqueda}>
            <input
            type = 'text'
            value= {name}
            placeholder = "Buscar..."
            onChange = {(e) => handleInputChange(e)}
            />
            <button className={styles.btnSearch} type='submit' onClick = {(e) => handleSubmit(e)}>Buscar</button>
        </div>
    )
}