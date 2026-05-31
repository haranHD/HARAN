const Task = require('../models/Task');

//ADD TASK:
exports.addTask = async (task) => {
    return await Task.create(task);
}

//GET TASKS:
exports.findAll = async () => {
    return await Task.find();
}

//DELETE TASK:
exports.delTask = async (ID) => {
    return await Task.findByIdAndDelete(ID);
}

//UPDATE TASK:
exports.updateTask = async (ID, data) => {
    return await Task.findByIdAndUpdate(
        ID,
        data,
        { returnDocument: 'after' }
    );
}