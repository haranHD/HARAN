// const User = require("../models/User");
const userRepo = require('../repository/userRepo');
const bcrypt = require('bcrypt');


//user adding:
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

//LOGIN:
exports.login = async (email, password) => {
    const user = await userRepo.findEmail(email);
    if (!user) {
        throw new Error("Invalid user email");
    }
    const isMatch = await bcrypt.compare(
        password,
        user.password
    );
    if (!isMatch) {
        throw new Error("Invalid Password");
    }
    return user;
}

//get all user:
exports.findUser = async () => {
    const users = await userRepo.findAll();
    return users;
}

//finding user by ID:
exports.findById = async (ID) => {
    const user = await userRepo.findbyID(ID);
    return user;
}


//delete user by ID:
exports.delById = async (id) => {
    const user = await userRepo.delUser(id);
    return user;
}