const express = require('express')
const cors = require('cors')
const userRouter = require('./users/users_router')

const server = express()

server.use(express.json())
server.use(cors())

server.use('/api', userRouter)


module.exports = server