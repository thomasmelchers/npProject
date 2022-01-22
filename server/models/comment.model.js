const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    user_id: {
        type: String
    },
    accomodation_id:{
        type: String
    },
    message: {
        type: String,
        minLength: [20, 'The message should have at least 15 characters'],
        maxLength: [400, 'The message could not exceed 400 characters'],
        required: [true, 'Writting a message is mandatory']
    },
    rating: {
        type: Number,
        min: [0, 'Rating must be 0 or over'],
        max: [5, 'Rating must be 5 or below'],
        required: [true, 'According a rate to the cottage is mandatory']
    }
})

const CommentModel = new mongoose.model ('Comment', commentSchema)

module.exports = CommentModel