const { Router } = require ('express')
const {Line_cart, Stock, Cart} = require("../db")

const router = Router();

router.post('/:id', async(req, res, next) => {
    const id = req.params;
    try{
        const product = await Line_cart.create({
            quantity
        })

        const idStock = await Stock.findOne({
            where: {
                id: id
            }
        })

        const cart = await Cart.update({
            status: 'pending'
        })

        idStock.addLine_cart(product)

        res.status(200).send('Se agregó el producto al carrito')
    }catch(err){
        next(err)
    }
});

router.put('/:id', async(req, res, next) => {
    const id = req.params
    const quantity = req.query;

    try {
        const productInCart = await Line_cart.findOne({
            where: {
                id: id
            }
        })
        await productInCart.update({
            quantity: quantity
        })  
    } catch (error) {
        next(error)
    }
})

module.exports = router;

