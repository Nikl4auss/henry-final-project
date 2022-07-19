import axios from 'axios'
import {API_URL} from '../utils/config'

const apiInstance = axios.create({
    baseURL: API_URL
})

export async function getProduct(id){
    // const {data} = await axios.get(`${baseUrl}product?id=${id}`)
    const {data} = await apiInstance.get(`/product?id=${id}`)
    return data
}

export async function createProduct(product, token){
    const {data} = await apiInstance.post('/product', product, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return data
}