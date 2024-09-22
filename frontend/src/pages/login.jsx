import React, { useContext } from "react";
import { Context } from "../context/context";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {

    const context = useContext(Context);
    const navigate = useNavigate();

    const loginUser = async e => {
        e.preventDefault();

        const response = await fetch('http://localhost:8080/users/login/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: e.target.email.value, password: e.target.password.value})
        });

        const data = await response.json();
        console.log(data);
        if(response.status === 200 ) {
            context.setToken(data.token);
            localStorage.setItem('token', data.token);
            return navigate('/');
        };
    };

    return (
        <>
            <form onSubmit={loginUser} action="" style={{width:'40rem', display:'flex', flexDirection:'column', gap:'10px', position: 'absolute', top:'50%', left:'50%', transform: "translate(-50%, -50%)", alignItems: "center"}}>
                <h2>Sign In</h2>
                <input type="email" placeholder="Email address" name="email" style={{width:'100%', padding:'5px', fontSize:'19px', borderRadius:'5px', border:'1px solid gray'}} />
                <input type="password" name="password" placeholder="Password" style={{width:'100%', padding:'5px', fontSize:'19px', borderRadius:'5px', border:'1px solid gray'}} />
                <button type="submit" style={{width:'15rem', color:'white', backgroundColor: "seagreen", padding:'10px', textAlign:'center'}}>Login</button>
            </form>
        </>
    )
}