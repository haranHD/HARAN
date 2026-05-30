const User = require('../models/User');

//ADD USER
exports.addUser = async (req, res) => {
    const user = await User.create(req.body);
    res.status(201).json(user);

}

//GET ALL USER
exports.getUser = async (req, res) => {
    const user = await User.find();
    res.json(user);
}

//GET BY ID
exports.getById = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
}