const mongoose = require('mongoose');
const Todo = require('../models/todoModel'); // Replace with your actual Todo model path
const User = require('../models/userModel'); // Replace with your actual User model path
const connectDB = require('../dbConfig/db')
require('dotenv').config();

const { todos, users } = require('./seedData'); // Replace with your actual seed file path

// connectDB();
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", async () => {
    console.log("Database connected");

    try {
        await resetDatabase();
        console.log('Database has been reset and seeded successfully');
    } catch (error) {
        console.error('Error seeding the database:', error);
    } finally {
        mongoose.connection.close();
    }
});

const resetDatabase = async () => {
    await clearCollections();
    await seedTodos();
    await seedUsers();
}

const clearCollections = async () => {
    await Todo.deleteMany({});
    await User.deleteMany({});
}

const seedTodos = async () => {
    for (const todo of todos) {
        const newTodo = new Todo({
            ...todo,
            userId: new mongoose.Types.ObjectId(todo.userId)
        });
        await newTodo.save();
    }
}

const seedUsers = async () => {
    for (const user of users) {
        const newUser = new User({
            ...user,
            _id: new mongoose.Types.ObjectId(user._id['$oid'])
        });
        await newUser.save();
    }
}
