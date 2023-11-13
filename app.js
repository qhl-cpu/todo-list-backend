const express = require('express');
const cookieParser = require("cookie-parser");    
const connectDB = require('./dbConfig/db'); 
const { errorHandler } = require('./middlewares/errorHandler');
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

// setup error handling middlewares
app.use(errorHandler);

connectDB(app);

module.exports = app;