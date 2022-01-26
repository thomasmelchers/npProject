const router = require('express').Router()
const userController = require('../controllers/user.controllers')
const authController = require('../controllers/auth.controllers')
const checkUserAccess_Middleware = require('../middleware/checkUserConnected.middleware')

// AUTH USER
router.post('/register', authController.signUp)
router.post('/login', authController.login)
router.get('/logout', authController.logout)

// CRUD USER
router.get('/', userController.getAllUsers)
router.get('/:id', userController.getUser)
router.patch('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)

// PASSWORD
router.post('/forgotPassword', authController.forgotPassword)
router.patch('/resetPassword/:token', authController.resetPassword)
router.post('/updatePassword', checkUserAccess_Middleware.protect, authController.updatePassword)

module.exports = router