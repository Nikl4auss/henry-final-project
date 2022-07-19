const { auth } = require('express-oauth2-jwt-bearer')
const {AUDIENCE, ISSUER_BASE_URL} = require('../utils/config')
const checkJwt = auth({
    audience: AUDIENCE,
    issuerBaseURL: ISSUER_BASE_URL,
})

module.exports = checkJwt