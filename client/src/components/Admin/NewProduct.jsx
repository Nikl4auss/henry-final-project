import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBrands, getCategories } from '../../actions';
import axios from 'axios';
import swal from 'sweetalert';
import styles from './NewProduct.module.css'


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
    if (!/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!]))?/.test(input.image)) {
        errors.imagen = "La URL es inválida.";
    } 
    if (input.brand === "empty") {
        errors.marca = "Se requiere la marca del producto.";
    } 
    if (!input.category[0]) {
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
        brand: "",
        category: []
    })

    async function handleChange(e) {
        if (e.target.value === "Otra"){
           var value = await swal({
            title:"Otra marca", 
            text:"Escribe un nombre para tu marca.", 
            icon:"success", 
            content:{element: "input", attributes:{type:"text", placeholder:"Escribí la marca"}}})
            if (value !== null){
                setInput({
                    ...input,
                    [e.target.name]: value
                })
                setErrors(validate({
                    ...input,
                    [e.target.name]: value
                }))
            }
            return
        } 
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    async function handleSelect(e) {
        e.preventDefault()
        if (e.target.value === "Image"){
            var value = await swal({
             title:"Agregar imagen", 
             text:"Copia la URL de la imagen", 
             icon:"success", 
             content:{element: "input", attributes:{type:"text", placeholder:"URL"}}})
             if (value !== null){
                 setInput({
                     ...input,
                     image: [...input.image, value]
                 })
                 setErrors(validate({
                     ...input,
                     image: [...input.image, value]
                 }))
             }
             return
         }}

         async function handleSelect2(e) {
            if (e.target.value === "Otra"){
               var value = await swal({
                title:"Otra categoría", 
                text:"Escribe un nombre para la categoría.", 
                icon:"success", 
                content:{element: "input", attributes:{type:"text", placeholder:"Escribí la categoría"}}})
                if (value !== null){
                    setInput({
                        ...input,
                        category: [...input.category, value]
                    })
                    setErrors(validate({
                        ...input,
                        category: [...input.category, value]
                    }))
                }
                return
            } 
            setInput({
                ...input,
                category: [...input.category, e.target.value]
            })
            setErrors(validate({
                ...input,
                category: [...input.category, e.target.value]
            }))
        }

    function handleDelete2(e) {
        setInput({
            ...input,
            category: input.category.filter(c => c !== e)
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
                brand: "",
                category: []
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
            <fieldset>
                <div className={styles.formcontainer}>
                    <legend>
                        <h1>Crear producto</h1>
                    </legend>
                <form className={styles.container} onSubmit={(e) => handleSubmit(e)}>

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
                    <label htmlFor="image">URL image:</label>
                    <input type="url" name="image" value={input.image} onChange={(e) => handleChange(e)} />
                        {/* <button
                            value={"Image"}
                            name='image'
                            onClick={(e) => handleSelect(e)}
                        >Agregar</button> */}
                    </div>
                    <label>Marca:</label>
                        <select defaultValue="empty" name='brand' onChange={(e) => handleChange(e)}>
                            <option value="empty" disabled hidden>Seleccione aquí:</option>
                            {brands.map((m, i) => (
                                <option key={i} value={m.name}>{m.name}</option>
                            ))}
                            <option value="Otra">Otra</option>
                        </select>
                    <label>Categoría:</label>
                        <select defaultValue="empty" onChange={(e) => handleSelect2(e)}>
                            <option value="empty" disabled hidden>Seleccione aquí:</option>
                            {categories?.map((c, i) => (
                                <option key={i} value={c.name}>{c.name}</option>
                            ))}
                            <option value="Otra">Otra</option>
                        </select>
                    <div>
                {input.category.map(d =>
                    <div key={d}>
                        <p>{d}</p>
                        <button onClick={() => handleDelete2(d)}>x</button>
                    </div>
                )}
            </div>
                    {/* <button type='submit'>Crear</button> */}
                    <input className='submitbtn' type="submit" value="Crear" />
                   
                </form>
            </div>
            <Link to='/Home' className={styles.btn}>◀ Volver</Link>
        </fieldset>
        </div>
    )
}