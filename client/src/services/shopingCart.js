import apiInstance from './apiAxios'

export async function payCart(itemsCart, idOrder){
    const { data } = apiInstance.post('/payment', {
        itemsCart,
        idOrder
    })

    return data
}