const User = require('../models/User');
const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const auth = require('../middleware/authMiddleware');

//USER 
router.post('/userLogin', userController.login);
router.post('/addUser', userController.addUser);
router.get('/getUser', auth.authenticate, userController.getUser);
router.get('/getbyid/:id', auth.authenticate, userController.getById);
router.delete('/delById/:id', auth.authenticate, userController.delById);

module.exports = router;