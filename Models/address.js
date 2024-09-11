const mongoose = require('mongoose');
const schema = mongoose.Schema

const addressSchema = new schema({
    houseName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 50
    },
    mobileNumber: {
        type: String,
        required: true,
        trim: true
    },
    pincode: {
        type: String,
        required: true,
        trim: true
    },
    locality: {
        type: String,
        required: true,
        trim: true,
        min: 10,
        max: 100
    },
    state: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    landmark: {
        type: String,
        required: true,
        trim: true
    },
    addressType: {
        type: String,
        required: true,
        enum: ['home', 'work'],
        default: 'home'
    }
});

const userAddressSchema = new schema({
    user: {
        type: schema.Types.ObjectId,
        ref: 'USER',
        required: true
    },
    address: [addressSchema]

}, { timestamps: true });



module.exports = mongoose.model('ADDRESS', userAddressSchema)