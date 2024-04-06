const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ShopSchema = new Schema({
    name: {
        type: String,
        required: Boolean, // Fix: Change `Boolean` to `Boolean`
    },
    description: {
        type: String,
        required: Boolean, // Fix: Change `Boolean` to `Boolean`
    },
    newPrice: {
        type: String,
        required: Boolean, // Fix: Change `Boolean` to `Boolean`
    },
    oldPrice: {
        type: String,
        required: Boolean, // Fix: Change `Boolean` to `Boolean`
    },
    image: {
        data: Buffer, 
        contentType: String, 
        required: Boolean, // Fix: Change `Boolean` to `true`
    }
});



module.exports = mongoose.model('Shop', ShopSchema);