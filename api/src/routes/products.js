const { Router } = require('express');
const axios = require('axios');
const {Product, Brand, Category, Image_Product, Op} = require("../db")


const router = Router();

    async function getDbInfo(name, arrayCategories = [], arrayBrands = []){
    let where={}
    let conditions={}

    if (name){
        where.name = {
            [Op.iLike]: `%${name}%`
        }
        conditions.where = where
    }

    if(arrayCategories.length > 0){
        where["$Categories.name$"]={
            [Op.like]: {
                [Op.any]: arrayCategories
            }
        }
        conditions.where = where
    }

    if(arrayBrands.length > 0){
        where["$Brand.name$"]={
            [Op.like]: {
                [Op.any]: arrayBrands
            }
        }
        conditions.where = where
    }

    conditions.include = [{
            model: Brand,
        },
        {
            model: Category,
            as:"Categories",
            through: {attributes:[]}
        },
        {
            model: Image_Product,
            as: 'images'
        }
    ]  
    let db = await Product.findAll(conditions);
    const finalDb = db.map(d => {
        return {
            id: d.id,
            name: d.name,
            description: d.description,
            model: d.model,
            price: d.price,
            creationDate: d.creationDate,
            updateDate: d.updateDate,
            // brand: d.Brand.name,
            category: d.Categories.map(ct => ct.name),
            image: d.images.map(im => im.image),
            user: d.Users
        }
    })
    return finalDb
};

router.get('/', async (req, res, next)=>{
    const {name, categories, brands} = req.query;
    if(categories){
        var arrayCategories = categories.split(" ")
    }
    if (brands) {
        var arrayBrands = brands.split(" ")
    }
    try{
        let totalProducts = await getDbInfo(name, arrayCategories, arrayBrands);
        // if(arrayCategories.length>0){
        // arrayCategories.forEach(e => {
        // arrayToSend.push(totalProducts.filter(p=>p.category))
        // });
        // }
        res.status(200).send(totalProducts)
    } catch (error){
        next(error)
    } 
});

module.exports = router;
