const User = require('../models/User');
const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

//USER 
router.post('/userLogin', userController.login);
router.post('/addUser', userController.addUser);
router.get('/getUser', userController.getUser);
router.get('/getbyid/:id', userController.getById);
router.delete('/delById/:id', userController.delById);

module.exports = router;