import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/context";
import { jwtDecode } from "jwt-decode";


export default function MessageInput(props) {
    const { roomId } = props;
    const context = useContext(Context);

    const sendMessageHandler = e => {
        e.preventDefault();

        context.socket.emit("sendMessage", {
            roomId: context.currentRoomId,
            message: e.target.message.value,
            userId: jwtDecode(context.token).id 
        })
    };

    useEffect(() => {
        context.socket.on('receiveMessage', ({newMessage}) => {
            console.log(newMessage);
        });
        document.querySelector('.message-input-field').focus();
    }, [roomId]);

    return (

        <>
            <form onSubmit={sendMessageHandler} className="message-input-form">
                <input name="message" className="message-input-field" type="text" value={context.message} onChange={e => context.setMessage(e.target.value)} />
                <button type="submit" className="send-message-btn">Send</button>
            </form>
        </>
    );
};