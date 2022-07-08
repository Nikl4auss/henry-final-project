import axios from 'axios';

export const GET_PRODUCTS = 'GET_PRODUCTS'
export const GET_PRODUCTS_NAME = 'GET_PRODUCTS_NAME'

export function getProducts(){
    return async function(dispatch){
        const json = await axios.get("https://v1-sneakers.p.rapidapi.com/v1/sneakers") //poner la ruta del BACK cuando esté lista
        dispatch({
            type: GET_PRODUCTS,
            payload: json.data
        })
    }
}

export function getProductsName(name){
    return async function (dispatch){
        try{
        const json = await axios.get(`http://localhost:3001/products?name=${name}`); //acá va la ruta de los productos
        return dispatch({
            type: GET_PRODUCTS_NAME,
            payload: json.data //me devuelve lo que me devuela la ruta
        })
        } catch (error) {
            console.log(error)
        }
    }
}