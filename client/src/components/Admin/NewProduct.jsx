import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBrands, getCategories } from '../../redux/actions';
import axios from 'axios';
import swal from 'sweetalert';
import styles from './NewProduct.module.css'
import { useAuth0 } from "@auth0/auth0-react";
import { createProduct } from '../../services/productsServices'
import validate from '../../services/validate';
import ImageUploader from './Uploader.jsx';
import { API_URL } from '../../utils/config';




function postProduct(payload, token) {
    return async function (dispatch) {
        var json = await axios.post(`${API_URL}/product`, payload, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return json;
    }
}

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

    useEffect(() => {
        setInput({
            ...input,
            image: images
        })
    }, [images])

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

    function handleChange3(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
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
                    <h1 className={styles.title}>Crear producto</h1>
                    <form className={styles.container} onSubmit={(e) => handleSubmit(e)}>

                        <div className={styles.inputBox} >
                            <input
                                type='text'
                                value={input.name}
                                name='name'
                                onChange={(e) => handleChange(e)}
                                required
                            ></input>
                            <label>Nombre:</label>
                        </div>
                        <div className={styles.inputBox}>
                            <input
                                type='text'
                                value={input.description}
                                name='description'
                                onChange={(e) => handleChange(e)}
                                required
                            ></input>
                            <label>Descripción:</label>
                        </div>
                        <div className={styles.inputBox}>
                            <input
                                type='number'
                                value={input.price}
                                name='price'
                                onChange={(e) => handleChange(e)}
                                required
                            ></input>
                            <label>Precio:</label>
                        </div>
                        <div className={styles.divImages}>
                            <label>Imagen:</label>
                            {/* <button
                                    value={"Image"}
                                    name='image'
                                    onClick={(e) => handleSelect(e)}
                                >Agregar</button> */}
                                <ImageUploader images={images} setImages={setImages} />
                        </div>
                        <div className={styles.inputBox}>
                            <input
                                type='text'
                                value={input.model}
                                name='model'
                                onChange={(e) => handleChange(e)}
                                required
                            ></input>
                            <label>Modelo:</label>
                        </div>
                        <div className={styles.divSelect}>Marca:
                            <select className={styles.select} defaultValue="empty" name='brand' onChange={(e) => handleChange(e)}>
                                <option value="empty" disabled hidden>Seleccione aquí</option>
                                {brands.map((m, i) => (
                                    <option key={i} value={m.name}>{m.name}</option>
                                ))}
                                <option value="Otra">Otra</option>
                            </select>
                        </div>
                        <div className={styles.divSelect} >Categoría:
                            <select className={styles.select} defaultValue="empty" onChange={(e) => handleSelect2(e)}>
                                <option value="empty" disabled hidden>Seleccione aquí</option>
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
                        <div className={styles.inputBox}>
                            <input
                                type='text'
                                value={input.stock_product}
                                name='stock_product'
                                onChange={(e) => handleChange3(e)}
                                required
                            ></input>
                            <label>Stock:</label>
                        </div>
                        <div className={styles.inputBox}>
                            <input
                                type='text'
                                value={input.size}
                                name='size'
                                onChange={(e) => handleChange3(e)}
                                required
                            ></input>
                            <label>Talle:</label>
                        </div>
                        <div className={styles.inputBox}>
                            <input
                                type='text'
                                value={input.mainColor}
                                name='mainColor'
                                onChange={(e) => handleChange3(e)}
                                required
                            ></input>
                            <label>Color:</label>
                        </div>
                        <div className={styles.inputBox}>
                            <input
                                type='text'
                                value={input.store}
                                name='store'
                                placeholder='default'
                                onChange={(e) => handleChange3(e)}

                            ></input>
                            <label>Tienda:</label>
                        </div>
                    </form>
                    <div className={styles.buttons}>
                        <button className={styles.btnCreate} type='submit'>Crear</button>
                        <Link to='/admin'><button className={styles.btnBack}>Volver</button></Link>
                    </div>
                </div>
            </div>
        ) : <p>Necesitás iniciar sesión.</p>
    )
}
