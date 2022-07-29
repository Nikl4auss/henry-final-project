const { Router } = require ('express')
const {Order, User, Line_order, Stock, MainColor, Size, Image_Product, Product} = require("../db.js");
const checkJwt = require('../middleware/checkJwt')
const checkPermissions = require('../middleware/checkPermissions')

const router = Router();

router.get('/:id', async(req, res, next) => {
    const { id } = req.params
    try{
            const response = await Order.findOne({
                where: {
                    id: id
                }, 
                include: [
                    {
                        model: Line_order,
                        include: [{
                            model: Stock,
                            include: [
                                {
                                    model: MainColor,
                                    attributes: ['name', 'code']
                                },
                                {
                                    model: Size,
                                    attributes: ['name']
                                },
                                {
                                    model: Product,
                                    include: [{
                                        model: Image_Product,
                                        as: 'images'
                                    }]
                                },
                            ]
                        }]
                    }
                ]
            })
            res.json(response)

    }catch(err){
        next(err)
    }
});


module.exports = router;
