const users = require('../data/dbConfig')

module.exports = {
    find,
    insert
}

function find() {
    return users('users')
}

function insert(user) {
    return users('users')
        .insert(user)
       
}

