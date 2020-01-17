const router = require('express').Router()
const bcrypt = require('bcryptjs')
const users = require('./usersDb')

router.get('/users', validateToken, (req,res) => {
    users.find()
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => console.log(err))
})

router.post('/register', (req,res) => {
    const { username, password } = req.body
    users.insert({ username, password: bcrypt.hashSync(password, 4) })
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: 'failed to register a new user'})
        })
})

router.post('/login', (req,res) => {
    const { username, password } = req.body
    users
        .findByUsername(username)
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)) {
                req.session.user = user
                res.status(200).json({message: 'logged in'}) 
            }else {
                res.status(401).json({message: 'unauthorized'})
            }
            
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: 'failed to register a new user'})
        })
})

function validateToken(req,res,next) {
    if (req.session && req.session.user) {
        next()
    }else {
        res.status(401).json({message: 'unauthorized'})
    }
    
}

module.exports = router