const router = require('express').Router()
const { User } = require('../db')

router.get('/', async (req, res) => {
    try{    
        const users = await User.findAll()
        res.status(200).send(users)
    }
    catch(e) {
        res.status(500).json({
            msg: "Users couldn't be retrieved",
            error: e
        })
    }
})

router.post('/', async (req, res) => {
    const { name, surname, email, user_id } = req.body

    if(!name || !email || !user_id) {
        return res.status(400).json({
            msg: 'There are missing properties, couldn\'t create the user'
        })
    }
    try{
        const newUser = await User.create({
            name,
            surname,
            email,
            auth0_id: user_id
        })

        return res.status(200).json(newUser)
    }
    catch(e){
        res.status(500).json({
            msg: "There was an error during User creation, aborted",
            error: e
        })
    }
})

module.exports = router