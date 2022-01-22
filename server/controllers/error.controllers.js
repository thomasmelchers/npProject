module.exports = (err, req, res, next) => {
   // This console.log will show in the console the stack error 
   /* console.log(err.stack); */

    err.statusCode = err.statusCode || 500 // The status of the error or 500 which is for internal server error
    err.status = err.status || 'error' // The status code defined or 'error'
    res.status(err.statusCode).json({
       status : err.status,
       message: err.message
    })
  }