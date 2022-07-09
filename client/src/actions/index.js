import axios from 'axios';
import { BRANDS, CATEGORIES } from '../Variables Auxiliares/Auxiliar';
import { GET_BRANDS, GET_CATEGORIES, GET_PRODUCTS } from './actions_types';

export function getProducts(filters = {}){
    let queryFilter = ''
    if (filters.category && filters.brand){
        if(filters.category.length > 0) {
            queryFilter.length === 0 ? queryFilter = '?' : queryFilter = queryFilter + '&'
            queryFilter = queryFilter + 'categories=' + filters.category.join('+')
        }
        if(filters.brand.length > 0) {
            queryFilter.length === 0 ? queryFilter = '?' : queryFilter = queryFilter + '&'
            queryFilter = queryFilter + 'brands=' + filters.brand.join('+')
        }
    }
    return async function(dispatch){
        var json = await axios.get(`http://localhost:3001/products${queryFilter}`) 
        dispatch({
            type: GET_PRODUCTS,
            payload: json.data,
            filters: filters
        })
    }
}

export function getCategories (){
    return {
        type: GET_CATEGORIES,
        payload: CATEGORIES
    }
}

export function getBrands (){
    return {
        type: GET_BRANDS,
        payload: BRANDS
    }
}
