const mongoose = require("mongoose");
const express = require("express");

const messageSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    roomId: {type: String, required:true},
    message: {type: String, required: true},
    timestamp: { type: Date, default: Date.now }
})

const model = mongoose.model("Message", messageSchema);

module.exports = model;