const { Router } = require('express');
const { Image_Product, Product, Size, MainColor, Store, Address, Stock, Op } = require("../db");

const router = Router();

router.post('/', async (req, res, next) => {
    try {
        const {
            stock_product,
            size,
            mainColor,
            store,
            idProduct,
        } = req.body

        const newStock = await Stock.create({
            stock_product: parseInt(stock_product, 10)
        })

        const dbProduct = await Product.findByPk(parseInt(idProduct, 10))
        newStock.setProduct(dbProduct)


        if (mainColor) {
            const [dbMainColor] = await MainColor.findOrCreate({
                where: { name: mainColor }
            })
            newStock.setMainColor(dbMainColor)
        }

        if (size) {
            const [dbsize] = await Size.findOrCreate({
                where: { name: size.toString() }
            })
            newStock.setSize(dbsize)
        }


        if (store) {
            const [dbStore] = await Store.findOrCreate({
                where: { name: store }
            })
            newStock.setStore(dbStore)
        }


        res.send(newStock)
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    let { id } = req.params
    try {
        return await Stock.findOne({
            where: { 
                id: id 
            },
            include: [
                { 
                    model: Product,
                    include: [{
                        model: Image_Product,
                        as: 'images'
                    }] 
                }, 
                { 
                    model: MainColor 
                },
                { 
                    model: Size
                }
            ]
        })
            .then((stock) => {
                res.send(stock)
            })
    }
    catch (error) {
        next(error)
    }
})
router.put('/', async (req, res, next)=>{
    let {id, quantity} = req.body
    try {
        const stock = await Stock.findOne({
            where:{ id: id}
        })
        if(quantity <= stock.stock_product){
            let stockUpdate = stock.stock_product - quantity
            await Stock.upsert({
                id: id,
                stock_product : stockUpdate
            })
        res.send('se desconto stock con exito')}
    } catch (error) {
        next(error)
    }
})
module.exports = router;
