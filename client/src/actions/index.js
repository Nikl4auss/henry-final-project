import axios from 'axios';
import { BRANDS, CATEGORIES } from '../AuxiliaryVariables/Auxiliar';
import { GET_BRANDS, GET_CATEGORIES, GET_PRODUCTS, ERROR  } from './actions_types';

export function getProducts(filters = {}, name){
    let queryName = ''
    let queryFilter = ''

    if(name.length) {
        queryName = '?name=' + name
    }

    if (filters.category || filters.brand){
        if(filters.category.length > 0) {
            queryFilter.length === 0 && queryName.length === 0 ? queryFilter = '?' : queryFilter = queryFilter + '&'
            queryFilter = queryFilter + 'categories=' + filters.category.join('-')
        }
        if(filters.brand.length > 0) {
            queryFilter.length === 0 && queryName.length === 0 ? queryFilter = '?' : queryFilter = queryFilter + '&'
            queryFilter = queryFilter + 'brands=' + filters.brand.join('-')
        }
    }

    
    return async function(dispatch){
        try {
            const response = await axios.get(`http://localhost:3001/products${queryName}${queryFilter}`) 
            //console.log(response.data)
            dispatch({
                type: GET_PRODUCTS,
                payload: response.data,
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
