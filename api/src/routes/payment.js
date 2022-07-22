const { Router } = require("express");
const router = Router();
const checkoutCart = require("../controllers/payments");


router.post("/", checkoutCart)

router.post('/feedback', (req,res)=>{
try {
    res.send('recibimos el pago')
} catch (error) {
    console.log(error)
}
    
})

module.exports = router;