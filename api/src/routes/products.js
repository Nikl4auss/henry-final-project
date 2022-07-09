const { Router } = require('express');
const axios = require('axios');
const {Product, Brand, Category, Image_Product, Op} = require("../db")


const router = Router();

    async function getDbInfo(name, arrayCategories=[]){
    let where={}
    let conditions={}
    if (name){
        where.name = {
            [Op.iLike]:`%${name}%`
        }
        conditions.where = where
    }
    if(arrayCategories.length>0){
        where["$Categories.name$"]={
            [Op.like]:{[Op.any]:arrayCategories}
        }
        conditions.where=where
    }
    console.log(arrayCategories)
    console.log(where)
    conditions.include = [{
        model: Brand,
        attributes: ['name']
    },
    {
        model: Category,
        as:"Categories",
        attributes: ['name'],
        through: {attributes:[]}
    },
    {
        model: Image_Product,
        attributes: ['image']
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
            brand: d.Brands,
            category: d.Categories,
            image: d.Image_Products,
            user: d.Users
        }
    })
    return finalDb
};

router.get('/', async (req, res, next)=>{
    const {name, categories, brands} = req.query;
    if(categories){
        console.log(categories)
        var arrayCategories = categories.split(" ")
    }
    let arrayToSend = []
    try{
        let totalProducts = await getDbInfo(name, arrayCategories);
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
