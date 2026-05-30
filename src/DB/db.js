const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/HARAN")
    .then(() => {
        console.log("DB is connected");
    })
    .catch((err) => {
        console.log("ERROR : ", err).message;
    });
