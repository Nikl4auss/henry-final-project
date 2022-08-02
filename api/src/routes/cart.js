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

module.exports = router;

