const { Router } = require ('express')

const router = Router();

router.get('/', async(req, res, next) => {
    const idProduct = req.query.id;
    try{
        let productTotal = await totalProducts();
        if(idProduct){
        let productById = productTotal.filter(r=> r.id == idProduct)
        productById.length ?
        res.status(200).send(productById) :
        res.status(404).send('No se encontró ese producto')
        }
    }catch(err){
        next (err)
}
});


module.exports = router;
