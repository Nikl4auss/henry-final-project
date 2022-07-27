const { Router } = require('express')
const { Order, User } = require("../db.js");

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        const response = await Order.findAll()
        res.json(response)
    } catch (err) {
        next(err)
    }
});


module.exports = router;
