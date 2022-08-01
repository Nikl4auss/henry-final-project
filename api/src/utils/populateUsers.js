const axios = require('axios')
const { AUTH0_TOKEN } = require('../utils/config')
const { User } = require('../db')
async function populateUsers(){
    try{

        const {data: users} = await axios.get('https://dev-a6gv3ggc.us.auth0.com/api/v2/users', {
            headers: {
                Authorization: `Bearer ${AUTH0_TOKEN}`
            }
        })
        
        await Promise.all(users.map(async user => {
            const {given_name, family_name, email, user_id, name} = user
            console.log('creating user ')
            if(given_name){

                await User.create({
                    name: given_name || name,
                    surname: family_name,
                    email,
                    id: user_id
                })
            }
        }))

        const dbUsers = await User.findAll()
        console.log(dbUsers)
    }
    catch(error){
        console.log(error)
    }

}

module.exports = populateUsers