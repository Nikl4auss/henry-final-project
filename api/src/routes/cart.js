const { Router } = require ('express')
const {Line_cart, Stock, Cart, Product, Image_Product} = require("../db")

const router = Router();

router.get('/:id', async(req, res, next) => {
    const { id } = req.params;
    try{
        const cartUser = await Cart.findOne({
            where: {
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
        res.status(200).json(cartUser)
    }catch(err){
        next(err)
    }
});

module.exports = router;

