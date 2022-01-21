const router = require('express').Router()
const userController = require('../controllers/user.controllers')
const authController = require('../controllers/auth.controllers')

// CRUD USER
router.get('/', userController.getAllUsers)
router.get('/:id', userController.getUser)
router.patch('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)
/* router.get('/', userController.getAllUser) */

// AUTH USER
router.post('/register', authController.signUp)


module.exports = router