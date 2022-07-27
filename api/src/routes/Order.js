const { Router } = require('express');
const { Product, Brand, Category, Image_Product, Gender, MainColor, Size, User, Stock, Store, Address, Order } = require("../db")
const checkJwt = require('../middleware/checkJwt')
const checkPermissions = require('../middleware/checkPermissions')
const router = Router();


router.get('/:id', async (req, res, next)=>{
    const idOrder = req.params.id;
    try{
        if (idOrder) {
            let totalOrders = await Order.findAll();
            let orderById = await totalOrders.filter(o=> o.id == idOrder)
            orderById.length ?
            res.status(200).send(orderById) :
            res.status(404).send('ID unavailable.')
       }
    } catch (error){
        next(error)
    } 
});

router.post('/', async (req, res, next) => {
    try {
        const {
            totalPrice,
            status,
            paymentStatus
        } = req.body
        const newOrder = await Order.create({
            totalPrice,
            status,
            paymentStatus
        })

        res.send(newOrder)

    } catch (error) {
        next(error)
    }
})

module.exports = router;
