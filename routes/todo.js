const express = require('express');
const Todo = require('../models/todoModel');
const HttpCode = require('../enums/HttpCode');

const router = express.Router();

// all user can see all todos
router.get('/', async(req, res, next) => {
    try {
        return res.status(HttpCode.OK);
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
});

module.exports = router;