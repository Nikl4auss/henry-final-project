import { ADD_TO_CART, REMOVE_ONE_TO_CART, REMOVE_ALL_TO_CART, CLEAR_CART, TOTAL_AMOUNT_CART } from "../actions/shoppingCartActions";

const shoppingInitialState = {
    products: [{
            id: 1,
            name: 'Zapas Piolas',
            image: 'https://http2.mlstatic.com/D_NQ_NP_693424-MLA49985058216_052022-W.jpg',
            price: '$10000'
        },
        {
            id: 2,
            name: 'Zapas Trancas',
            image: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e78cc288-65f2-4dca-99a5-4c06803f8312/air-force-1-lo-07-zapatillas-RRBKlk.png',
            price: '$15000'
        },
        {
            id: 3,
            name: 'Zapas Raras',
            image: 'https://d3ugyf2ht6aenh.cloudfront.net/stores/961/362/products/picsart_22-02-25_14-30-14-122-fbc9141bd92e0798c716458106031306-1024-1024.jpg',
            price: '$11000'
        },
        {
            id: 4,
            name: 'Zapas Facheras',
            image: 'https://http2.mlstatic.com/D_NQ_NP_977082-MLA40388822119_012020-W.jpg',
            price: '$20000'
        },
        {
            id: 5,
            name: 'Zapas ?????',
            image: 'https://s1.eestatic.com/2021/12/14/omicrono/software/634696947_218344871_1024x576.jpg',
            price: '$40000'
        },
        {
            id: 6,
            name: 'Altas Llantas',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDFntL9jeQ2pTWyr2kOo0QzuaygQ00oJvF9g&usqp=CAU',
            price: '$19000'

        }],
    cart: []
}

export default function shoppingReducer (state = shoppingInitialState, action) {
    switch(action.type) {
        case ADD_TO_CART:
        case REMOVE_ONE_TO_CART:
        case REMOVE_ALL_TO_CART:
        case CLEAR_CART:
        case TOTAL_AMOUNT_CART:
        default:
            return state
    }
}