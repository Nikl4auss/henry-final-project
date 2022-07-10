import axios from 'axios'

const baseUrl = 'http://localhost:3001/'

export async function getProduct(id){
    const {data} = await axios.get(`${baseUrl}product?id=${id}`)
    return data
}