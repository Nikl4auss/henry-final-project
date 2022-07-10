const { Router } = require ('express')
const {Brand} = require("../db")

const router = Router();

router.get('/', async(req, res, next) => {
    try{
        const brandName = await Brand.findAll()
        res.status(200).send(brandName)
    }catch(err){
        next(err)
    }
});

module.exports = router;

