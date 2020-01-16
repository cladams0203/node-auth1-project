const router = require('express').Router()

const users = require('./usersDb')

router.get('/users', (req,res) => {
    users.find()
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => console.log(err))
})

router.post('/register', (req,res) => {
    const { username, password } = req.body
    users.insert({ username, password })
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => console.log(err))
})

module.exports = router