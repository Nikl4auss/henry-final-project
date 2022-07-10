const { Router } = require ('express')
const {Category} = require("../db")

const router = Router();

<<<<<<< HEAD
router.get('/', async(req, res, next) => {
    try{
        const categoryName= await Category.findAll()
=======
router.get('/', async (req, res, next) => {
    try{
        const categoryName = await Category.findAll({})
>>>>>>> e5ba4505197b83adc9138e0b2011602c03bd9581
        res.status(200).send(categoryName)
    }catch(err){
        next(err)
    }
});

module.exports = router;