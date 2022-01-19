const express = require('express')
const morgan = require('morgan')
const userRoutes = require('./routes/user.routes')

const app = express()

// MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json)

// MOUNTING THE ROUTES

app.route('/api/v1/users')

module.exports = app
