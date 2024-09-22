import React, { useContext } from "react";
import { Context } from "../context/context";

export default function Message(props) {

    const context = useContext(Context);
    const {content, myMessage, time} = props;

    return (
        <>
            {myMessage ?
            <div className="message my-message">
                <div className="content">
                    {content}
                </div>
                <div className="timestamp">
                    {time.slice(11,16)}
                </div>
            </div>
            :
            <div className="message your-message">
                <div className="content">
                    {content}
                </div>
                <div className="timestamp">
                    {time.slice(11,16)}
                </div>
            </div>

             }

        </>
    )
}