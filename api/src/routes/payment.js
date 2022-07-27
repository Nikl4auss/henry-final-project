const { Router } = require("express");
const router = Router();
const {checkoutCart, statusOrder} = require("../controllers/payments");
//const {statusOrder} = require ('../controllers/payments')
//const EmailCtrl = require('../controllers/mailController.js');


//email route
//router.post('/feedback', EmailCtrl.sendEmail);

router.post("/", checkoutCart)

router.post("/feedback", statusOrder)
// router.post('/feedback', (req,res)=>{
// try {
//     console.log(req.body)
//     res.status(200)
// } catch (error) {
//     console.log(error)
// }
    
// })

module.exports = router;