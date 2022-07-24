import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBrands, getCategories } from '../../redux/actions';
import axios from 'axios';
import swal from 'sweetalert';
import styles from './NewProduct.module.css'
import { useAuth0 } from "@auth0/auth0-react";
import { createProduct } from '../../services/productsServices';
import ImageUploader from './Uploader.jsx';



function postProduct(payload, token) {
    return async function (dispatch) {
        var json = await axios.post("http://localhost:3001/product", payload, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
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
        errors.imagen = "Se requiere una imagen al menos.";
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
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();
    const dispatch = useDispatch()
    const brands = useSelector((state) => state.brands)
    const categories = useSelector((state) => state.categories)
    const [errors, setErrors] = useState({})

    const [images, setImages] = useState([]);

    const [input, setInput] = useState({
        name: "",
        description: "",
        price: "",
        model: "",
        image: [],
        brand: "",
        category: [],
        stock_product: "",
        size: "",
        mainColor: "",
        store: ""
    })

    async function handleChange(e) {
        if (e.target.value === "Otra") {
            var value = await swal({
                title: "Otra marca",
                text: "Escribe un nombre para tu marca.",
                content: { element: "input", attributes: { type: "text", placeholder: "Escribí la marca" } }
            })
            if (value !== null) {
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

    // async function handleSelect(e) {
    //     e.preventDefault()
    //     if (e.target.value === "Image") {
    //         var value = await swal({
    //             title: "Agregar imagen",
    //             text: "Copia la URL de la imagen",
    //             content: { element: "input", attributes: { type: "text", placeholder: "URL" } }
    //         })
    //         if (value !== null) {
    //             setInput({
    //                 ...input,
    //                 image: [...input.image, value]
    //             })
    //             setErrors(validate({
    //                 ...input,
    //                 image: [...input.image, value]
    //             }))
    //         }
    //         return
    //     }
    // }
    
    useEffect(()=>{
        setInput({
            ...input,
            image: images
        })
    },[images])

    async function handleSelect2(e) {
        if (e.target.value === "Otra") {
            var value = await swal({
                title: "Otra categoría",
                text: "Escribe un nombre para la categoría.",
                content: { element: "input", attributes: { type: "text", placeholder: "Escribí la categoría" } }
            })
            if (value !== null) {
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

    function handleChange3(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (errors.nombre || errors.descripción || errors.precio || errors.modelo || errors.imagen || errors.marca || errors.categoría) {
            let sendErrors = [];
            for (const key in errors) {
                sendErrors.push(`${key[0].toUpperCase() + key.slice(1)}: ${errors[key]}`)
            }
            return alert(sendErrors.join(" "))
        }
        else if (input.name) {
            const token = await getAccessTokenSilently()
            await createProduct(input, token)
            setInput({
                name: "",
                description: "",
                price: "",
                model: "",
                image: [],
                brand: "",
                category: [],
                stock_product: "",
                size: "",
                mainColor: "",
                store: ""
            })
            return alert("Producto creado!")
        }
        return alert("Hace falta información!")
    }
console.log(input)
    useEffect(() => {
        dispatch(getBrands())
        dispatch(getCategories())
    }, [dispatch]);

        return (
            isAuthenticated ? (

                <div>
                    <div>
                        {console.log(input)}
                        <h1>Crear producto</h1>
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
                                <label>Imagen:</label>
                                {/* <button
                                    value={"Image"}
                                    name='image'
                                    onClick={(e) => handleSelect(e)}
                                >Agregar</button> */}
                                <ImageUploader images={images} setImages={setImages} />
                            </div>
                            <div>Marca:
                                <select defaultValue="empty" name='brand' onChange={(e) => handleChange(e)}>
                                    <option value="empty" disabled hidden>Seleccione aquí:</option>
                                    {brands.map((m, i) => (
                                        <option key={i} value={m.name}>{m.name}</option>
                                    ))}
                                    <option value="Otra">Otra</option>
                                </select>
                            </div>
                            <div>Categoría:
                                <select defaultValue="empty" onChange={(e) => handleSelect2(e)}>
                                    <option value="empty" disabled hidden>Seleccione aquí:</option>
                                    {categories?.map((c, i) => (
                                        <option key={i} value={c.name}>{c.name}</option>
                                    ))}
                                    <option value="Otra">Otra</option>
                                </select>
                            </div>
                            <div>
                                {input.category.map(d =>
                                    <div key={d}>
                                        <p>{d}</p>
                                        <button onClick={() => handleDelete2(d)}>x</button>
                                    </div>
                                )}
                            </div>
                            <div>
                                <label>Stock:</label>
                                <input
                                    type='text'
                                    value={input.stock_product}
                                    name='stock_product'
                                    onChange={(e) => handleChange3(e)}
                                ></input>
                            </div>
                            <div>
                                <label>Talle:</label>
                                <input
                                    type='text'
                                    value={input.size}
                                    name='size'
                                    onChange={(e) => handleChange3(e)}
                                ></input>
                            </div>
                            <div>
                                <label>Color:</label>
                                <input
                                    type='text'
                                    value={input.mainColor}
                                    name='mainColor'
                                    onChange={(e) => handleChange3(e)}
                                ></input>
                            </div>
                            <div>
                                <label>Tienda:</label>
                                <input
                                    type='text'
                                    value={input.store}
                                    name='store'
                                    placeholder='default'
                                    onChange={(e) => handleChange3(e)}
                                ></input>
                            </div>
                            <button type='submit'>Crear</button>
                        </form>
                    </div>
                    <Link to='/home'><button>Volver</button></Link>
                </div>
            ) : <p>Necesitás iniciar sesión.</p>
        )
    }
