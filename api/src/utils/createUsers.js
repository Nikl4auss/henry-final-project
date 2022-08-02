// const { USERS } = require('./const')
// const { User, Cart } = require("../db")
// const axios = require ("axios");

// const createUsers = function () {
//     try {
//         USERS.map(async (user) => {
//             const {name, surname, email, auth0_id} = user
//             const newUser = await User.create({
//                 name,
//                 surname,
//                 email,
//                 id: auth0_id
//             })
//             const newCart = await Cart.create({
//                 id: auth0_id
//             })
    
//             newCart.setUser(newUser)
//         })
//     } catch (error) {
//         console.log(error)
//     }
// }

// module.exports = {createUsers}