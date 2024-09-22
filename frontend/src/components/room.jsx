import React, { useContext, useEffect, useState } from "react";
import Message from "./messageComponent";
import { useParams } from "react-router-dom";
import MessageInput from "./messageInput";
import { Context } from "../context/context";
import { jwtDecode } from "jwt-decode";
import RoomNavbar from "./roomNavbar";

export default function Room() {
    const context = useContext(Context);
    const { id } = useParams();
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        context.setCurrentRoomUserId(id);
        context.setCurrentRoomId(id);
        const token = context.token;

        context.socket.emit("joinRoom", { token, otherUserId: id });

        context.socket.on("roomJoined", ({ roomId, messages }) => {
            context.setCurrentRoomId(roomId);
            console.log(messages)
            setMessages(messages);
        });

        context.socket.on("receiveMessage", ({ newMessage }) => {
            setMessages(prevMessages => [...prevMessages, newMessage]);
        });

        context.setMessage('');

        return () => {
            context.socket.off("roomJoined");
            context.socket.off("receiveMessage");
        };
    }, [id]);

    return (
        <div className="room-container">
            <RoomNavbar />
            <div className="messages-wrapper">
                {messages.map(message => (
                    <Message
                        key={message._id}
                        myMessage={message.userId === jwtDecode(context.token).id}
                        content={message.message}
                        time={message.timestamp}
                    />
                ))}
            </div>
            <MessageInput roomId={id} />
        </div>
    );
}
