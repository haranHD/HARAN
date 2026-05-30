const User = require("../models/User");

exports.addUser = async (userInfo) => {
    const user = await User.create(userInfo);
    return user;
}

exports.findUser = async () => {
    const users = await User.find();
    return users;
}

exports.findById = async (ID) => {
    const user = await User.findById(ID);
    return user;
}

exports.delById = async (id) => {
    const user = await User.findByIdAndDelete(id);
    return user;
}