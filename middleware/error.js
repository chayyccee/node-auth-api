// this is an error handler middleware and it is important because whenever we call next() in express and pass it an error,
// it automatically gets synced with the error handler middleware.

const ErrorResponse =  require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
    let error = { ...err };

    error.message = err.message

    if(err.code === 11000) {
        const messgae = 'Duplicate Field Value Enter';
        error = new ErrorResponse(messgae, 400);
    }

    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map((f) => f.message);
        error = new ErrorResponse(message, 400);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || "Server Error"
    });
}

module.exports = errorHandler;
