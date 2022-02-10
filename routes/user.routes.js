const router = require('express').Router()
const userController = require('../controllers/user.controllers')
const authController = require('../controllers/auth.controllers')
const ImageController = require('../controllers/image.controllers')
const checkUserAccess_Middleware = require('../middleware/checkUserConnected.middleware')
const multer = require("multer");

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

//UPLOAD PROFILE IMAGE
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './client/public/images/users');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
      console.log(file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });
  
  router.post("/imageUpload", upload.single("file"), ImageController.imageProfil);

module.exports = router