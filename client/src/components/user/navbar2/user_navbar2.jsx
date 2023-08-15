import React from "react"
import axios from "axios";

import './user_navbar2.css';
import settings from '../../../repository/settings.png'
import logout from '../../../repository/logout.png'

function User_Navbar2() {

    const Role = sessionStorage.getItem('role');

    const handleLogout = async () => {
        const response = await axios.post("http://localhost:5000/users/usersLogout");
        if (response) {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('role');
            window.location.href = '/';
        }
        else {
            console.log("Error Logging out");
        }

    };



    return (
        <>
            <section>
                <div className="container nabvar2">
                    <br/>
                    <div className="row">
                        <div className="col-xxl-10 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6">
                            <h1 style={{color:'#062d91'}}>{Role}</h1>
                        </div>

                        <div className="col-xxl-2 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 text-end">
                            <a href="/acc_settings">
                                <img className="icon" src={settings} />
                                Account Settings
                            </a>
                            <br />
                            <a href="" onClick={handleLogout}>
                                <img className="icon" src={logout} />
                                Log Out
                            </a>
                        </div>
                    </div>
                </div>
                <hr/>
            </section>


        </>
    )
}

export default User_Navbar2;