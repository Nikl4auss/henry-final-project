const { Router } = require ('express')
const {Size, Stock} = require("../db.js")

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


router.get('/', async(req, res, next) => {
    const idSizeProduct = req.query.id;
    try{
        let sizeById= await Stock.findOne({
            where: {
                id : idSizeProduct
            }           
        })
        res.status(200).send(sizeById) 

    } catch (error){
    next(error)
    }
});

module.exports = router;
