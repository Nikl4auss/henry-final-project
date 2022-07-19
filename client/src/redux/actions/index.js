import axios from 'axios';
import { GET_BRANDS, GET_CATEGORIES, GET_PRODUCTS, ERROR , ADD_PAGE } from './actions_types';
import { getProducts as apiGetProducts } from '../../services/productsServices';

export function getProducts(filters = {}, name){
    

    
    return async function(dispatch){
        try {
            const data = await apiGetProducts(filters, name) 
            dispatch({
                type: GET_PRODUCTS,
                payload: data,
                filters: filters,
                name: name
            })
            
        } catch (error) {
            dispatch( {
                type: ERROR,
                MessageError: error
            })
        }
    }
}

export function getCategories (){
    return async function(dispatch){
        const response = await axios.get(`http://localhost:3001/categories`) 
        dispatch({
            type: GET_CATEGORIES,
            payload: response.data,
        })
    }
}

export function getBrands (){
    return async function(dispatch){
        const response = await axios.get(`http://localhost:3001/brands`) 
        dispatch({
            type: GET_BRANDS,
            payload: response.data,
        })
    }
}

export function addPage(payload){
    return {
     type: ADD_PAGE,
     payload: payload
    }
}

// export function getProductsName(name){
//     return async function (dispatch){
//         try{
//         const json = await axios.get(`http://localhost:3001/products?name=${name}`); //acá va la ruta de los productos
//         return dispatch({
//             type: GET_PRODUCTS_NAME,
//             payload: json.data //me devuelve lo que me devuela la ruta
//         })
//         } catch (error) {
//             console.log(error)
//         }
//     }
// }
