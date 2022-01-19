const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = require('./app')

dotenv.config({ path: './.env' })

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    /* useCreateIndex: true, */
    /* useFindAndModify: false */
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Failed to connect to MongoDB', err))

const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
