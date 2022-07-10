const { Router } = require ('express')
const {Category} = require("../db")

const router = Router();

router.get('/', async (req, res, next) => {
    try{
        const categoryName = await Category.findAll({})
        res.status(200).send(categoryName)
    }catch(err){
        next(err)
    }
});

module.exports = router;