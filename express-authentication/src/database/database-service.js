let users = [
    {
        id: 1,
        username: "test@test.test",
        password: "test",
    }
]

const findOne = (username) => {
    return users.find(user => user.username === username);
}

const registerOne = (username, password) => {
    const user = {
        id: users.length + 1,
        username: username,
        password: password,
    }
    users.push(user);
}

module.exports = {
    findOne,
    registerOne
}