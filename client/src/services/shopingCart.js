import apiInstance from './apiAxios'

export async function payCart(itemsCart, idOrder){
    const response = await apiInstance.post('/payment', {
        itemsCart,
        idOrder
    })

    return response.data
}