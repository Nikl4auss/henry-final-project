const { Router } = require ('express')
const {Category} = require("../db")

const router = Router();

router.get('/', async(req, res, next) => {
    const name = req.query.name;
    try{
        const categoryName= await Category.filter(d=>d.name.toLowerCase().includes(name.toLowerCase()))
        res.status(200).send(categoryName)
    }catch(err){
        next(err)
    }
});

module.exports = router;