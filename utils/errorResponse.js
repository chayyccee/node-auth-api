//this creates blueprint for custom error response message

class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode
    }
}

module.exports = ErrorResponse;
