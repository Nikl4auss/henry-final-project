import {GET_BRANDS, GET_CATEGORIES, GET_PRODUCTS, GET_PRODUCTS_NAME} from '../actions/actions_types'


const initialState = {
    products: [],
    brands: [],
    categories: [],
    filtersSelected: {
        category: [],
        brand: []
    },
    name: ''
};

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_PRODUCTS:
            return{
                ...state,
                products: action.payload,
                filtersSelected: action.filters,
                name: action.name
            }
        case GET_BRANDS: 
            return {
                ...state,
                brands: action.payload
            }
        case GET_CATEGORIES: 
            return {
                ...state,
                categories: action.payload
            }
            case GET_PRODUCTS_NAME:
                return{
                    ...state,
                    products: action.payload //pq estoy renderizando ese arreglo
                }
        default: return state;
    }
}

export default rootReducer;