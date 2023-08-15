import React from "react"
import axios from "axios";

import './admin_navbar.css'
import Logo from '../../repository/logo.png';
import user from '../../repository/users/defaultuser.png'


function AdminNavbar() {

    const Name = sessionStorage.getItem('name');

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

    }
    return (
        <>
            {/* <!-- Sidebar --> */}
            <nav id="sidebarMenu" class="collapse d-lg-block sidebar collapse">
                <div class="position-sticky">
                    <div class="list-group list-group-flush mx-3 mt-4">

                        {/* <!-- Collapsed content --> */}
                        <br/>
                        <h2>Admin Dashboard</h2>
                        <hr />
                        <ul class="collapse show list-group list-group-flush">
                            <li class="list-group-item py-1">
                                <a href='/admin_dashboard' class="text-reset">Dashboard</a>
                            </li>

                            <li class="list-group-item py-1">
                                <a href='/user_register' class="text-reset">Add User</a>
                            </li>

                            <li class="list-group-item py-1">
                                <a href='/user_register' class="text-reset">Manage User</a>
                            </li>
                        </ul>
                        <hr />
                        <button className="logoutbutton" onClick={handleLogout}>
                            Log Out
                        </button>
                    </div>
                </div>
            </nav>


            {/* <!-- Navbar --> */}
            <nav class="navbar navbar-expand-lg navbar-light bg-dark fixed-top">
                {/* <!-- Container wrapper --> */}
                <div class="container-fluid">
                    {/* <!-- Toggle button --> */}

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* <!-- Brand Logo --> */}
                    <a class="navbar-brand" href="/admindashboard">
                        <img className="img-responsive" src={Logo} height="50" alt="Logo" loading="lazy" />
                    </a>
                    
                    
                    <div className="navbar-heading text-end">
                            <h2>{Name}<img className="userlogo" src={user} height="60" alt="user" /></h2>
                    </div>
                </div>

            </nav>

        </>
    )
}

export default AdminNavbar