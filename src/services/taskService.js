// const Task = require('../models/Task');
const taskRepo = require('../repository/taskRepo');// TASK REPO

//ADD TASK :
exports.addTask = async (tasks) => {
    const task = await taskRepo.addTask(tasks);
    return task;
}

//GET ALL TASK:
exports.getTask = async () => {
    const tasks = await taskRepo.findAll();
    return tasks;
}

//UPDATE TASK:
exports.updateTask = async (ID, data) => {
    return await taskRepo.updateTask(
        ID,
        data,
        { returnDocument: 'after' }
    );
}

//DELETE TASK:
exports.delTask = async (tasks) => {
    const task = await taskRepo.delTask(tasks);
    return task;
}