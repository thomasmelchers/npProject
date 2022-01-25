const AppError = require("../utils/appError")

handleCastErrorDB = err => {
   const message = `Invalid ${err.path}: ${err.value}.`
   return new AppError(message, 400)
}

handleDuplicateFieldDB = err => {
   const value = err.keyValue.email
   console.log(value)
   const message = `Duplicate field value: ${value}. Please use another value`
   return new AppError(message, 400)
}

handleValidationErrorDB = err =>{
   const errors = Object.values(err.errors).map(el => el.message)
   const message = `Invalid input data. ${errors.join ('. ')}`
   return new AppError(message, 400)
}
// ERROR SENDED DURING DEV ENV
const sendErrorDev = (err, res) => {
   res.status(err.statusCode).json({
      status : err.status,
      error: err,
      message: err.message,
      stack : err.stack
   })
}

// ERROR SENDED DURING PROD ENV
const sendErrorProd = (err, res) => {
   // Operational, trusted error: send to the client - ie : trying to reach undefined routes or data
   if (err.isOperational){
      res.status(err.statusCode).json({
         status : err.status,
         message: err.message,
      })

      // Programming or other errors : don't leak these errors' details to the client
   } else {
      // log the errors
      console.error('ERROR:', err)

      // message sended 
      res.status(500).json({
         status: 'error',
         message: 'Something went wrong'
      })
   }
}

module.exports = (err, req, res, next) => {
   // This console.log will show in the console the stack error 
   /* console.log(err.stack); */

    err.statusCode = err.statusCode || 500 // The status of the error or 500 which is for internal server error
    err.status = err.status || 'error' // The status code defined or 'error'
    
   // Making difference between DEV & PROD ENV when I've to send errors
   if(process.env.NODE_ENV === 'development') {
      sendErrorDev(err, res)
   } else if (process.env.NODE_ENV === 'production') {
      let error = {...err}
      if (error.name === 'CastError') error = handleCastErrorDB(error)
      if (error.code === 11000) error = handleDuplicateFieldDB(error)
      if (error._message === 'Validation failed') error = handleValidationErrorDB(error)
      sendErrorProd(error, res)
   }    
  }