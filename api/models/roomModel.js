const mongoose = require("mongoose");



const roomSchema = new mongoose.Schema({
    firstUserId: {
        type: String,
        required: true,
    },
    secondUserId: {
        type: String,
        required: true,
    }
});


const model = mongoose.model("Room", roomSchema);


module.exports = model;



