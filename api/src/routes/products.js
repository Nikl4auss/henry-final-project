const { Router } = require('express');
const {Product, Brand, Category, Image_Product, Stock, Size, MainColor, Op} = require("../db")


const router = Router();

    async function getDbInfo(name, arrayCategories = [], arrayBrands = []){
    let where={}
    let conditions={}
    let opand = []

    if (name){
        where.name = {
            [Op.iLike]: `%${name}%`
        }
        conditions.where = where
    }

    if(arrayCategories.length > 0){
        opand.push({
            "$Categories.name$": {
            [Op.like]: {
                [Op.any]: arrayCategories
            }
        }})
    }

    if(arrayBrands.length > 0){
        opand.push(
            {
                "$Brand.name$": {
                    [Op.like]: {
                        [Op.any]: arrayBrands
                    }
                }
            }    
        )
    }
    if(opand.length > 0) {
        where = {
            [Op.and]: opand
        }
        conditions.where = where
    }

    conditions.include = [
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
        },
        {
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
        }
    ]  

    let db = await Product.findAll(conditions)
    if(db.length === 0) throw new Error('No se encontraron zapatillas con esos datos')
    return db
};

router.get('/', async (req, res, next)=>{
    const {name, categories, brands} = req.query;
    if(categories){
        var arrayCategories = categories.split("-")
    }
    if (brands) {
        var arrayBrands = brands.split("-")
    }
    try{
        let totalProducts = await getDbInfo(name, arrayCategories, arrayBrands);
        res.status(200).send(totalProducts)
    } catch (error){
        next(error)
    } 
});

module.exports = router;
