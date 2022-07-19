import apiInstance from './apiAxios'

export async function payCart(itemsCart, idOrder){
    const { data } = await apiInstance.post('/payment', {
        itemsCart,
        idOrder
    })

    return data
}