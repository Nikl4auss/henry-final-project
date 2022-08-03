const { Router } = require('express')
const { Order, User, Line_order, MainColor, Size, Image_Product, Product, Stock, Op } = require("../db.js");

const router = Router();

router.get('/', async (req, res, next) => {
    const { filter, payment } = req.query
    let conditions = {}
    let where = {}
    if(filter !== 'empty') {
        if(filter === 'Todos') conditions = {}
        else {
            where.status = filter;
            conditions.where = where
        }
    }   
    if(payment !== 'empty'){
        if(payment === 'Todos') conditions = {}
        else {
            where.payment_status = payment;
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

router.put('/:id', async (req, res, next) => {
    const { id } = req.params
    const { status, payment_status } = req.body

    try {
        const order = await Order.findOne({
            where: {
                id: id
            }
        })

        if(status.length > 0 && payment_status > 0){
            await order.update({
                status: status,
                payment_status: payment_status
            })
        } else if( status.length > 0) {
            await order.update({
                status: status
            })
        } else if (payment_status.length > 0) {
            await order.update({
                payment_status: payment_status
            })
        }

        res.send('La orden fue actualizada con éxito')
    } catch (error) {
        next(error)
    }
})

module.exports = router;
