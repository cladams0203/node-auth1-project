
const express = require('express')
const cors = require('cors')
const userRouter = require('./users/users_router')
const session = require('express-session')
const KnexSessionStore = require('connect-session-knex')(session)
const db = require('./data/dbConfig')

const sessionConfig = {
    secret: process.env.SESSION_SECRET || 'test secret',
    name: '',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        secure: process.env.NODE_ENV === "production" ? true : false,
        httpOnly: true
    },
    resave: false,
    saveUninitialized: false,
    store: new KnexSessionStore({
        knex: db,
        tableName: 'knexsessions',
        sidfieldname: 'sessionid',
        createTable: true,
        clearInterval: 1000 * 60 * 30,
    })
}

const server = express()

server.use(express.json())
server.use(cors())
server.use(session(sessionConfig))


server.use('/api', userRouter)


module.exports = server