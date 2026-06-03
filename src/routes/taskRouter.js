const taskController = require('../controllers/TaskController');
const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/authMiddleware')
const role = require('../middleware/roleMiddleware');

//Task
router.get('/allTasks', auth.authenticate, role.authorize('ADMIN'), taskController.getAllTask);
router.post('/addTask', auth.authenticate, taskController.addTask);
router.get('/getTask', auth.authenticate, taskController.getTask);
router.patch('/updateTask/:id', taskController.updateTask);
router.delete('/delTask/:id', taskController.delTask);

module.exports = router;

