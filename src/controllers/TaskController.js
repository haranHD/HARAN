// const Task = require('../models/Task');
const taskService = require("../services/taskService");


//Add Task:
exports.addTask = async (req, res) => {
    const task = await taskService.addTask(req.body);
    res.status(201).json(task);
}

//Get Task:
exports.getTask = async (req, res) => {
    const task = await taskService.getTask();
    res.status(200).json(task);
}

//Delete Task:
exports.delTask = async (req, res) => {
    const task = await taskService.delTask(req.params.id);
    if (!task) {
        res.status(404).json({
            message: "Task Not Found!"
        });
    } else {
        res.status(200).json({
            message: "Task Deleted!"
        });
    }
}