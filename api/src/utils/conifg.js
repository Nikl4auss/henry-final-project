require('dotenv')

const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_HOST = process.env.DB_HOST
const DB_NAME = process.env.DB_NAME

module.exports = {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_NAME
}