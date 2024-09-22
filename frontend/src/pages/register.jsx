import React, { useContext } from "react";
import { Context } from "../context/context";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";



export default function RegisterPage() {

    const context = useContext(Context);
    const navigate = useNavigate();

    const registerUser = async e => {
        e.preventDefault();
        
        const formData = new FormData();

        formData.append('name', e.target.name.value);
        formData.append('email', e.target.email.value);
        formData.append('password', e.target.password.value);
        formData.append('profilePicture', e.target.img.files[0]);

        const response = await fetch('http://localhost:8080/users/register/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: e.target.name.value, email: e.target.email.value, password: e.target.password.value}),
        });

        const data = await response.json();

        if(response.status === 201 ) {
            return navigate('/login/');
        };
    };

    return (
        <>
            <form onSubmit={registerUser} action="" style={{width:'40rem', display:'flex', flexDirection:'column', gap:'10px', position: 'absolute', top:'50%', left:'50%', transform: "translate(-50%, -50%)", alignItems: "center"}}>
                <h2>Sign up</h2>
                <input type="text" placeholder="Full name" name="name" style={{width:'100%', padding:'5px', fontSize:'19px', borderRadius:'5px', border:'1px solid gray'}} />
                <input type="file" name="img" id="" />
                <input type="email" placeholder="Email address" name="email" style={{width:'100%', padding:'5px', fontSize:'19px', borderRadius:'5px', border:'1px solid gray'}} />
                <input type="password" name="password" placeholder="Password" style={{width:'100%', padding:'5px', fontSize:'19px', borderRadius:'5px', border:'1px solid gray'}} />
                <button type="submit" style={{width:'15rem', color:'white', backgroundColor: "seagreen", padding:'10px', textAlign:'center'}}>Create account</button>
            </form>
        </>
    );
};