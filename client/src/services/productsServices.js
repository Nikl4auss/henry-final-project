import apiInstance from './apiAxios'

export async function getProducts(filters = {}, name = ''){
    let queryName = ''
    let queryFilter = ''

    if(name.length) {
        queryName = '?name=' + name
    }

    if (filters.category || filters.brand){
        if(filters.category.length > 0) {
            queryFilter.length === 0 && queryName.length === 0 ? queryFilter = '?' : queryFilter = queryFilter + '&'
            queryFilter = queryFilter + 'categories=' + filters.category.join('-')
        }
        if(filters.brand.length > 0) {
            queryFilter.length === 0 && queryName.length === 0 ? queryFilter = '?' : queryFilter = queryFilter + '&'
            queryFilter = queryFilter + 'brands=' + filters.brand.join('-')
        }
    }

    const {data} = await apiInstance.get(`/products${queryName}${queryFilter}`)
    return data
}

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

export async function putProduct(product, token){
    const {data} = await apiInstance.put('/product', product, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return data
}

export async function getBrands() {
    const { data } = await apiInstance.get('/brands')
    return data
}

export async function getCategories() {
    const { data } = await apiInstance.get('/categories')
    return data
}

export async function getMainColor(){
    const { data } = await apiInstance.get('/mainColor')
    return data
}

export async function getSizes(){
    const { data } = await apiInstance.get('/sizes')
    return data
}