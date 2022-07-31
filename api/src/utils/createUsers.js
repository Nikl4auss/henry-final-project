const { USERS } = require('./const')
const { User } = require("../db")
const axios = require ("axios");

const createUsers = function () {
    try {
        USERS.map(async (user) => {
            const {name, surname, email, auth0_id} = user
            await User.create({
                name,
                surname,
                email,
                id : auth0_id
            })
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {createUsers}