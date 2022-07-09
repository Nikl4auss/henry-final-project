const { Router } = require ('express')
const {Brand} = require("../db")

const router = Router();

router.get('/', async(req, res, next) => {
    const name = req.query.name;
    try{
        const brandName= await Brand.filter(d=>d.name.toLowerCase().includes(name.toLowerCase()))
        res.status(200).send(brandName)
    }catch(err){
        next(err)
    }
});

module.exports = router;

