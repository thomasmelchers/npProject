const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, 'The firstname is mandatory to register'],
      maxlength: [20, 'The maximum length is 20 characters'],
      trim: true,
      validate: [validator.isAlpha, 'The firstname should contain only letters']
    },
    name: {
      type: String,
      required: [true, 'The name is mandatory to register'],
      maxlength: [30, 'The maximum length is 30 characters'],
      trim: true,
      validate: [validator.isAlpha, 'The name should contain only letters']
    },
    gender: {
      type: String,
      required: [true, 'The gender is mandatory to register'],
      maxlength: 1,
      enum: {
        values: ['F', 'M', 'X'],
        message: 'Gender is either: M, F or X',
      },
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'The date of birth is mandatory to register'],
      trim: true,
      validate: {
        validator: function isDate18orMoreYearsOld() {
          let date = new Date(this.dateOfBirth)
          let year = date.getFullYear();
          let month = date.getMonth();
          let day = date.getDate()
          return new Date(year+18, month-1, day) <= new Date();
        },
        message: 'You should have 18 years old to register on Eco-Friendly Cottage'
      }
    },
    address: {
      type: String,
      required: [true, 'The address is mandatory to register'],
      maxlength: [100, 'The maximum length is 100 characters'],
      trim: true,
    },
    number: {
      type: Number,
      required: [
        true,
        'The number of the building where you live is mandatory to register',
      ],
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
      validate: [validator.isAlpha, 'The city name should contain only letters'],
      trim: true,
    },
    country: {
      type: String,
      required: [true, 'The country is mandatory to register'],
      validate: [validator.isAlpha, 'The country name should contain only letters'],
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: [true, 'Your email is already registered'],
      validate: validator.isEmail,
      lowercase: true,
    },
    password: {
      type: String,
      trim: true,
      minLength: [6, 'The password should have at least 6 characters'],
      select: false
    },
    passwordConfirm:{
      type: String,
      trim: true,
      validate: {
        // only work with CREATE/SAVE and not with findbyoneandupdate
        validator: function(el) {
          return el  === this.password
        },
        message: 'Both password don\'t match'
      }
    },
    phoneNb: {
      type: String,
      trim: true,
      default:
        "Your phone number is not registered yet. Don't forget to register it",
    },
    languagesSpoken: {
      type: [String],
      default: "Which language do you speak? Don't forget to register it",
    },
    likes: {
      type: [String],
    },
    post_id: {
      type: [String],
    },
    reservationMake_id: {
      type: [String],
    },
    picture: {
      type: String,
      default: './client/default-user.png',
    },
  },
  {
    timestamps: true,
  }
)

// BCRYPT THE PASSWORD
userSchema.pre('save', async function(next){
  // works if password has been modified
  if (!this.isModified('password')) return next()

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12)
  // Delete the passwordConfirm
  this.passwordConfirm = undefined
  next()
})

// VERYFYING THE PASSWORD FOR AUTHENTICATION
userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword)
}


const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel