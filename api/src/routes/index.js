const { Router } = require('express');

const products = require('./products')
const product = require('./product')
const categories = require('./category')
const brands = require('./brands')
const genders = require('./genders')
const sizes = require('./sizes')
const colors = require('./colors')
const stock = require('./stocks')
const payment = require('./payment')

const router = Router();

router.use('/products', products);
router.use('/product', product);
router.use('/categories', categories);
router.use('/brands', brands);
router.use('/genders', genders);
router.use('/sizes', sizes);
router.use('/colors', colors);
router.use('/stock', stock)
router.use('/payment', payment);

module.exports = router;