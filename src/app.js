require('dotenv').config();//.env config
const express = require('express');
const app = express();
const cors = require('cors');// to handle cors (cross origin resource sharing) bypass the brower's default security

const UserRouter = require('./routes/userRouter');
const TaskRouter = require('./routes/taskRouter');

require('./config/db');// DB config
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173'
}));

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