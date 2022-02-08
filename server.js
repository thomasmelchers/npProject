const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({ path: './.env' })
const app = require('./app')
const path = require('path')

// CONNECTION TO THE DATABASE

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    /* useCreateIndex: true, */
    /* useFindAndModify: false */
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Failed to connect to MongoDB', err))

// ROUTES
/* app.get('/', (req, res) => {
  res.status(201).json('pret à renvoyer des réponses')
}) */

// PRODUCTION

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, './client/build')))
  app.get('*', (req, res) =>  { res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')) })
} else {
  app.get('/', (req, res) => { res.send('api is running')})
}

// SERVER
const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})