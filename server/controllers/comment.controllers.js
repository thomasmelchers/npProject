const CommentModel = require('../models/comment.model')

module.exports.getAllComments = async (req, res) => {
  try{
    const comments = await CommentModel.find()
      res.status(201).json({
        status: 'success',
        data: {
          comment: comments,
        },
      })
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    })
    console.log(err)
  }
}

module.exports.getComment = async (req, res) => {
  try{
    const comment = await CommentModel.findById(req.params.id)
      res.status(201).json({
        status: 'success',
        data: {
          comment: comment,
        },
      })
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    })
    console.log(err)
  }
}
module.exports.createComment = async (req, res) => {
  try {
    const newComment = await CommentModel.create(req.body)
    res.status(201).json({
      status: 'success',
      data: {
        comment: newComment,
      },
    })
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    })
    console.log(err)
  }
}
module.exports.updateComment = async (req, res) => {
  try{
    const updateComment = await CommentModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true})
      res.status(201).json({
        status: 'success',
        data: {
          comment: updateComment,
        },
      })
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    })
    console.log(err)
  }
}

module.exports.deleteComment = async (req, res) => {
  try{
    const deleteComment = await CommentModel.findByIdAndDelete(req.params.id)
      res.status(201).json({
        status: 'success',
        data: {
          comment: deleteComment,
        },
      })
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    })
    console.log(err)
  }
}
