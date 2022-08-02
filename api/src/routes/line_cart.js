const { Router } = require ('express');
//const { EmptyResultError } = require('sequelize/types');
const {Line_cart, Stock, Cart, Op} = require("../db")

const router = Router();

router.post('/:id', async(req, res, next) => {
    const { id } = req.params
    const { id_Cart, quantity } = req.body
    try{
        const [ product, created ] = await Line_cart.findOrCreate({
            where: {
                [ Op.and ]: [
                    {
                        CartId: id_Cart
                    },
                    {
                        StockId: id
                    }
                ]
            },
            defaults: {
                quantity
            }
        })

        if( created ) {
            const idStock = await Stock.findOne({
                where: {
                    id: id
                }
            })

            const cart = await Cart.findOne({
                where: {
                    id: id_Cart
                }
            })

            if(cart.status === 'Vacio'){
                await cart.update({
                    status: 'Pending'
                })
            }

            product.setStock(idStock)
            cart.addLine_cart(product)

        } else {
            const idStock = await Stock.findOne({
                where: {
                    id: id
                }
            })

            if( idStock.stock_product > (product.quantity + quantity)){
                await product.update({
                    quantity: product.quantity + quantity
                })
            } else {
                await product.update({
                    quantity: idStock.stock_product
                })
            }
        }

        res.status(200).send('Se agregó el producto al carrito')
    }catch(err){
        next(err)
    }
});

router.put('/:id', async(req, res, next) => {
    const { id } = req.params
    const { quantity } = req.query;

    try {
        const productInCart = await Line_cart.findOne({
            where: {
                StockId: id
            },
            include: [
                {
                    model: Stock
                }
            ]
        })
        
        if(parseInt(quantity) > 0 && productInCart.Stock.stock_product >= parseInt(quantity)) {
            await productInCart.update({
                quantity: parseInt(quantity) 
            })
            
            res.send('El producto se modificó con éxito')
        } else throw new Error('No se puede modificar la cantidad')

    } catch (error) {
        next(error)
    }
})


router.delete('/:idStock', async (req, res, next) => {
    console.log(req.body)
    const { idStock } = req.params;
    const { idCart } = req.query
    
    await Line_cart.destroy({
        where: {
            [ Op.and ]: [
                {
                    CartId: idCart
                },
                {
                    StockId: idStock
                }
            ]
        }
    })
    
    res.send('El producto fue borrado con éxito')
    
})

router.delete('/all/:idCart', async (req, res, next) => {
    const { idCart } = req.params
    try {
        await Line_cart.destroy({
            where:{
                CartId: idCart
            }
        })
        res.send('El carrito fue vaciado con éxito')
    } catch (error) {
        next(error)
    }
})

module.exports = router;

