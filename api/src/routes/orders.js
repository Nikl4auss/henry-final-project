const { Router } = require('express')
const { Order, User, Line_order, MainColor, Size, Image_Product, Product, Stock } = require("../db.js");

const router = Router();

router.get('/', async (req, res, next) => {
    const { filter, payment } = req.query
    let conditions = {}
    let where = {}
    if(filter.length > 0) {
        if(filter === 'Todos') conditions = {}
        else {
            where.status = filter;
            conditions.where = where
        }
    }
    try {
        const response = await Order.findAll(conditions)
        res.json(response)
    } catch (err) {
        next(err)
    }
});

router.get('/:userId', async(req, res, next) => {
    const { userId } = req.params
    try{
            const response = await Order.findAll({
                where: {
                    UserId: userId
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
