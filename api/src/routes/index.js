const { Router } = require('express');

const products = require('./products')
const product = require('./product')
const categories = require('./category')
const brands = require('./brands')

const router = Router();

router.use('/products', products);
router.use('/product', product);
router.use('/categories', categories);
router.use('/brands', brands);

module.exports = router;