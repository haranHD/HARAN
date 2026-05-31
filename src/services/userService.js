// const User = require("../models/User");
const userRepo = require('../repository/userRepo');

exports.addUser = async (userInfo) => {
    const user = await userRepo.addUser(userInfo);
    return user;
}

exports.findUser = async () => {
    const users = await userRepo.findAll();
    return users;
}

exports.findById = async (ID) => {
    const user = await userRepo.findbyID(ID);
    return user;
}

exports.delById = async (id) => {
    const user = await userRepo.delUser(id);
    return user;
}