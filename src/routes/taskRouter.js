const taskController = require('../controllers/TaskController');
const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

//Task
router.post('/addTask', taskController.addTask);
router.get('/getTask', taskController.getTask);
router.delete('/delTask/:id', taskController.delTask);

module.exports = router;

