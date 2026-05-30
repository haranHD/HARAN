const Task = require('../models/Task');

exports.addTask = async (tasks) => {
    const task = await Task.create(tasks);
    return task;
}

exports.getTask = async () => {
    const tasks = await Task.find();
    return tasks;
}

exports.delTask = async (tasks) => {
    const task = await Task.findByIdAndDelete(tasks);
    return task;
}