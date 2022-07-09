const { Router } = require('express');

const products = require('./products')
const product = require('./product')

const router = Router();

router.use('/products', productsRoute);
router.use('/product', productRoute);
router.use('/categories', categoriesRoute);

module.exports = router;