const express = require('express');
const app = express();

const UserRouter = require('./routes/userRouter');
const TaskRouter = require('./routes/taskRouter');

require('../src/DB/db');
app.use(express.json());


//Router Mapping
app.use('/api/users', UserRouter); //USER
app.use('/api/users/task', TaskRouter); //TASK


//STARTING point
app.use("/", (req, res) => {
    res.send("API Running...");
})
//PORT
const PORT = 8933;

app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`);
})