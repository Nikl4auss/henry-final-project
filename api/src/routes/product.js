const { Router } = require('express');
const {Product, Brand, Category, Image_Product, Gender, MainColor, Size, User, Stock, Store, Address} = require("../db")

const router = Router();

router.get('/', async(req, res, next) => {
    const idProduct = req.query.id;
    try{
        let productById= await Product.findOne({
            where: {
                id : idProduct
            },
            include:[{
                model: Category,
                attributes: ['name']
            },
            {
                model: Brand,
                attributes: ['name']
            },
            {
                model: Image_Product,
                as: 'images',
                attributes: ['image']
            },
            {
                model: Gender,
                attributes: ['name']
            },
            {
                model: Stock,
                attributes: ['stock_product'],
                include: [
                    {
                        model: MainColor,
                        attributes: ['name', 'code']
                    },
                    {
                        model: Size,
                        attributes: ['name']
                    },

                ]
            }]
        })
        res.status(200).send(productById) 

    } catch (error){
    next(error)
    }
});

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
