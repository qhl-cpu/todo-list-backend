const express = require('express');
const Todo = require('../models/todoModel');
const HttpCode = require('../enums/HttpCode');
const auth = require('../middlewares/auth');
const { findAllTodos, createTodo, updateTodo, deleteTodo } = require('../services/todoService');

const router = express.Router();

// GET todo/
router.get('/', async (req, res, next) => {
    try {
        const todos = await findAllTodos();
        return res.status(HttpCode.OK).json(todos);
    } catch (error) {
        next(error);
    }
});

// POST todo/
router.post('/', auth, async (req, res, next) => {
    try {
        const { userId, title, description, category } = req.body;
        const todo = await createTodo(userId, title, description, category);
        return res.status(HttpCode.CREATED).json(todo);
    } catch (error) {
        next(error);
    }
});

// PATCH todo/{id}
router.patch('/:id', auth, async (req, res, next) => {
    try {
        const { id: todoId } = req.params;
        const userId = req.body.userId;
        const updateData = { ...req.body };
        delete updateData.userId;

        const updatedTodo = await updateTodo(todoId, userId, updateData);
        return res.status(HttpCode.OK).json(updatedTodo);
    } catch (error) {
        next(error);
    }
});

// DELETE todo/{id}
router.delete('/:id', auth, async (req, res, next) => {
    try {
        const { id: todoId } = req.params;
        const userId = req.body.userId;
        const deletedTodo = await deleteTodo(todoId, userId);
        return res.status(HttpCode.OK).json(deletedTodo);
    } catch (error) {
        next(error);
    }
});

module.exports = router;