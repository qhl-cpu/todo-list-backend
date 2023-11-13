const express = require("express");
const ApiError = require("../exceptions/HttpError"); // Adjust the path as per your project structure

const { NextFunction, Request, Response } = express;

const errorLogger = (err, req, res, next) => {
    console.error(err);
    next(err);
};

const errorHandler = (err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.httpCode).send({
            message: err.message,
        });
    }
    return res.status(500).send({
        message: "Internal server error",
        error: err,
    });
};

module.exports = { errorLogger, errorHandler };