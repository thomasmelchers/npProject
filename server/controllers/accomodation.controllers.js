const AccomodationModel = require('../models/accomodation.model')
const UserModel = require('../models/user.model')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')

module.exports.getAllAccomodations = catchAsync(async (req, res, next) => {
  const accomodations = await AccomodationModel.find()
  res.status(201).json({
    status: 'success',
    data: {
      Accomodations: accomodations,
    },
  })
})

module.exports.getAccomodation = catchAsync(async (req, res, next) => {
    const accomodation = await AccomodationModel.findById(req.params.id)

    if(!accomodation){
        return next(new AppError('This accomodation doesn\'t exist.', 404))
    }
    res.status(201).json({
        status: 'success',
        data: {
          accomodation: accomodation,
        },
      })
})

module.exports.createAccomodation = catchAsync(async (req, res, next) => {
    const newAccomodation = await AccomodationModel.create({
        user_id: req.body.user_id,
        cottageName: req.body.cottageName,
        typeOfCottage: req.body.typeOfCottage,
        address: req.body.address,
        number: req.body.number,
        postcode: req.body.postcode,
        city: req.body.city,
        country: req.body.country,
        pricePerNight: req.body.pricePerNight,
        summary: req.body.summary,
        description: req.body.description
    })

    // Update User with the cottage ID
    const user = await UserModel.findById(req.body.user_id)
    user.accomodationOwned = newAccomodation._id
    user.save()

    res.status(201).json({
        status: 'success',
        data: {
          accomodation: newAccomodation,
        },
      })
})

module.exports.updateAccomodation = catchAsync(async (req, res, next) => {
    const updateAccomodation = await AccomodationModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    )

    if (!updateAccomodation) {
        return next(new AppError('This accomodation ID doesn\'t exist', 404))
    }

    res.status(200).json({
        status: 'success',
        data: { updateAccomodation },
    })
})

module.exports.deleteAccomodation = catchAsync(async (req, res, next) => {
    const deleteAccomodation = await AccomodationModel.findByIdAndRemove(
        req.params.id
    )
    if(!deleteAccomodation){
        return next(new AppError('This user ID doesn\'t exist'))
    }

    res.status(200).json({
        status: 'success',
        data: { deleteAccomodation },
      })
})
