import {GET_PRODUCTS, GET_PRODUCTS_NAME} from '../actions'

const initialState = {
    products: []
};

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_PRODUCTS:
            return{
                ...state,
                products: action.payload
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