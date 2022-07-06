import axios from 'axios';

export const GET_PRODUCTS = 'GET_PRODUCTS'

export function getProducts(){
    return async function(dispatch){
        var json = await axios.get("https://v1-sneakers.p.rapidapi.com/v1/sneakers") //poner la ruta del BACK cuando esté lista
        dispatch({
            type: GET_PRODUCTS,
            payload: json.data
        })
    }
}