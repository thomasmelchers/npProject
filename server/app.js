const express = require('express')
const morgan = require('morgan')
const xss = require('xss-clean')
const mongoSanitize = require('express-mongo-sanitize')
const cors = require('cors')

const AppError = require('./utils/appError')
const errorController = require('./controllers/error.controllers')
const userRoutes = require('./routes/user.routes')
const commentRoutes = require('./routes/comment.routes')
const accomodationRoutes = require('./routes/accomodation.routes')
const path = require('path')

const app = express()

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}

app.use(cors('*', corsOptions))

// MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

// DATA SANITIZATION AGAINST NOSQL QUERY INJECTION
app.use(mongoSanitize())

// DATA SANITIZATION AGAINST XSS (html injection)
 app.use(xss())

// MOUNTING THE ROUTES

app.use('/api/v1/users', userRoutes)
app.use('/api/v1/comments', commentRoutes)
app.use('/api/v1/accomodations', accomodationRoutes)

app.all('*', (req, res, next) => {
/*   const err = new Error(`Can't find ${req.originalUrl} on this server`)
  err.status = 'fail'
  err.statusCode = 404 */
  next(new AppError(`Can't find ${req.originalUrl} on this server`)) // if there is an error the next function goes directly to err middleware handler. The other middleware will never run ! 
}) 

// ERROR MIDDELWARE HANDLER
app.use(errorController)

// DEPLOYEMENT 

 __dirname = path.resolve()
 if(process.env.NODE_ENV==='production'){
   app.use(express.static(path.join(__dirname, '/client/build')))
   app.get('*',(req, res)=> {
     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
   })
 }


module.exports = app