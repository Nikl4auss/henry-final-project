const { Router } = require('express');

const products = require('./products')
const product = require('./product')
const categories = require('./category')
const brands = require('./brands')
const genders = require('./genders')
const sizes = require('./sizes')
const stock = require('./stocks')

const router = Router();

router.use('/products', products);
router.use('/product', product);
router.use('/categories', categories);
router.use('/brands', brands);
router.use('/genders', genders)
router.use('/sizes', sizes)
router.use('/stock', stock)

module.exports = router;