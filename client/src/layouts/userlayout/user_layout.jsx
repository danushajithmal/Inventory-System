import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";

import './user_layout.css';
import User_Navbar from "../../components/user/navbar/user_navbar";
import User_Navbar2 from "../../components/user/navbar2/user_navbar2";

const { Content } = Layout;

function User_Layout() {

    const [timeoutId, setTimeoutId] = useState(null);

    const resetSessionTimeout = () => {
        clearTimeout(timeoutId);
        const newTimeoutId = setTimeout(() => {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('role');
            alert("Session Expired");
            window.location.href = '/';
        }, 3600000);
        setTimeoutId(newTimeoutId);
    };

    useEffect(() => {
        const eventListeners = ['mousemove', 'keydown', 'click'];

        const eventListenerCallback = () => {
            resetSessionTimeout();
        };

        eventListeners.forEach(eventType => {
            window.addEventListener(eventType, eventListenerCallback);
        });
        return () => {
            eventListeners.forEach(eventType => {
                window.removeEventListener(eventType, eventListenerCallback);
            });
        };
    }, [timeoutId]);

    return (
        <>
            <div className="user_cont">
                <Layout>
                    <User_Navbar />
                    <User_Navbar2 />
                    <div className="user-body-width">
                        <Content>
                            <Outlet />
                        </Content>
                    </div>
                </Layout>
            </div>
        </>
    )
}

export default User_Layout