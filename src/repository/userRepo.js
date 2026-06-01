const User = require('../models/User');

//ADD USER:
exports.addUser = async (user) => {
    return await User.create(user);
}

//GET USERS:
exports.findAll = async () => {
    return await User.find();
}

//GET USER BY ID:
exports.findbyID = async (ID) => {
    return await User.findById(ID);
}

//Delete USER:
exports.delUser = async (ID) => {
    return await User.findByIdAndDelete(ID);
}

//FIND BY EMAIL:
exports.findEmail = async (email) => {
    return await User.findOne({ email });
}

