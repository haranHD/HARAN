const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: Boolean,
        deafualt: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Task", TaskSchema);