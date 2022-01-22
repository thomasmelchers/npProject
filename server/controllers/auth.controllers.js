const UserModel = require('../models/user.model')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')

module.exports.signUp = catchAsync(async (req, res) => {
  /* try { */
    const newUser = await UserModel.create(req.body)
    res.status(201).json({
      status: 'success',
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
