const mongoose = require('mongoose')
const validator = require('validator')

const accomodationSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  cottageName: {
    type: String,
    required: [true, 'The cottage name is mandatory to register'],
    maxlength: [50, 'The maximum length is 50 characters'],
    unique: [true, 'This name is already registred. Please use another one.'],
    trim: true,
    /* validate: [
      validator.isAlpha,
      'The cottage name should contain only letters',
    ], */
  },
  typeOfCottage: {
    type: String,
    required: [true, "Setting the type's cottage is mandatory to register"],
    trim: true,
    enum: {
      values: [
        'cottage', 'hut', 'lodge', 'tepee', 'yurt', 'bed & breakfast', 'treehouse', 'caravan',
      ],
      message: 'This type of cottage is not valid',
    },
  },
  address: {
    type: String,
    required: [true, 'The address is mandatory to register'],
    maxlength: [100, 'The maximum length is 100 characters'],
    trim: true,
  },
  number: {
    type: Number,
    required: [true, 'The number of the building is mandatory to register'],
    trim: true,
  },
  postcode: {
    type: Number,
    required: [true, 'The postcode is mandatory to register'],
    trim: true,
  },
  city: {
    type: String,
    required: [true, 'The city is mandatory to register'],
    maxlength: [163, 'The maximum length is 163 characters'],
    /* validate: [validator.isAlpha, 'The city name should contain only letters'], */
    trim: true,
  },
  country: {
    type: String,
    required: [true, 'The country is mandatory to register'],
    validate: [
      validator.isAlpha,
      'The country name should contain only letters',
    ],
    trim: true,
  },
  pricePerNight:{
    type: Number,
    required: [true, 'A price per Night is mandatory to register your cottage']
  },
  summary: {
    type: String,
    maxlength: 300,
    trim: true,
    required: [true, 'A summary is mandatory to registred your cottage'],
  },
  description: {
    type: String,
    maxlength: 1000,
    trim: true,
    required: [true, 'A description is mandatory to registred your cottage'],
  },
  pictures: {
    type: String,
  },
  ratings: {
    type: [Number],
    default: 4
  },
  comments_id: {
    type: [String],
  },
  labels:{
    type: [String]
  },
  likers: {
    type: [String],
  },
  bookingDate: {
    type: [String],
  },
  reservationId: {
    type: [String],
  },
})

const AccomodationModel = mongoose.model('Accomodation', accomodationSchema)

module.exports = AccomodationModel
