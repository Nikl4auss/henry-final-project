const { Router } = require('express');

const router = Router();

const products = require('./products')
const product = require('./product')

router.use('/products', products);
router.use('/product', product);

module.exports = router;