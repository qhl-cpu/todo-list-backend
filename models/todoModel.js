const mongoose = require('mongoose')

const todoSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            ref: 'User',
            required: [true, "Please enter a userId for the todo item"]
        },
        title: {
            type: String,
            required: [true, "Please enter a todo title"]
        },
        description: {
            type: String,
            required: false,
        },
        category: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true
    }
)

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;