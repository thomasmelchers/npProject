const crypto = require('crypto')
const UserModel = require('../models/user.model')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const jwt = require('jsonwebtoken')
const sendEmail = require('../utils/email')

// TOKEN CREATION

const maxAge = 3 * 24 * 60 * 60 * 1000
const signToken = (id) => {
  // the object is the data & payload - secret
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  })
}

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id)
  const cookieOptions = {
    maxAge,
    httpOnly: true,
  }
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true
  res.cookie('jwt', token, cookieOptions)
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  })
}

// USER CREATION - SIGN UP

module.exports.signUp = catchAsync(async (req, res, next) => {
  /* try { */
  const newUser = await UserModel.create({
    role: req.body.role,
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

  createSendToken(newUser, 201, res)

  /* const token = signToken(newUser._id)

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  }) */
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
  const user = await UserModel.findOne({ email: email }).select('+password')
  const correct = await user.correctPassword(password, user.password)

  if (!user || !correct) {
    return next(new AppError('Incorrect email or password', 401))
  }
  /* console.log(user) */

  // 3. if everything is ok, send the token to the client
  createSendToken(user, 200, res)
})

// FORGOT PASSWORD
module.exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1. Get the user based on the registred email
  const user = await UserModel.findOne({ email: req.body.email })

  if (!user) {
    return next(new AppError('There is no user with that email address'), 404)
  }

  // 2. Generate random reset
  const resetToken = user.createPasswordResetToken()
  await user.save({ validateBeforeSave: false })

  // 3. Send it to user's email with NodeMailer
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword/${resetToken}`
  console.log(resetURL)

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}. \n if you didn't forget your password, please ignore this email!`

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset Token (valid for 10 min)',
      text: message,
    })
    console.log(sendEmail)

    res.status(200).json({
      status: 'success',
      message: 'Token send to email!',
    })
  } catch (err) {
    console.log(err)
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    await user.save({ validateBeforeSave: false })

    return next(
      new AppError(
        'There is an error to send the email to reset the password. Try it later',
        500
      )
    )
  }
})

// RESET PASSWORD
module.exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1. Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex')

  const user = await UserModel.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  })

  // 2. Set the new password if the token has not expired and the user exists
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400))
  }

  user.password = req.body.password
  user.passwordConfirm = req.body.passwordConfirm
  user.passwordResetToken = undefined
  user.passwordResetExpires = undefined

  await user.save()

  // 3. Update changedPasswordAt proprety for the current user
  //4. Log the user in, send JWT
  createSendToken(user, 200, res)
})

module.exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1. Get the user
  // we are not using findbyidandupdate -> because he won't be verified !
  const user = await UserModel.findById(req.user._id)

  // 2. Check if the current password posted is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(
      new AppError('Your current password is wrong! Please try again.', 401)
    )
  }

  // 3. If correct, update password
  user.password = req.body.password
  user.passwordConfirm = req.body.passwordConfirm
  await user.save()

  // 4. Log user in, send JWT
  createSendToken(user, 200, res)
})

module.exports.logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1, httpOnly: true })
  res.status(200).json({
    status: 'success',
  })
}
