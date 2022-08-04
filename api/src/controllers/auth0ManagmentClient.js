const { ISSUER_BASE_URL, CLIENT_ID, CLIENT_SECRET, DOMAIN } = require('../utils/config')
const ManagementClient = require('auth0').ManagementClient

console.log(DOMAIN)
const managment = new ManagementClient({
  domain: DOMAIN + ".auth0.com",
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
})

module.exports = managment

