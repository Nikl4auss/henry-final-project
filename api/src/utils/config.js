require('dotenv').config()

const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_HOST = process.env.DB_HOST
const DB_NAME = process.env.DB_NAME
const DATABASE_URL = process.env.DATABASE_URL
const PORT = process.env.PORT || 3001
const ACCESS_TOKEN = process.env.ACCESS_TOKEN
const CLIENT_URL = process.env.CLIENT_URL
const AUDIENCE = process.env.AUDIENCE
const ISSUER_BASE_URL = process.env.ISSUER_BASE_URL
const NODE_ENV = process.env.NODE_ENV
const DB_SSL = NODE_ENV === 'PRODUCTION' ? true : false
const USER_MAILGUN= process.env.USER_MAILGUN
const PASS_MAILGUN= process.env.PASS_MAILGUN
const API_URL=process.env.API_URL

module.exports = {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_NAME,
    DATABASE_URL,
    PORT,
    ACCESS_TOKEN,
    CLIENT_URL,
    AUDIENCE,
    ISSUER_BASE_URL,
    NODE_ENV,
    DB_SSL,
    USER_MAILGUN,
    PASS_MAILGUN,
    API_URL
}