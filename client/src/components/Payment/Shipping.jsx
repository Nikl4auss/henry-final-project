import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

function postAddress(payload) {
    return async function (dispatch) {
        var json = await axios.post("http://localhost:3001/address", payload, {
            // headers: {
            //     'Content-Type': 'application/json',
            //     'Authorization': `Bearer ${token}`
            // }
        });
        return json;
    }
}

function validate(input) {
    let errors = {};
    if (!input.addressee) {
        errors.addressee = "Destinatario es requerido.";
    } else if (!input.street) {
        errors.street = "Calle para entrega es requerida.";
    } else if (!input.number) {
        errors.number = "Altura de la calle es requerida.";
    } else if (!input.country) {
        errors.country = "País es requerido.";
    } else if (!input.state) {
        errors.state = "Provincia es requerida.";
    } else if (!input.city) {
        errors.city = "Ciudad es requerida.";
    } else if (!input.postalCode) {
        errors.postalCode = "Código Postal es requerido.";
    } else if (!input.phone) {
        errors.phone = "Número de teléfono es requerido.";
    }
    return errors;
};

export default function Shipping() {
    const dispatch = useDispatch()
    const [errors, setErrors] = useState({})

    const [input, setInput] = useState({
        addressee: "",
        street: "",
        number: "",
        apartment: "",
        country: "",
        state: "",
        city: "",
        postalCode: "",
        phone: "",
        comment: ""
    })

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleSubmit(e){
        e.preventDefault();
        if(errors.addressee || errors.street || errors.number || errors.country || errors.state || errors.city || errors.postalCode || errors.phone){
            let sendErrors = [];
            for (const key in errors) {
            sendErrors.push(`${key[0].toUpperCase()+key.slice(1)}: ${errors[key]}`)
            }
            return alert(sendErrors) 
        }
        else if (input.addressee){
            dispatch(postAddress(input))
            setInput({
                addressee: "",
                street: "",
                number: "",
                aparment: "",
                country: "",
                state: "",
                city: "",
                postalCode: "",
                phone: "",
                comment: ""
            })
           return alert("Dirección guardada!")
        }
        return alert("Dirección requerida!")
    }
console.log(input)

    return (
        <div>
            <h2>Datos de envío</h2>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div>
                    <label>Nombre y apellido de quien recibe:</label>
                    <input
                        type='text'
                        value={input.addressee}
                        name='addressee'
                        onChange={(e) => handleChange(e)}
                    ></input>
                </div>
                <div>
                    <label>Calle:</label>
                    <input
                        type='text'
                        value={input.street}
                        name='street'
                        onChange={(e) => handleChange(e)}
                    ></input>
                </div>
                <div>
                    <label>Altura:</label>
                    <input
                        type='text'
                        value={input.number}
                        name='number'
                        onChange={(e) => handleChange(e)}
                    ></input>
                </div>
                <div>
                    <label>Piso/Departamento/Lote:</label>
                    <input
                        type='text'
                        value={input.apartment}
                        name='apartment'
                        onChange={(e) => handleChange(e)}
                    ></input>
                </div>
                <div>
                    <label>País:</label>
                    <input
                        type='text'
                        value={input.country}
                        name='country'
                        onChange={(e) => handleChange(e)}
                    ></input>
                </div>
                <div>
                    <label>Provincia:</label>
                    <input
                        type='text'
                        value={input.state}
                        name='state'
                        onChange={(e) => handleChange(e)}
                    ></input>
                </div>
                <div>
                    <label>Ciudad:</label>
                    <input
                        type='text'
                        value={input.city}
                        name='city'
                        onChange={(e) => handleChange(e)}
                    ></input>
                </div>
                <div>
                    <label>Código Postal:</label>
                    <input
                        type='text'
                        value={input.postalCode}
                        name='postalCode'
                        onChange={(e) => handleChange(e)}
                    ></input>
                </div>
                <div>
                    <label>Teléfono:</label>
                    <input
                        type='text'
                        value={input.phone}
                        name='phone'
                        onChange={(e) => handleChange(e)}
                    ></input>
                </div>
                <div>
                    <label>Comentarios de Entrega:</label>
                    <input
                        type='text'
                        value={input.comment}
                        name='comment'
                        onChange={(e) => handleChange(e)}
                    ></input>
                </div>
                {/* <button type='submit'>Continuar con el Pago</button> */}
            </form>
        </div>
    )
}