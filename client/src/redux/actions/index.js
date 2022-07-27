import axios from 'axios';
import { GET_BRANDS, GET_CATEGORIES, GET_PRODUCTS, ERROR , ADD_PAGE, SET_ORDER } from './actions_types';
import { getProducts as apiGetProducts, getCategories as apiGetCategories, getBrands as apiGetBrands } from '../../services/productsServices';

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
        const data = await apiGetCategories()
        dispatch({
            type: GET_CATEGORIES,
            payload: data,
        })
    }
}

export function getBrands (){
    return async function(dispatch){
        const data = await apiGetBrands()
        dispatch({
            type: GET_BRANDS,
            payload: data,
        })
    }
}

export function addPage(payload){
    return {
    type: ADD_PAGE,
    payload: payload
    }
}

export function setOrder(payload) {
    return {
        type: SET_ORDER,
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
