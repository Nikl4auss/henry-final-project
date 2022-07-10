const { Product, Brand, Category, Image_Product } = require('../db')

const PRODUCTS = [
    {
        id: 1,
        name: 'Zapas Piolas',
        description: 'Zapas de piolas de alto rendimiento',
        images: [{image: 'https://http2.mlstatic.com/D_NQ_NP_693424-MLA49985058216_052022-W.jpg', main: true}],
        price: 300.00,
        brand: 'Salomon',
        model: '111TX',
        categories: ['Zapas', 'Piolas'],

    },
    {
        id: 2,
        name: 'Zapas Trancas',
        description: 'Zapas de trancas de alto rendimiento',
        images: [{image: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e78cc288-65f2-4dca-99a5-4c06803f8312/air-force-1-lo-07-zapatillas-RRBKlk.png', main: true}],
        price: 400.00,
        brand: 'Topper',
        model: '111TX',
        categories: ['Zapas', 'Trancas'],
    },
    {
        id: 3,
        name: 'Zapas Raras',
        description: 'Zapas de raras de alto rendimiento',
        images: [{image:'https://d3ugyf2ht6aenh.cloudfront.net/stores/961/362/products/picsart_22-02-25_14-30-14-122-fbc9141bd92e0798c716458106031306-1024-1024.jpg', main: true}],
        price: 500.00,
        brand: 'Umbro',
        model: '111TX',
        categories: ['Zapas', 'Raras'],
    },
    {
        id: 4,
        name: 'Zapas Facheras',
        description: 'Zapas de facheras de alto rendimiento',
        images: [{image: 'https://http2.mlstatic.com/D_NQ_NP_977082-MLA40388822119_012020-W.jpg', main: true}],
        price: 600.00,
        brand: 'Puma',
        model: '111TX',
        categories: ['Zapas', 'Facheras'],
    },
    {
        id: 5,
        name: 'Zapas ?????',
        description: 'Zapas de ????? de alto rendimiento',
        images: [{image:'https://s1.eestatic.com/2021/12/14/omicrono/software/634696947_218344871_1024x576.jpg', main: true}],
        price: 250.99,
        brand: 'Pony',
        model: '111TX',
        categories: ['Zapas', '?????'],

    },
    {
        id: 6,
        name: 'Altas Llantas',
        description: 'Altas llantas de alto rendimiento',
        images: [{image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDFntL9jeQ2pTWyr2kOo0QzuaygQ00oJvF9g&usqp=CAU', main: true}],
        price: 1200.00,
        brand: 'Reebook',
        model: '111TX',
        categories: ['Altas', 'Llantas'],
    },
    {
        id: 7,
        name: 'Altas Piolas',
        description: 'Altas piolas de alto rendimiento',
        images: [{image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDFntL9jeQ2pTWyr2kOo0QzuaygQ00oJvF9g&usqp=CAU', main: true}],
        price: 1200.00,
        brand: 'Reebook',
        model: '111TX',
        categories: ['Altas', 'Piolas'],
    },
]

async function createProduct(data){
    const {name, description, images, price, brand, model, categories} = data
    try{
        const newProduct = await Product.create({
            name,
            description,
            price,
            model
        })

        if(brand){
            const [dbBrand] = await Brand.findOrCreate({
                where: {name: brand}
            })
            newProduct.setBrand(dbBrand)
        
        }

        if(categories.length){
            await Promise.all(categories.map(async category => {
                const [dbCategory] = await Category.findOrCreate({
                    where: {name: category}
                })
                newProduct.addCategory(dbCategory)
            }))
        }

        if(images.length){
            await Promise.all(images.map(async image => {
                const [dbImage] = await Image_Product.findOrCreate({
                    where: {image: image.image}
                })
                newProduct.addImage(dbImage)
            }))
        }
    }
    catch(err){
        console.log(err)
    }
}

async function populateProducts(){
    try{
        await Promise.all(PRODUCTS.map(async product => {
            await createProduct(product)
        }))
    }
    catch(err){
        console.log(err)
    }
}

module.exports = {
    populateProducts,
    createProduct
}