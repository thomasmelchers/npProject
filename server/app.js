const express = require('express')
const morgan = require('morgan')
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

module.exports = app