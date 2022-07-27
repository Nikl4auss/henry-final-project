import React from 'react';
import {useState} from 'react';
import { BsSearch } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { getProducts } from '../../redux/actions';


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
        <form className={styles.busqueda} onSubmit={handleSubmit}>
            <input
            className={styles.input}
            type = 'text'
            value= {name}
            placeholder = "Buscar..."
            onChange = {(e) => handleInputChange(e)}
            />
            <button className={styles.btnSearch} type='submit'><BsSearch/></button>
        </form>
    )
}