const { auth } = require('express-oauth2-jwt-bearer')

const checkJwt = auth({
    audience: 'http://localhost:3001',
    issuerBaseURL: 'https://dev-a6gv3ggc.us.auth0.com/'
})

module.exports = checkJwt