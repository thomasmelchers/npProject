class AppError extends Error {
    constructor(message, statusCode) {
        super(message) // We are using the parent class to get back our error message

        this.statusCode = statusCode
        this.status = `${statusCode}`.startsWith('4')? 'Fail' : 'Error'
        this.isOperational = true // undefined route or data

        Error.captureStackTrace(this, this.constructor)
    }
}

module.exports = AppError