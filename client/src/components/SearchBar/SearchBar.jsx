import React from 'react';
import {useState} from 'react';
import { useDispatch } from 'react-redux';
import { getProductsName } from '../actions';

export default function SearchBar (){
    const dispatch = useDispatch()
    const [name, setName] = useState("")//seteo un estado local

    function handleInputChange(e){ 
        e.preventDefault()
        setName(e.target.value) //el value del input toma el value del state
        console.log(name)
    }

    function handleSubmit(e){ 
        e.preventDefault()
        dispatch(getProductsName(name)) //name es mi estado local que lo estan pasando en la search bar
        console.log(name)
    }

    return (
        <div>
            <input
            type = 'text'
            placeholder = "Buscar..."
            onChange = {(e) => handleInputChange(e)}
            />
            <button type='submit' onClick = {(e) => handleSubmit(e)}>Buscar</button>
        </div>
    )
}