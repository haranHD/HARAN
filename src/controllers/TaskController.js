// const Task = require('../models/Task');
const taskService = require("../services/taskService");


//Add Task:
exports.addTask = async (req, res) => {
    try {
        const { title } = req.body;
        if (!title || title.trim() === "") {
            return res.status(400).json({
                message: "Title can't be Empty or null"
            })
        }
        const task = await taskService.addTask(req.body);
        return res.status(201).json(task);
    }
    catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

//Get Task:
exports.getTask = async (req, res) => {
    try {
        const task = await taskService.getTask();
        return res.status(200).json(task);
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

//Update Task:
exports.updateTask = async (req, res) => {
    try {
        const task = await taskService.updateTask(
            req.params.id,
            req.body,
        );
        if (!task) {
            return res.status(404).json({ message: "Task Not Found!" });
        }

        return res.status(200).json(task);

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

//Delete Task:
exports.delTask = async (req, res) => {
    try {
        const task = await taskService.delTask(req.params.id);
        if (!task) {
            return res.status(404).json({
                message: "Task Not Found!"
            });
        }
        return res.status(200).json({
            message: "Task Deleted!"
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}
