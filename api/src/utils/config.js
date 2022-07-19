require('dotenv').config()

const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_HOST = process.env.DB_HOST
const DB_NAME = process.env.DB_NAME
const PORT = process.env.PORT || 3001
const ACCESS_TOKEN = process.env.ACCESS_TOKEN
const CLIENT_URL = process.env.CLIENT_URL
module.exports = {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_NAME,
    PORT,
    ACCESS_TOKEN,
    CLIENT_URL
}