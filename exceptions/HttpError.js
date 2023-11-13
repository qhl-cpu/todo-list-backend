// const HttpCode = require("../enums/HttpCode");

class ApiError extends Error {
    constructor(httpCode, message) {
        super(message);
        this.httpCode = httpCode;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ApiError;

