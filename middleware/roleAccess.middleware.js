const UserModel = require('../models/user.model')
const AppError = require('../utils/appError')

// ROLE ACCESS
module.exports.restrictTo = (...roles) => {
    return (req, res, next) => {
      //roles is an array ['admin', 'guest', 'host']
      if(!roles.includes(req.user.role)){
        return next(new AppError('You don\'t have the permission to perform this action', 403)) // 403 = forbidden
      }
      next()
    }
  }