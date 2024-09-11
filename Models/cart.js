const mongoose = require("mongoose");
const schema = mongoose.Schema;


const cartSchema = new schema({
    user: {
        type: schema.Types.ObjectId,
        ref: 'USER',
        required: true
    },
    cartItems: [
        {
            product: { type: schema.Types.ObjectId, ref: 'PRODUCTS', required: true },
            quantity: { type: Number, default: 1 },
            // price: { type: Number, required: true }
        }
    ]

}, { timestamps: true })

module.exports = mongoose.model('CART', cartSchema)