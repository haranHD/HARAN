const Task = require('../models/Task');


//Add Task:
exports.addTask = async (req, res) => {
    const task = await Task.create(req.body);
    res.status(201).json(task);
}

//Get Task:
exports.getTask = async (req, res) => {
    const task = await Task.find();
    res.status(200).json(task);
}

//Delete Task:
exports.delTask = async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id);
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