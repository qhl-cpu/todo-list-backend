const express = require('express');
const User = require('../models/userModel');
const HttpCode = require('../enums/HttpCode');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { registerUser } = require('../services/userService');

const router = express.Router();

// POST user/register
router.post('/register', async (req, res, next) => {
    try {
        const { email, password, firstName, lastName } = req.body;

        // can also add password validation check here
        
        const userInfo = await registerUser(email, password, firstName, lastName)
        return res.status(HttpCode.CREATED).json(userInfo);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
