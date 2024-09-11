const mongoose = require('mongoose');
const schema = mongoose.Schema;

const categorySchema = new schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: String,
        default: null,
    },
    parentId: {
        type: String,   
    },
    categoryImage: {
        type: String,
    },
    deleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model('CATEGORY', categorySchema)