const mongoose = require('mongoose');
const schema = mongoose.Schema;

const productSchema = new schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    offer: {
        type: Number
    },
    quantity: {
        type: Number,
        required: true
    },
    productImage: [
        { img: { type: String } }
    ],
    reviews: [
        {
            userId: {
                type: schema.Types.ObjectId,
                ref: "USER"
            },
            review: String
        }
    ],
    category: {
        type: schema.Types.ObjectId,
        ref: "CATEGORY",
        required: true
    },
    createdBy: {
        type: schema.Types.ObjectId,
        ref: "USER",
        required: true
    },
    updatedAt: Date,
    deleted: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })

module.exports = mongoose.model('PRODUCTS', productSchema)