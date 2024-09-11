const mongoose = require('mongoose');
const schema = mongoose.Schema;


const userSchema = new schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        min: 1,
        max: 20
    },
    email: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    password: {
        type: String
    },
    profilePicture: {
        type: Object
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },

    userName: {
        type: String,
        index: true,
        trim: true,
        lowercase: true,
        unique: true,
        // required: true,
        default:""
    },


}, { timestamps: true })


module.exports = mongoose.model('USER', userSchema);