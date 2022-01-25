const CommentModel = require('../models/comment.model')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')

module.exports.getAllComments = catchAsync(async (req, res, next) => {
  /* try{ */
  const comments = await CommentModel.find()
  res.status(201).json({
    status: 'success',
    data: {
      comment: comments,
    },
  })
  /* } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    })
    console.log(err)
  } */
})

module.exports.getComment = catchAsync(async (req, res, next) => {
  const comment = await CommentModel.findById(req.params.id)

  // Look if the comment exists or not
  if (!comment) {
    return next(new AppError("This comment ID doesn't exist !", 404))
  }

  res.status(201).json({
    status: 'success',
    data: {
      comment: comment,
    },
  })
})

module.exports.createComment = catchAsync(async (req, res, next) => {
  const newComment = await CommentModel.create(req.body)
  res.status(201).json({
    status: 'success',
    data: {
      comment: newComment,
    },
  })
})

module.exports.updateComment = catchAsync(async (req, res, next) => {
  const updateComment = await CommentModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  )

  // Look if the comment exists or not
  if (!updateComment) {
    return next(new AppError("This comment ID doesn't exist !", 404))
  }

  res.status(201).json({
    status: 'success',
    data: {
      comment: updateComment,
    },
  })
})

module.exports.deleteComment = catchAsync(async (req, res, next) => {
  const deleteComment = await CommentModel.findByIdAndDelete(req.params.id)

  // Look if the comment exists or not
  if (!deleteComment) {
    return next(new AppError("This comment ID doesn't exist !", 404))
  }

  res.status(201).json({
    status: 'success',
    data: null,
  })
})
