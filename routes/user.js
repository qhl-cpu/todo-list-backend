const express = require('express');
const HttpCode = require('../enums/HttpCode');
const { registerUser, loginUser } = require('../services/userService');

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

// POST user/login
router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { token, user } = await loginUser(email, password);

        res.cookie('token', token);
        return res.status(HttpCode.OK).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
