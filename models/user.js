// models/user.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    race: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    packingList: {
        type: [String],
        required: false
    }
});


const User = mongoose.model('User', userSchema, 'users');
module.exports = User;
