// const user = require('../models/User')

exports.userResponseDTO = (user) => {
    return {
        id: user._id,
        name: user.name,
        email: user.email
    }
}
exports.usersResponseDTO = (users) => {
    return users.map(user => ({
        id: user._id,
        name: user.name,
        email: user.email
    }));
}