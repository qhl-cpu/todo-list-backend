const express = require('express');
const cookieParser = require("cookie-parser");    
const connectDB = require('./dbConfig/db'); 
require('dotenv').config();

const userRouter = require('./routes/user');
const todoRouter = require('./routes/todo');

const app = express();
app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use(cookieParser());
app.use(express.json())
app.use('/user', userRouter);
app.use('/todo', todoRouter);

connectDB(app);
  

module.exports = app;