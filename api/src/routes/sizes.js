const { Router } = require ('express')
const {Size} = require("../db.js")

const router = Router();

router.get('/', async(req, res, next) => {
    try{
        const getSizes= await Size.findAll()
        const sizes = getSizes.map(size => size.name)
        res.status(200).send(sizes)
    }catch(err){
        next(err)
    }
});

module.exports = router;
