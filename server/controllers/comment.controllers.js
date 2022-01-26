const CommentModel = require('../models/comment.model')
const UserModel = require('../models/user.model')
const AccomodationModel = require('../models/accomodation.model')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')

module.exports.getAllComments = catchAsync(async (req, res, next) => {
  /* try{ */
  const comments = await CommentModel.find()
  res.status(201).json({
    status: 'success',
    data: {
      comment: comments,
    }
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
  const newComment = await CommentModel.create({
    user_id: req.body.user_id,
    accomodation_id: req.body.accomodation_id,
    message: req.body.message,
    rating: req.body.rating
  })
  const user = await UserModel.findById(req.body.user_id)
  /* if (!user){
    return next(new AppError('This user doesn\'t exist!', 404))
  } */
    user.comment_id.push(newComment._id)
    user.save()

  const accomodation = await AccomodationModel.findById(req.body.accomodation_id)
  /* if (!(req.body.accomodation_id)){
    return next(new AppError('This accomodation doesn\'t exist!', 404))
  } */
  accomodation.comments_id.push(newComment._id)
  accomodation.ratings.push(req.body.rating)
  accomodation.save()

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
