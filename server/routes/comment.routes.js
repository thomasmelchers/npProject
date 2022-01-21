const router = require('express').Router()
const commentController = require('../controllers/comment.controllers')
const userController = require('../controllers/user.controllers')

router.get('/', commentController.getAllComments)
router.get('/:id', commentController.getComment)
router.post('/', commentController.createComment)
router.patch('/:id', commentController.updateComment)
router.delete('/:id', commentController.deleteComment)

module.exports = router