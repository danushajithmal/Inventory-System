import React from "react"
import './user_navbar.css';

import Logo from '../../../repository/logo.png';
import user from '../../../repository/users/defaultuser.png'

function User_Navbar() {
    const Name = sessionStorage.getItem('name');
    const Role = sessionStorage.getItem('role');

    const HomeButton = async () => {
        if (Role === "Inventory Manager") {
            window.location.href = '/inv_dashboard';
        }
        else if (Role === "Production Manager") {
            window.location.href = '/prod_dashboard';
        }
        else if (Role === "Sales Manager") {
            window.location.href = '/sales_dashboard';
        }
        else if (Role === "Purchase Manager") {
            window.location.href = '/pur_dashboard';
        }
    }

    const findImage = async () => {
        //
    }
    findImage();

    return (
        <>
            <section>
                <nav class="navbar navbar-expand-lg navbar-light fixed-top">
                    {/* <!-- Container wrapper --> */}
                    <div class="container-fluid">

                        {/* <!-- Brand Logo --> */}
                        <a class="navbar-brand" onClick={HomeButton}>
                            <img className="logo" src={Logo} height="50" alt="Logo" loading="lazy" />
                        </a>

                        <div className="navbar-heading">
                            <h2>{Name} <img className="userlogo" src={user} height="60" alt="user" /></h2>
  
                        </div>

                    </div>

                </nav>
            </section>


        </>
    )
}

export default User_Navbar;