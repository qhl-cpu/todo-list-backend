const express = require('express');
const cookieParser = require("cookie-parser");
const mongoose = require('mongoose');      
require('dotenv').config();

const userRouter = require('./routes/user');
const todoRouter = require('./routes/todo');

const app = express()

app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use(cookieParser());
app.use(express.json())
app.use('/user', userRouter);
app.use('/todo', todoRouter);

mongoose.connect('mongodb+srv://admin:Qhl123456@cluster0.qccwk1a.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(() => {
    console.log('connected to mongoDB')
    app.listen(3000, ()=> {
        console.log("Node API app is running on port 3000")
    })
}).catch((error) => {
    console.log(error)
})
  

module.exports = app;