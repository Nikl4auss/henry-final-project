const {DB_USER, DB_PASSWORD, DB_HOST, DB_NAME} = require('../../utils/config')

const {Sequelize} = require('sequelize');

const sequelize = new Sequelize(`${DB_USER}:${DB_PASSWORD}@${DB_HOST}:3306/${DB_NAME}`, {
    logging: false
})

module.exports = {
    db: sequelize,
    ...sequelize.models
}