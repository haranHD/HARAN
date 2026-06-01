// const User = require("../models/User");
const userRepo = require('../repository/userRepo');
const bcrypt = require('bcrypt');

exports.addUser = async (userInfo) => {
    const existingUser = await userRepo.findEmail(userInfo.email);
    if (existingUser) {
        throw new Error(
            'Email already exists'
        );
    }
    const hashedPassword = await bcrypt.hash(
        userInfo.password,
        10
    )
    userInfo.password = hashedPassword;
    return await userRepo.addUser(userInfo);
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