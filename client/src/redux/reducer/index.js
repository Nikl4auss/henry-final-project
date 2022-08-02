import { ERROR, GET_BRANDS, GET_CATEGORIES, GET_PRODUCTS, GET_PRODUCTS_NAME, ADD_PAGE, SET_ORDER, GET_CART, GET_USERS, SET_PRODUCT } from '../actions/actions_types'


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
    cart: {},
    pages: { firstValue: 0, lastValue: 11 },
    order: [],
    allUser: []
};
const rootReducer = (state = initialState, action) => {
    //console.log(state)
    switch (action.type) {
        case ERROR:
            return {
                ...state,
                error: action.MessageError.response.data
            }
        case GET_PRODUCTS:
            return {
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
            return {
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
        case GET_CART:
            const cartToOrder = action.payload.Line_carts?.map((prod) => {
                return {
                    id: prod.Stock.id,
                    name: prod.Stock.Product.name,
                    price: prod.Stock.Product.price,
                    quantity: prod.quantity,
                    stock_product: prod.Stock.stock_product,
                    id_lineCart: prod.id
                }
            })
            return {
                ...state,
                cart: action.payload,
                order: cartToOrder
            }
        case GET_USERS:
            return {
                ...state,
                allUser: action.payload
            }
        case SET_PRODUCT:
            return {
                ...state,
                products: []
            }
        default: return state;
    }
}

export default rootReducer;