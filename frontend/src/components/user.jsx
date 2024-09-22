import React, { useContext } from "react";
import picOne from "../media/pic (1).jpg";
import { Link } from "react-router-dom";
import { Context } from "../context/context";

export default function User(props) {

    const context = useContext(Context);
    const { name, id } = props;

    return (
        <>
        {
            context.currentRoomUserId === id ? 
            <Link to={`/room/${id}`} className="sidebar-user active-sidebar-user">
                <img src={picOne} alt="" />
                <div className="sidebar-user-name">
                    {name}
                </div>
            </Link>
            : <Link to={`/room/${id}`} className="sidebar-user ">
            <img src={picOne} alt="" />
            <div className="sidebar-user-name">
                {name}
            </div>
        </Link>
        }
        </>
    )
}