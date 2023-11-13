const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Please enter a email"]
        },
        password: {
            type: String,
            required: [true, "Please enter a password"]
        },
        firstName: {
            type: String,
            required: false,
        },
        lastName: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', userSchema);
