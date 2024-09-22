import React, { useEffect, useState } from "react";
import User from "./user";


export default function SidebarUsers() {

    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        
        const response = await fetch(`http://localhost:8080/users/`, {
            method: "GET",
            headers: {
                'Content-Type':'application/json',
            },
        });

        const data = await response.json();

        if (response.status === 200) {
            setUsers(data);
        };
    };

    useEffect(() => {
        getUsers();
    }, [])

    return (
        <>
            <div className="sidebar-users">
                {users && users.map(user => {
                    return (
                        <>
                            <User id={user._id} name={user.name} key={user._id}  />                    
                        </>
                    );
                })}
            </div>
        </>
    )
}