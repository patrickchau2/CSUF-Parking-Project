const bcrypt = require("bcrypt");

// users.js

const saltRounds = 10;
const users = [];

function createHash(password) {
    return bcrypt.hashSync(password, saltRounds);
}

function checkPassword(password, hash) {
    return bcrypt.compareSync(password, hash);
}

function findUserByEmail(email) {
    return users.find((user) => user.email === email);
}

function createUser(email, password) {
    const user = {
        id: users.length + 1,
        email,
        password: createHash(password),
    };
    users.push(user);
    return user;
}

module.exports = {
    createHash,
    checkPassword,
    findUserByEmail,
    createUser,
};