const axios = require('axios')
const { User } = require('../db')
const managment = require('../controllers/auth0ManagmentClient')

async function populateUsers() {
  try {
    const users = await managment.getUsers()
    console.log(users)
    await Promise.all(users.map(async user => {
      const { given_name, family_name, email, user_id, name, blocked } = user
      console.log('creating user ')

      await User.create({
        name: given_name || name,
        surname: family_name,
        email,
        id: user_id,
        blocked: blocked || false
      })
    }))

    const dbUsers = await User.findAll()
    console.log(dbUsers)
  }
  catch (error) {
    console.log(error)
  }

}

module.exports = populateUsers
