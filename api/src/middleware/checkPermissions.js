const { claimCheck } = require('express-oauth2-jwt-bearer')

const checkPermissions = claimCheck(claims => {
    return claims["http://localhost:3001/roles"].includes('Admin') && claims.permissions.includes('create:products')
})

module.exports = checkPermissions