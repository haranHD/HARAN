const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    task: String,
    status: Boolean
})

module.exports = mongoose.model("Task", TaskSchema);