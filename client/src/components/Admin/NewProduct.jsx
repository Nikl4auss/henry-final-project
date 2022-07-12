import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBrands, getCategories } from '../../actions';
import axios from 'axios';

function postProduct(payload) {
    return async function (dispatch) {
        var json = await axios.post("http://localhost:3001/product", payload);
        return json;
    }
}

function validate(input) {
    let errors = {};
    if (!input.name) {
        errors.nombre = "Se necesita un nombre.";
    } 
    if (!input.description) {
        errors.descripción = "Se necesita una descripción del producto.";
    } 
    if (!input.price) {
        errors.precio = "Se necesita asignarle un precio al producto.";
    } 
    if (input.price < 0) {
        errors.precio = "No está permitido un número negativo.";
    } 
    if (!input.model) {
        errors.modelo = "Se necesita definir el modelo.";
    } 
    if (!input.image[0]) {
        errors.imagen = "Se requiere la URL de la imagen del producto.";
    } 
    if (!/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!]))?/.test(input.image)) {
        errors.imagen = "La URL es inválida.";
    } 
    if (input.brands !== "") {
        errors.marca = "Se requiere la marca del producto.";
    } 
    if (!input.categories[0]) {
        errors.categorías = "Una categoría es requerida.";
    }
    return errors;
};
export default function NewProduct() {
    const dispatch = useDispatch()
    const brands = useSelector((state) => state.brands)
    const categories = useSelector((state) => state.categories)
    const [errors, setErrors] = useState({})

    const [input, setInput] = useState({
        name: "",
        description: "",
        price: "",
        model: "",
        image: [],
        brands: "",
        categories: []
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

    function handleSelect(e) {
        setInput({
            ...input,
            image: [e.target.value],
        })
        setErrors(validate({
            ...input,
            image: [e.target.value],
        }))
    }

    function handleSelect2(e) {
        setInput({
            ...input,
            categories: [...input.categories, e.target.value]
        })
        setErrors(validate({
            ...input,
            categories: [...input.categories, e.target.value]
        }))
    }

    function handleDelete2(e) {
        setInput({
            ...input,
            categories: input.categories.filter(c => c !== e)
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (errors.nombre || errors.descripción || errors.precio || errors.modelo || errors.imagen || errors.marca || errors.categoría) {
            let sendErrors = [];
            for (const key in errors) {
                sendErrors.push(`${key[0].toUpperCase() + key.slice(1)}: ${errors[key]}`)
            }
            return alert(sendErrors.join(" "))
        }
        else if (input.name) {
            dispatch(postProduct(input))
            setInput({
                name: "",
                description: "",
                price: "",
                model: "",
                image: [],
                brands: "",
                categories: []
            })
            return alert("Producto creado!")
        }
        return alert("Hace falta información!")
    }

    useEffect(() => {
        dispatch(getBrands())
        dispatch(getCategories())
    }, [dispatch]);


    return (
        <div>
            <div>
                <h1>Crear producto</h1>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <label>Nombre:</label>
                        <input
                            type='text'
                            value={input.name}
                            name='name'
                            onChange={(e) => handleChange(e)}
                        ></input>
                    </div>
                    <div>
                        <label>Descripción:</label>
                        <input
                            type='text'
                            value={input.description}
                            name='description'
                            onChange={(e) => handleChange(e)}
                        ></input>
                    </div>
                    <div>
                        <label>Precio:</label>
                        <input
                            type='number'
                            value={input.price}
                            name='price'
                            onChange={(e) => handleChange(e)}
                        ></input>
                    </div>
                    <div>
                        <label>Modelo:</label>
                        <input
                            type='text'
                            value={input.model}
                            name='model'
                            onChange={(e) => handleChange(e)}
                        ></input>
                    </div>
                    <div>
                        <label>Imagen:</label>
                        <input
                            type='text'
                            value={input.image}
                            name='image'
                            onChange={(e) => handleSelect(e)}
                        ></input>
                    </div>
                    <div>Marca:
                        <select onChange={(e) => handleChange(e)}>
                            <option value="" selected disabled hidden>Seleccione aquí:</option>
                            {brands.map((m) => (
                                <option key={m} value={m}>{m}</option>
                            ))}
                        </select>
                    </div>
                    <div>Categoría:
                        <select onChange={(e) => handleSelect2(e)}>
                            <option value="" selected disabled hidden>Seleccione aquí:</option>
                            {categories.map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                {input.categories.map(d =>
                    <div key={d}>
                        <p>{d}</p>
                        <button onClick={() => handleDelete2(d)}>x</button>
                    </div>
                )}
            </div>
                    <button type='submit'>Crear</button>
                </form>
            </div>
            <Link to='/home'><button>Volver</button></Link>
        </div>
    )
}