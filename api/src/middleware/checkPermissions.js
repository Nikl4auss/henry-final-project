const { claimCheck } = require('express-oauth2-jwt-bearer')
const { AUDIENCE } = require('../utils/config')

const checkPermissions = claimCheck(claims => {
  return claims[`${AUDIENCE}/roles`].includes('Admin')
})

module.exports = checkPermissions
