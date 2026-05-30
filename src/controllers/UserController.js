// const User = require('../models/User');
const userService = require('../services/userService');

//ADD USER
exports.addUser = async (req, res) => {
    const user = await userService.addUser(req.body);
    res.status(201).json(user);

}

//GET ALL USER
exports.getUser = async (req, res) => {
    const user = await userService.findUser();
    res.json(user);
}

//GET BY ID
exports.getById = async (req, res) => {
    const user = await userService.findById(req.params.id);
    if (!user) {
        res.status(404).json({
            message: "User Not Found!"
        })
    } else
        res.status(200).json(user);
}

//Delete By ID
exports.delById = async (req, res) => {
    const user = await userService.delById(req.params.id);
    if (!user) {
        res.status(404).json({
            message: "User Not Found!"
        });
    }
    else
        res.status(200).json({
            message: "User Deleted!"
        });
}