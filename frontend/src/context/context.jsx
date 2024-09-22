import React, { createContext, useState } from "react";
import { io } from "socket.io-client";



export const Context = createContext();

export default function ContextProvider({children}) {

    const [user, setUser] = useState(localStorage.getItem('user')? localStorage.getItem('user'): null);
    const [token, setToken] = useState(localStorage.getItem('token')? localStorage.getItem('token'): null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [currentRoomId, setCurrentRoomId] = useState('');
    const [currentRoomUserId, setCurrentRoomUserId] = useState('');


    const socket = io("http://localhost:8080")

    const contextValues = {
        user,
        token,
        socket,
        message,
        setUser,
        setToken,
        messages,
        setMessage,
        setMessages,
        currentRoomId,
        setCurrentRoomId,
        currentRoomUserId,
        setCurrentRoomUserId,
    };

    return <Context.Provider value={contextValues}>{children}</Context.Provider>
};

