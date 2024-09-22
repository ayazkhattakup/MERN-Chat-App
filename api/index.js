const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Message = require("./models/messageModel");
const http = require("http");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const Room = require("./models/roomModel");


const app = express();
app.use(express.json());

const corsOptions = {
    origin:"http://localhost:3000",
    methods: "GET,POST,PATCH,DELETE",
    allowedHeaders:['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const databaseURI = "mongodb://localhost:27017/mydb";

mongoose.connect(databaseURI)
 .then(() => console.log("Connected to database"))
 .catch(err => console.log("Error connecting to database: ", err));

const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");

app.use('/users', userRoutes);
app.use('/message', messageRoutes);


const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    }
});

io.on("connection", (socket) => {

    // Handle sending a message
    socket.on("sendMessage", async (data) => {
        const { userId, roomId, message } = data;

        // Save the new message to the database
        const newMessage = new Message({ userId, roomId, message });
        await newMessage.save();

        io.to(roomId).emit("receiveMessage", { newMessage });
    });

    socket.on("joinRoom", async ({ token, otherUserId }) => {
        try {
            const decoded = jwt.verify(token, "secret_key");
            const currentUserId = decoded.id;

            let room = await Room.findOne({
                $or: [
                    { firstUserId: currentUserId, secondUserId: otherUserId },
                    { firstUserId: otherUserId, secondUserId: currentUserId }
                ]
            });

            if (!room) {
                room = new Room({
                    firstUserId: currentUserId,
                    secondUserId: otherUserId
                });
                await room.save();
            }

            console.log("Room id is :", room._id);

            socket.join(room._id.toString());

            const messages = await Message.find({ roomId: room._id });
            socket.emit("roomJoined", { roomId: room._id, messages: messages });

        } catch (error) {
            console.error("Error joining room:", error);
            socket.emit("error", { message: "Failed to join room." });
        }
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

const port = 8080;

server.listen(port, () => {
    console.log("Express Server running on port: ", port);
})
