const User = require('../models/User');
const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');

//USER 
router.post('/login', userController.login);
router.post('/addUser', userController.addUser);
router.get('/getUser', auth.authenticate, role.authorize('ADMIN'), userController.getUser);//GET ALL USER ONLY BY ADMIN
router.get('/getbyid/:id', auth.authenticate, userController.getById);
router.delete('/delById/:id', auth.authenticate, role.authorize('ADMIN'), userController.delById);//DELETE A USER ONLY BY ADMIN
router.get('/profile', auth.authenticate, userController.profile);// PROFILE 

module.exports = router;