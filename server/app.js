const express = require('express')
const morgan = require('morgan')

const AppError = require('./utils/appError')
const errorController = require('./controllers/error.controllers')
const userRoutes = require('./routes/user.routes')
const commentRoutes = require('./routes/comment.routes')

const app = express()

// MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

// MOUNTING THE ROUTES

app.use('/api/v1/users', userRoutes)
app.use('/api/v1/comments', commentRoutes)

app.all('*', (req, res, next) => {
/*   const err = new Error(`Can't find ${req.originalUrl} on this server`)
  err.status = 'fail'
  err.statusCode = 404 */
  next(new AppError(`Can't find ${req.originalUrl} on this server`)) // if there is an error the next function goes directly to err middleware handler. The other middleware will never run ! 
}) 

// ERROR MIDDELWARE HANDLER
app.use(errorController)

module.exports = app