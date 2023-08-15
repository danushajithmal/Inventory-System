import React, { useEffect } from "react";
import axios from "axios";

import './admindashboard.css';

function Admindashboard() {

    const Role = sessionStorage.getItem('role');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/users/userData');
                const fetchedData = response.data;

                const isAvailable = fetchedData.some(user => user.role === Role);
                if (isAvailable) {
                    const availableUser = fetchedData.find(user => user.role === Role);
                    sessionStorage.setItem('_id', availableUser._id);
                    sessionStorage.setItem('u_id', availableUser.u_id);
                    sessionStorage.setItem('name', availableUser.name);
                    sessionStorage.setItem('email', availableUser.email);
                    sessionStorage.setItem('department', availableUser.department);

                } else {
                    alert("Something went wrong");
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchUserData();

    }, [Role]);

    return (
        <div className="admindashboard">
            {/* Your component content */}
        </div>
    )
}

export default Admindashboard