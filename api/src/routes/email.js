const { Router } = require ('express')
const EmailCtrl = require('../controllers/mailController.js');
const router = Router();

//email route
router.post('/', EmailCtrl.sendEmail);

module.exports = router;