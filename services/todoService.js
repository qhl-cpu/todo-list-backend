const ApiError = require('../exceptions/HttpError');
const HttpCode = require('../enums/HttpCode');
const Todo = require('../models/todoModel');

/**
 * Find all todo items
 * @returns A list of todo item object on successful fetching
 */
const findAllTodos = async () => {
    return await Todo.find({});
};

/**
 * Creates a new todo item in the database
 * @param Basic information about the new user(userId, title, description, category)
 * @returns An object on successful creation
 */
const createTodo = async (userId, title, description, category) => {
    // it's better to add user id verification to avoid spam todo items.
    const newTodo = new Todo({
        userId,
        title,
        description,
        category
    });
    return await Todo.create(newTodo);
};

/**
 * Look up the todo item with the given userId in the database and updates its information with information provided in the request.
 * @param todoId The id of the todo item
 * @param userId The id of the user, updateData
 * @param updateData data should be updated
 * @returns Updated information for the specified todo item
 * @throws Error with a status code of 404 if the todo item with given todoId does not exist
 * @throws Error with a status code of 403 if the user does not have permission to edit
 */
const updateTodo = async (todoId, userId, updateData) => {
    const todo = await Todo.findById(todoId);
    if (!todo) {
        throw new ApiError(HttpCode.NOT_FOUND, `Could not find todo item with id ${todoId}`);
    }
    if (todo.userId.toString() !== userId) {
        throw new ApiError(HttpCode.FORBIDDEN, `User is not authorized to update this Todo item`);
    }
    
    return await Todo.findByIdAndUpdate(todoId, updateData, { new: true });
};

/**
 * Look up the todo item with the given userId in the database and delete it.
 * @param todoId The id of the todo item
 * @param userId The id of the user
 * @returns Inform that the specified todo item is deleted
 * @throws Error with a status code of 404 if the todo item with given todoId does not exist
 * @throws Error with a status code of 403 if the user does not have permission to delete
 */
const deleteTodo = async (todoId, userId) => {
    const todo = await Todo.findById(todoId);
    if (!todo) {
        throw new ApiError(HttpCode.NOT_FOUND, `Could not find todo item with id ${todoId}`);
    }
    if (todo.userId.toString() !== userId) {
        throw new ApiError(HttpCode.FORBIDDEN, `User is not authorized to update this Todo item`);
    }
    return await Todo.deleteOne({ _id: todoId });
};

module.exports = {
    findAllTodos,
    createTodo,
    updateTodo,
    deleteTodo
};
