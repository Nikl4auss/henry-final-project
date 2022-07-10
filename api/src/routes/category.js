const { Router } = require ('express')
const {Category} = require("../db")

const router = Router();

router.get('/', async(req, res,next) => {
    try{
        const categoryName= await Category.findAll()
        const categories = categoryName.map(c => c.name)
        res.status(200).send(categories)
    }catch(err){
        next(err)
    }
});

module.exports = router;