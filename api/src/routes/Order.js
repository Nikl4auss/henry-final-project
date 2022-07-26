const { Router } = require('express');
const { Product, Brand, Category, Image_Product, Gender, MainColor, Size, User, Stock, Store, Address, Order } = require("../db")
const checkJwt = require('../middleware/checkJwt')
const checkPermissions = require('../middleware/checkPermissions')
const router = Router();




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
