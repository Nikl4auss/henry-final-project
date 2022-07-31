const { Router } = require('express');

const products = require('./products')
const product = require('./product')
const categories = require('./category')
const brands = require('./brands')
const genders = require('./genders')
const sizes = require('./sizes')
const colors = require('./colors')
const stock = require('./stocks')
const line_cart = require('./line_cart')
const payment = require('./payment')
const address = require('./address')
const email = require('./email')
const user = require('./users')
const order = require('./order')
const orders = require('./orders')
const line_order = require('./line_order')
const cart = require('./cart')

const router = Router();

router.use('/products', products);
router.use('/product', product);
router.use('/categories', categories);
router.use('/brands', brands);
router.use('/genders', genders);
router.use('/sizes', sizes);
router.use('/colors', colors);
router.use('/stock', stock)
router.use('/line_cart', line_cart)
router.use('/payment', payment);
router.use('/address', address)
router.use('/email', email)
router.use('/users', user)
router.use('/order', order)
router.use('/orders', orders)
router.use('/line_order', line_order)
router.use('/cart', cart)

module.exports = router;