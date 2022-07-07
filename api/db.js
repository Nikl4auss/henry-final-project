const {DB_USER, DB_PASSWORD, DB_HOST, DB_NAME} = require('./src/utils/config');

const {Sequelize} = require('sequelize');

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:5432/${DB_NAME}`, {
    logging: false
})

module.exports = {
    db: sequelize,
    ...sequelize.models
}