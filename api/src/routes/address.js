const { Router } = require('express');
const { Product, Brand, Category, Image_Product, Gender, MainColor, Size, User, Stock, Store, Address } = require("../db")
const checkJwt = require('../middleware/checkJwt')
const checkPermissions = require('../middleware/checkPermissions')
const router = Router();

router.post('/', async (req, res, next) => {
    try {
        const {
            idUser,
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
        const user = user.findOne({
            where: {
                id: idUser
            }
        })
        user.addAddress(newAddress)
        res.send(newAddress)

    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    const idAddress = req.params.id;
    try {
        const addressById = Address.findOne({
            where: {
                id: idAddress
            }
        })
        res.send(addressById)
    }
    catch (error) {
        next(error)
    }
})

router.put('/:id', async (req, res, next) => {
    const idAddress = req.params.id;
    try {
        const addressById = Address.findOne({
            where: {
                id: idAddress
            }
        })
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
        const addressUpdated = await addressById.update({
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
        res.send(addressUpdated)
    }
    catch (error) {
        next(error)
    }
})

router.delete('/:id', async (req, res, next) => {
    const idAddress = req.params.id;
    try {
        // const addressById = await Address.findOne({
        //     where: {
        //         id: idAddress
        //     }
        // })
        await Address.destroy({
            where:{
                id:idAddress
            }
        })
    }
    catch (error) {
        next(error)
    }
})

module.exports = router;
