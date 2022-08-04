const { Router } = require ('express')
const {Line_cart, Stock, Cart, Product, Image_Product, User} = require("../db");

const router = Router();

router.get('/:id', async(req, res, next) => {
    const { id } = req.params;
    try{
        const [ cartUser, created] = await Cart.findOrCreate({
            where: {
                id: id
            },
            defaults: {
                id: id
            },  
            include: [
                {
                    model: Line_cart,
                    include: [
                        {
                            model: Stock,
                            include: [
                                {
                                    model: Product,
                                    include: [
                                        {
                                            model: Image_Product,
                                            as: 'images',
                                            attributes: ['image']
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            order: [['createdAt', 'DESC']]
        })

        if(created){
            const userLog = await User.findOne({
                where: {
                    id: id
                }
            })
            userLog.setCart(cartUser)
            res.send('El carrito fue creado con éxito')
        } else {
            res.status(200).json(cartUser)
        }
    }catch(err){
        next(err)
    }
});

router.delete('/:id', async (req, res, next) => {
    const { id } = req.params
    try {
        const cartOfUser = await Cart.findOne({
            where: {
                id: id
            },
            include: [
                {
                    model: Line_cart
                }
            ]
        })

        cartOfUser.Line_carts.forEach(async (el) => {
            const line = await Line_cart.findOne({
                where: {
                    id: el.id
                }
            })

            await line.destroy()
        })

        res.send('El carrito fue borrado con éxito')
    } catch (error) {
        next(error)
    }
})

module.exports = router;

