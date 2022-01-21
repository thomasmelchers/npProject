const UserModel = require('../models/user.model')

module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find()
    res.status(200).json({
      status: 'success',
      data: { users },
    })
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    })
    console.log(err)
  }
}

module.exports.getUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id)
    res.status(200).json({
      status: 'success',
      data: { user },
    })
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    })
    console.error(err)
  }
}

module.exports.updateUser = async (req, res) => {
    try {
        const updateUser = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true})
        res.status(200).json({
          status: 'success',
          data: { updateUser },
        })
      } catch (err) {
        res.status(404).json({
          status: 'failed',
          message: err,
        })
        console.error(err)
      }
}

module.exports.deleteUser = async (req, res) => {
    try {
        const deleteUser = await UserModel.findByIdAndDelete(req.params.id)
        res.status(200).json({
          status: 'success',
          data: { deleteUser },
        })
      } catch (err) {
        res.status(404).json({
          status: 'failed',
          message: err,
        })
        console.error(err)
      }
}