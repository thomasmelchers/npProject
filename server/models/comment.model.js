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
        minLength: 15, 
        maxLength: 300,
        required: [true, 'Writting a message is mandatory']
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        required: [true, 'According a rate to the cottage is mandatory']
    }
})

const CommentModel = new mongoose.model ('Comment', commentSchema)

module.exports = CommentModel