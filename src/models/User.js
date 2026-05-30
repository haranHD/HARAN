const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    // id: string,
    name: String,
    email: String,
    password: String
});

module.exports = mongoose.model("User", UserSchema);