const { Router } = require('express');
const axios = require('axios');
const {Product, Brand, Category, Image_Product} = require("../db")

const router = Router();

router.post('/', async (req, res, next)=>{
    try{
    const {
       name,
       description,
       model,
       price,
       brand,
       category,
       image
           } = req.body
     const newProduct = await Product.create({     
        name,
        description,
        model,
        price
       })
const [dbBrand] = await Brand.findOrCreate({
    where: {name: brand}
})
dbBrand.addProduct(newProduct)

if(category){
    for(i=0; i < category.length; i++){
    const [dbCategory] = await Category.findOrCreate({
        where: {name: category[i]}
    })
    newProduct.addCategory(dbCategory)
    }
}

if(image){
    for(i=0; i < image.length; i++){
    const [dbImage] = await Image_Product.findOrCreate({
        where: {image: image[i]}
    })
    newProduct.addImage_Product(dbImage)
    }
}

    res.send(newProduct)
    } catch (error){
        next(error)
    }
})

module.exports = router;