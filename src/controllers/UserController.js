// const User = require('../models/User');
const userService = require('../services/userService');
const userDTO = require('../DTO/userDto')

//ADD USER
exports.addUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name?.trim() ||
            !email?.trim() ||
            !password?.trim()) {
            return res.status(400).json({
                message: "All fields are required!"
            })
        }
        const user = await userService.addUser(req.body);
        return res.status(201).json(user);
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

//GET ALL USER
exports.getUser = async (req, res) => {
    try {
        const user = await userService.findUser();
        return res.json(userDTO.usersResponseDTO(user));
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }

}

//GET BY ID
exports.getById = async (req, res) => {
    try {
        const user = await userService.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                message: "User Not Found!"
            })
        }
        return res.status(200).json(userDTO.userResponseDTO(user));
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

//Delete By ID
exports.delById = async (req, res) => {
    try {
        const user = await userService.delById(req.params.id);
        if (!user) {
            return res.status(404).json({
                message: "User Not Found!"
            });
        }
        return res.status(200).json({
            message: "User Deleted!"
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}