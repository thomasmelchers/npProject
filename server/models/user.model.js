const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { isEmail} = require('validator')

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'The firstname is mandatory to register'],
    maxlength: 20,
    trim: true
  },
  name: {
    type: String,
    required: [true, 'The name is mandatory to register'],
    maxlength: 30,
    trim: true
  },
  gender: {
    type: String,
    required: [true, 'The gender is mandatory to register'],
    maxlength: 1,
    trim: true
  },
  dateOfBirth:{
    type: Date, 
    required: [true, 'The date of birth is mandatory to register'],
    trim: true,
    /* default: function() {
      let bithdate18 = new Date(this.dateOfBirth, res[1], res[2], res[3]
      if (Date.now() - this.dateOfBirth) {
        return 'You need to have 18 years to log in'
      } */
  },
  address:{
    type: String,
    required: [true, 'The address is mandatory to register'],
    maxlength: 100,
    trim: true
  },
  number: {
    type: Number,
    required: [true, 'The number of the building where you live is mandatory to register'], 
    trim: true
  },
  postcode: {
    type: Number,
    required: [true, 'The postcode is mandatory to register'], 
    trim: true
  },
  city: {
    type: String,
    required: [true, 'The city is mandatory to register'],
    maxlength: 163,
    trim: true
  },
  country: {
    type: String,
    required: [true, 'The country is mandatory to register'],
    trim: true
  },
  email:{
    type: String,
    required: true,
    trim: true,
    unique: [true, 'Your email is already registered'],
    validate: [isEmail],
    lowercase: true,
  },
  password:{
    type: String,
    trim: true,
    minLength: 6
  },
  phoneNb:{
    type: String,
    trim: true,
    default: 'Your phone number is not registered yet. Don\'t forget to register it'
  },
  languagesSpoken:{
    type: [String],
    default: 'Which language do you speak? Don\'t forget to register it'
  },
  likes:{
    type: [String]
  },
  post_id:{
    type: [String]
  },
  reservationMake_id:{
    type: [String]
  }, 
  picture: {
    type: String,
    default: './client/default-user.png'
  }
},
{
    timestamps: true
})

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;