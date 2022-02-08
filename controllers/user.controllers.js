const UserModel = require('../models/user.model')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')

module.exports.getAllUsers = catchAsync(async (req, res, next) => {
  /* try { */
  const users = await UserModel.find()
  res.status(200).json({
    status: 'success',
    result: users.length,
    data: { users },
  })
  /* } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    })
    console.log(err)
  } */
})

module.exports.getUser = catchAsync(async (req, res, next) => {
  const user = await UserModel.findById(req.params.id)

  // if the user doesn't exist ! 
  if (!user) {
    return next(new AppError("This user ID doesn't exist !", 404))
  }

  res.status(200).json({
    status: 'success',
    data: { user },
  })
})

module.exports.updateUser = catchAsync(async (req, res, next) => {
  const updateUser = await UserModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  )

  // if the user doesn't exist ! 
  if (!updateUser) {
    return next(new AppError("This user ID doesn't exist !", 404))
  }

  res.status(200).json({
    status: 'success',
    data: { updateUser },
  })
})

module.exports.deleteUser = catchAsync(async (req, res, next) => {
  const deleteUser = await UserModel.findByIdAndDelete(req.params.id)

  // if the user doesn't exist ! 
  if (!deleteUser) {
    return next(new AppError("This user ID doesn't exist !", 404))
  }

  res.status(200).json({
    status: 'success',
    data: { deleteUser },
  })
})
