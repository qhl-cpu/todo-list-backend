const ApiError = require('../exceptions/HttpError')
const bcrypt = require('bcrypt');
const User = require('../models/userModel'); // assuming you have a User model
const HttpCode = require('../enums/HttpCode');

/**
 * Creates a new user in the database
 * @param req HTTP request body that contains information about the new user
 * @returns A UserLoginRequestBody object on successful creation
 * @throws Error with a status code of 400 if the user already created
 * @throws Error with a status code of 500 if internal server error returned
 */
const registerUser = async (email, password, firstName, lastName) => {
    const existingUser = await User.findOne({ email });
    console.log(existingUser)
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

module.exports = { registerUser };
