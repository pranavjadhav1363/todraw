const mongoose = require('mongoose')


const UserSchema = mongoose.Schema({
    Username: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        unique: true,
        required: true
    },
    Password: {
        type: String,
        required: true,
    },
    Gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true,
    },

}, { timestamps: true })


const User = mongoose.model('User', UserSchema)
module.exports = User