const ApiError = require('../exceptions/HttpError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // assuming you have a User model
const HttpCode = require('../enums/HttpCode');

/**
 * Creates a new user in the database
 * @param information about the new user
 * @returns An object on successful creation
 * @throws Error with a status code of 409 if the user already created
 */
const registerUser = async (email, password, firstName, lastName) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiError(HttpCode.CONFLICT,'Email already taken');
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
        email,
        password: hashedPassword,
        firstName,
        lastName
    });

    return {
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email
    };
};

/**
 * Looks up the given email in the database and checks the correctness of the provided password
 * @param Login info for the user
 * @returns An object for the requested user on successful login
 * @throws ApiError with a status code of 404 if the given user is not found
 * @throws ApiError with a status code of 400 if the provided password is incorrect
 */
const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(HttpCode.NOT_FOUND, `Could not find user with email ${email}`);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new ApiError(HttpCode.BAD_REQUEST, "Incorrect password for user");
    }

    const userObj = user.toObject();
    delete userObj.password;

    const token = jwt.sign(userObj, process.env.MY_SECRET, { expiresIn: "10h" });

    return { token, user: userObj };
};

module.exports = {
    registerUser,
    loginUser
};
