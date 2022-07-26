const { Router } = require('express');
const { Product, Brand, Category, Image_Product, Gender, MainColor, Size, User, Stock, Store, Address } = require("../db")
const checkJwt = require('../middleware/checkJwt')
const checkPermissions = require('../middleware/checkPermissions')
const router = Router();




router.post('/', async (req, res, next) => {
    try {
        const {
            addressee,
            street,
            number,
            apartment,
            country,
            state, 
            city, 
            postalCode, 
            phone,
            comment
        } = req.body
        const newAddress = await Address.create({
            addressee,
            street,
            number,
            apartment,
            country,
            state, 
            city, 
            postalCode, 
            phone,
            comment
        })

        res.send(newAddress)

    } catch (error) {
        next(error)
    }
})

module.exports = router;
