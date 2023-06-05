const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({

    username: {
        type: String,
        required: true,
        minLength: [3, 'username must be at least 3 characters'],
        maxLength: [20, 'username too long!, needs to be under 20 and got {VALUE}'],
        required: [true, 'No username!'],
        unique: true
    },
    email: {
        type: String,
        required: true,
        maxLength: [50, 'email too long!, needs to be under 50 and got {VALUE}'],
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: [6, 'password must be at least 6 characters, got {VALUE}'],
        // maxLength: [40, 'password too long!, needs to be under 40 and got {VALUE}'],
        required: [true, 'No password!']
    },
    isAvatarImageSet: {
        type: Boolean,
        default: false
    },
    avatarImage: {
        type: String,
        default:''
    },

});

module.exports = mongoose.model('User', userSchema);


