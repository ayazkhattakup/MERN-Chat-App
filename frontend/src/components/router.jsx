import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/login";
import ProtectedRoute from "./protectedRoute";
import Mainlayout from "../layouts/mainLayout";
import Homepage from "../pages/home";
import Room from "./room";
import RegisterPage from "../pages/register";



export default function Router() {


    return (
        <>
            <Routes>
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="/" element={<ProtectedRoute Component={Mainlayout} />} >
                    <Route index element={<Homepage />} />
                    <Route path="room/:id" element={<Room />} />
                </Route>
            </Routes>
        </>
    )
}