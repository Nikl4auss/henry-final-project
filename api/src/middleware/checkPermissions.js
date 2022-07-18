const { checkClaims } = require('express-oauth2-jwt-bearer')

const checkPermissions = checkClaims(claims => {
    return claims.permissions.includes('create:products')
})

module.exports = checkPermissions