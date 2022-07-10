const { Router } = require ('express')

const router = Router();

router.get('/', async(req, res, next) => {
    const idColorProduct = req.query.id;
    try{
        let colorById= await Stock.findOne({
            where: {
                id : idColorProduct
            }           
        })
        res.status(200).send(colorById) 

    } catch (error){
    next(error)
    }
});


module.exports = router;