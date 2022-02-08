const router = require('express').Router()
const commentController = require('../controllers/comment.controllers')
const authController = require('../controllers/auth.controllers')
const checkUserAccess_Middleware = require('../middleware/checkUserConnected.middleware')
const roleAccess_Middleware = require('../middleware/roleAccess.middleware')

router.get('/',  checkUserAccess_Middleware.protect, commentController.getAllComments)
router.get('/:id', checkUserAccess_Middleware.protect, commentController.getComment)
router.post('/', checkUserAccess_Middleware.protect, commentController.createComment)
router.patch('/:id', checkUserAccess_Middleware.protect, commentController.updateComment)
router.delete('/:id', checkUserAccess_Middleware.protect, roleAccess_Middleware.restrictTo('admin'), commentController.deleteComment)

module.exports = router