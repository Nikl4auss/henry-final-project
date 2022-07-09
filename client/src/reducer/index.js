import {GET_BRANDS, GET_CATEGORIES, GET_PRODUCTS} from '../actions/actions_types'

const initialState = {
    products: [],
    brands: [],
    categories: [],
    filtersSelected: {
        category: [],
        brand: []
    }
};

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_PRODUCTS:
            return{
                ...state,
                products: action.payload,
                filtersSelected: action.filters
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
        default: return state;
    }
}

export default rootReducer;