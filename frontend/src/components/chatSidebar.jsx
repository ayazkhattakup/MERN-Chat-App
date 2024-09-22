import React, { useContext } from "react";
import bgImg from "../media/bg.png";
import SidebarUsers from "./sidebarUsers";
import { Context } from "../context/context";
import UsersSearchInput from "./usersSearchInput";


export default function ChatSidebar() {

    const context = useContext(Context);

    return (
        <>
            <div className="chat-sidebar">
                <div className="profile-container">
                    <img src={bgImg} alt="currently-logged-in-user-img" className="img" />
                    <div className="username">
                        @muhammad
                    </div>
                </div>
                <UsersSearchInput />
                <SidebarUsers  />
            </div>
        </>
    )
}