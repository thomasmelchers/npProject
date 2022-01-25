const UserModel = require('../models/user.model')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const jwt = require('jsonwebtoken')

const maxAge = 3 * 24 * 60 * 60 * 1000
const signToken = id => {
  // the object is the data & payload - secret
 return jwt.sign({ id }, process.env.JWT_SECRET, {
  expiresIn: maxAge,
})}

module.exports.signUp = catchAsync(async (req, res, next) => {
  /* try { */
  const newUser = await UserModel.create({
    firstname: req.body.firstname,
    name: req.body.name,
    gender: req.body.gender,
    dateOfBirth: req.body.dateOfBirth,
    address: req.body.address,
    number: req.body.number,
    postcode: req.body.postcode,
    city: req.body.city,
    country: req.body.country,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  })
  
  const token = signToken(newUser._id)
  
  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  })
  /* } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    })
    console.error(err)
  } */
})

// LOGIN

module.exports.login = catchAsync(async (req, res, next) => {
  //const email = req.body.email
  // const password = req.body.password
  const { email, password } = req.body

  // 1. check if the're are email & password - if they exist
  if (!email || !password) {
    return next(
      new AppError('The email, the password or both are missing', 400)
    )
  }
  // 2. check if the user exists & the password matches
const user = await UserModel.findOne({email: email}).select('+password')
const correct = await user.correctPassword(password, user.password)

if(!user || !correct) {
  return next(new AppError('Incorrect email or password', 401))
}

console.log(user)

  // 3. if everything is ok, send the token to the client
  const token = signToken(user._id)
  res.status(200).json({
    status: 'success',
    token,
  })
})
