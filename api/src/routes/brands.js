const { Router } = require ('express')
const {Brand} = require("../db")

const router = Router();

router.get('/', async(req, res, next) => {
    try{
        const brandName= await Brand.findAll()
        const brands = brandName.map(b => b.name)
        res.status(200).send(brands)
    }catch(err){
        next(err)
    }
});

module.exports = router;

