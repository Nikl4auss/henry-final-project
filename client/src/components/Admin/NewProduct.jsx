import React, {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBrands, getCategories } from '../../actions';
import axios from 'axios';

function postProduct(payload){
    return async function (dispatch){
        var json = await axios.post("http://localhost:3001/product", payload);
        return json;
    }
}

function validate(input){
    let errors={};
    if (!input.name){
        errors.name = "Se necesita un nombre.";
    } else if (!input.description){
        errors.description = "Se necesita una descripción del producto.";
    } else if (!input.price){
        errors.price = "Se necesita asignarle un precio al producto.";
    } else if (input.price < 0){
        errors.price = "No está permitido un número negativo.";
    } else if (!input.model){
        errors.model = "Se necesita definir el modelo.";
    } else if (!input.image[0]){
        errors.image = "Se requiere la URL de la imagen del producto.";
    } else if (!/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!]))?/.test(input.image)){
        errors.image = "La URL es inválida.";
    } else if (!input.brands){
        errors.brands = "Se requiere la marca del producto.";
    } else if (!input.categories[0]){
        errors.categories = "Una categoría es requerida.";
    }
    return errors;
};
export default function NewProduct(){
    const dispatch = useDispatch()
    const brands = useSelector((state)=>state.brands)
    const categories = useSelector((state)=>state.categories)
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

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
    }

    function handleSelect(e){
            setInput({
                ...input,
                image: [e.target.value],
            })
        setErrors(validate({
            ...input,
            image: [e.target.value],
        }))
    }

    function handleSelect2(e){
        setInput({
            ...input,
            categories: [...input.categories, e.target.value]
        })
    setErrors(validate({
        ...input,
        categories: [...input.categories, e.target.value]
    }))
}

    function handleDelete2(e){
        setInput({
            ...input,
            categories: input.categories.filter(c => c !== e)
        })
    }
    
    function handleSubmit(e){
        e.preventDefault();
        if(errors.name || errors.description || errors.price || errors.model || errors.image || errors.brands || errors.categories){
            let sendErrors = [];
            for (const key in errors) {
            sendErrors.push(`${key[0].toUpperCase()+key.slice(1)}: ${errors[key]}`)
            }
            return alert(sendErrors) 
        }
        else if (input.name){
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

    useEffect(()=>{  
        dispatch(getBrands())
        dispatch(getCategories())
    },[dispatch]);


    return(
        <div>
            <div>
            {input.categories.map(d=>
                <div key={d}>
                    <p>{d}</p>
                    <button onClick={()=>handleDelete2(d)}>x</button>
                </div>
                )}
           </div> 
          <div>  
            <h1>Crear producto</h1>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div>
                    <label>Nombre:</label>
                    <input
                    type= 'text'
                    value= {input.name}
                    name= 'name'
                    onChange={(e)=>handleChange(e)}
                    ></input>
                    {errors.name && (
                        <p className='error'>{errors.name}</p>
                    )}
                </div>
                <div>
                <label>Descripción:</label>
                    <input
                    type= 'text'
                    value= {input.description}
                    name= 'description'
                    onChange={(e)=>handleChange(e)}
                    ></input>
                    {errors.description && (
                        <p className='error'>{errors.description}</p>
                    )}
                </div>
                <div>
                <label>Precio:</label>
                    <input
                    type= 'number'
                    value= {input.price}
                    name= 'price'
                    onChange={(e)=>handleChange(e)}
                    ></input>
                    {errors.price && (
                        <p className='error'>{errors.price}</p>
                    )}
                </div>
                <div>
                <label>Modelo:</label>
                    <input
                    type= 'text'
                    value= {input.model}
                    name= 'model'
                    onChange={(e)=>handleChange(e)}
                    ></input>
                    {errors.model && (
                        <p className='error'>{errors.model}</p>
                    )}
                </div>
                <div>
                <label>Imagen:</label>
                    <input
                    type= 'text'
                    value= {input.image}
                    name= 'image'
                    onChange={(e)=>handleSelect(e)}
                    ></input>
                    {errors.image && (
                        <p className='error'>{errors.image}</p>
                    )}
                </div>
                <div>Marca:
                <select onChange={(e)=>handleChange(e)}>
                <option value="" selected disabled hidden>Seleccione aquí:</option>
                    {brands.map((m)=>(
                        <option key={m} value={m}>{m}</option>
                   ))}
                </select>
                    {errors.brands && (
                        <p className='error'>{errors.brands}</p>
                    )}
                </div>
                <div>Categoría:
                <select onChange={(e)=>handleSelect2(e)}>
                <option value="" selected disabled hidden>Seleccione aquí:</option>
                    {categories.map((c)=>(
                        <option key={c} value={c}>{c}</option>
                   ))}
                </select>
                    {errors.categories && (
                        <p className='error'>{errors.categories}</p>
                    )}
                </div>
                <button type='submit'>Crear</button>
            </form>
          </div>    
         <Link to= '/home'><button>Volver</button></Link>
        </div>
    )
}