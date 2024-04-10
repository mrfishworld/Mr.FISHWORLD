const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: {
        type: String,
        required: true, // Changed from Boolean to true to make it required
        unique: true,
    },
    email: {
        type: String,
        required: true, // Changed from Boolean to true to make it required
        unique: true,
    },
    password: {
        type: String,
        required: true, // Changed from Boolean to true to make it required
    },
    isAdmin: { 
        type: Boolean, 
        default: false 
    },
    resetPasswordToken: String, // New field for reset password token
    resetPasswordExpires: Date // New field for reset password token expiration
});

module.exports = mongoose.model('User', UserSchema);
