// build in promises function in Node && ES6 destructuring
const { promisify } = require('util')

const UserModel = require("../models/user.model");
const AppError = require("../utils/appError");
const catchAsync = require('../utils/catchAsync')
const jwt = require("jsonwebtoken");

// MIDDLEWARE FUNCTION -> CHECK IF THE USER IS CONNECTED AND CAN ACCESS TO THE PROTECTED PARTS

module.exports.protect = catchAsync(async (req, res, next) => {
    // 1. Check if the token exists
    let token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1]
    }
    /* console.log(token) */
  
    if (!token) {
      return next(
        new AppError('You are not logged in ! Please log in to get access', 401)
      )
    }
  
    // 2. Check if the token is valid
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
    /* console.log(decoded) */
  
    // 3. Check if user still exists
    const currentUser = await UserModel.findById(decoded.id)
    if (!currentUser){
      return next(new AppError('The token belonging to this user does no longer exist', 401))
    }
    // 4. check if user changed password after the token was released
    if (currentUser.changesPasswordAfter(decoded.iat)) {
      return (next ( new AppError('You recently changes your password! Please, log in again.', 401)))
    }
  
    // Granting access to the route
    req.user = currentUser
    res.locals.user = currentUser
    next()
  })
