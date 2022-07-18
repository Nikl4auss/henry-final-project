const { Router } = require ('express')
const {Line_cart, Stock, Cart} = require("../db")

const router = Router();

router.get('/', async(req, res, next) => {
    const id = req.params;
    try{


        res.status(200).send('Se agregó el producto al carrito')
    }catch(err){
        next(err)
    }
});

module.exports = router;

