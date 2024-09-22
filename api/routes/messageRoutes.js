const express = require("express");
const mongoose = require("mongoose");
const Message = require("../models/messageModel");


const router = express.Router();


router.get("/:id", async (req, res) => {
    const {roomId} = req.params;

    try {
        
        const messages = await Message.find({roomId: roomId});
        res.status(200).json(messages);

    } catch(err) {
        console.log(err);
        res.status(500).json({message:err});
    };

});



module.exports = router;