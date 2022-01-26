const router = require('express').Router()
const checkUserAccess_Middleware = require('../middleware/checkUserConnected.middleware')
const roleAccess_Middleware = require('../middleware/roleAccess.middleware')
const accomodationController = require('../controllers/accomodation.controllers.js')

router.get('/', accomodationController.getAllAccomodations)
router.get('/:id', accomodationController.getAccomodation)
router.post('/', checkUserAccess_Middleware.protect, roleAccess_Middleware.restrictTo('host'), accomodationController.createAccomodation)
router.patch('/:id', checkUserAccess_Middleware.protect, roleAccess_Middleware.restrictTo('host'), accomodationController.updateAccomodation)
router.delete('/:id', checkUserAccess_Middleware.protect, roleAccess_Middleware.restrictTo('host'), accomodationController.deleteAccomodation)

module.exports = router