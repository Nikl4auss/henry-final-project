const { Router } = require ('express')
const {Gender} = require("../db.js")

const router = Router();

router.get('/', async(req, res, next) => {
    try{
        const getGenders= await Gender.findAll()
        const genders = getGenders.map(gender => gender.name)
        res.status(200).send(genders)
    }catch(err){
        next(err)
    }
});

module.exports = router;
