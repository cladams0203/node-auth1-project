const users = require('../data/dbConfig')

module.exports = {
    find,
    insert,
    findByUsername
}

function find() {
    return users('users')
}

function insert(user) {
    return users('users')
        .insert(user)
       
}
function findByUsername(username) {
    return users('users').where({ username }).first()
}

