import axios from 'axios'

export async function addProductToCart (id){
    try {
        await axios.post(`localhost:3001/line_cart/${id}`)
    } catch (error) {
        console.log(error)
    }
}

export async function addQuantity (id, quantity) {
    try {
        await axios.put(`localhost:3001/line_cart/${id}?quantity=${quantity}`)
    } catch (error) {
        console.log(error)
    }
}