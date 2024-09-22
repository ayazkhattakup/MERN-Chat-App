import React from "react";
import { Outlet } from "react-router-dom";
import ChatSidebar from "../components/chatSidebar";


export default function Mainlayout() {

    return (
        <>
            <div className="chat-wrapper">
                <ChatSidebar />
                <Outlet />
                
            </div>
        </>
    )
}