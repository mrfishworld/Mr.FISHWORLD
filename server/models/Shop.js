const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ShopSchema = new Schema({
    name: {
        type: String,
        required: true, // Fix: Change `Boolean` to `true`
    },
    description: {
        type: String,
        required: true, // Fix: Change `Boolean` to `true`
    },
    newPrice: {
        type: String,
        required: true, // Fix: Change `Boolean` to `true`
    },
    oldPrice: {
        type: String,
        required: true, // Fix: Change `Boolean` to `true`
    },
    img: {
        type: String,
        required: true, // Fix: Change `Boolean` to `true`
    }
});



module.exports = mongoose.model('Shop', ShopSchema);