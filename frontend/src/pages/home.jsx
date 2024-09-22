import React, { useState } from "react";
import { Link } from "react-router-dom";
import messagesIcon from "../media/messagesSVG.svg";

export default function Homepage() {

    const [users, setUser] = useState([]);

    const getUsers = async () => {
        const response = await fetch("localhost:8080", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        });
    }

    return (
        <>
            <div className="home-container">
                <img className="messages-icon" src={messagesIcon} alt="" />
            <h1 className="no-chat-heading">
                Please select a Chat Room
            </h1>
            </div>
        </>
    )
}