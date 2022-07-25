const { Router } = require('express');
const { Product, Brand, Category, Image_Product, Gender, MainColor, Size, User, Stock, Store, Address } = require("../db")
const checkJwt = require('../middleware/checkJwt')
const checkPermissions = require('../middleware/checkPermissions')
const router = Router();




router.post('/', async (req, res, next) => {
    try {
        const {
            name,
            lastName,
            dni,
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
        const [dbUser] = await User.findOrCreate({
            where: { name: name,
                     lastName: lastName,
                     dni: dni }
        })
        dbUser.addUser(newAddress)

        res.send(newAddress)

    } catch (error) {
        next(error)
    }
})

module.exports = router;
