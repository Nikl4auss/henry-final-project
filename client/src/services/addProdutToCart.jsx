import apiInstance from './apiAxios'

export async function addProductToCart (id){
    try {
        await apiInstance.post(`/line_cart/${id}`)
    } catch (error) {
        console.log(error)
    }
}

export async function addQuantity (id, quantity) {
    try {
        await apiInstance.put(`/line_cart/${id}?quantity=${quantity}`)
    } catch (error) {
        console.log(error)
    }
}