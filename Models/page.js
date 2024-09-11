const mongoose = require('mongoose');
const schema = mongoose.Schema


const pageSchema = new schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: schema.Types.ObjectId,
        ref: 'CATEGORY',
        required: true,
        unique: true
    },
    banners: [{
        img: {
            type: String
        },
        navigateTo: {
            type: String
        }
    }],
    products: [{
        img: {
            type: String
        },
        navigateTo: {
            type: String
        }
    }],
    createdBy: {
        type: schema.Types.ObjectId,
        ref: 'USER',
        required: true
    },
    deleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model("PAGES", pageSchema);