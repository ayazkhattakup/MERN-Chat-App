const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {required:false, type: String},
    email: {required: true, type:String},
    password: {required: true, type: String},
    profilePicture: {required: false, type: String},
});

const model = mongoose.model('User', userSchema);

module.exports = model;