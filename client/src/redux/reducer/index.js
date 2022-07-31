import {ERROR, GET_BRANDS, GET_CATEGORIES, GET_PRODUCTS, GET_PRODUCTS_NAME, ADD_PAGE, SET_ORDER} from '../actions/actions_types'


const initialState = {
    error: '',
    products: [],
    brands: [],
    categories: [],
    filtersSelected: {
        category: [],
        brand: []
    },
    name: '',
    cart: [],
    pages: {firstValue:0, lastValue:11},
    order: []
};

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case ERROR:
            return {
                ...state,
                error: action.MessageError.response
            }
        case GET_PRODUCTS:
            return{
                ...state,
                products: action.payload,
                filtersSelected: action.filters,
                name: action.name,
                error: ''
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
            case ADD_PAGE:
                return {
                    ...state,
                    pages: action.payload
                }
            case SET_ORDER:
                return {
                    ...state,
                    order: action.payload
                }
              
        default: return state;
    }
}

export default rootReducer;