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

//Update Task:
exports.updateTask = async (req, res) => {
    try {
        const task = await taskService.updateTask(
            req.params.id,
            req.body,
        );
        if (!task) {
            res.status(404).json({ message: "Task Not Found!" });
        }
        else {
            res.status(203).json(task);
        }
    } catch (err) {
        res.status(400).json({
            message: err
        });
    }
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