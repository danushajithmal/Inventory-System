//login.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './login.css';


function Login() {

  const [useremail, setEmail] = useState('');
  const [userpassword, setPassword] = useState('');
  const navigate = useNavigate();

  sessionStorage.setItem('userpassword',userpassword);

  const fetchUserData = async () => {
    const Role = sessionStorage.getItem('role');

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
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(useremail, userpassword);

    const url = "http://localhost:5000/users/usersLogin";
    const loginData = {
      email: useremail,
      password: userpassword
    };

    try {
      const response = await axios.post(url, loginData);

      if (response.data) {

        sessionStorage.setItem('token', response.data.token);
        sessionStorage.setItem('role', response.data.role);

        fetchUserData();

        console.log("Login successful:", response.data);
        alert("login successfull");

        const userRole = response.data.role;
        if (userRole === 'Admin') {
          navigate('/admin_dashboard');
        } else if (userRole === 'Inventory Manager') {
          navigate('/inv_dashboard');
        } else if (userRole === 'Sales Manager') {
          navigate('/sales_dashboard');
        } else if (userRole === 'Production Manager') {
          navigate('/prod_dashboard');
        } else if (userRole === 'Purchase Manager') {
          navigate('/pur_dashboard');
        } else {
          console.error("Unknown user role:", userRole);
          alert("Unkown user. Please contact Admin!");
        }
      }

    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  

  return (
    <>

      <section class="vh-100 gradient-custom">
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-5">
              <div class="card bg-dark text-white" style={{ borderradius: '1rem;' }}>
                <div class="card-body p-5 text-center">

                  <div class="mb-md-5 mt-md-4 pb-5">

                    <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
                    <p class="text-white-50 mb-5">Please enter your email and password!</p>

                    <div class="form-outline form-white mb-4">
                      <input type="email" id="email" value={useremail} class="form-control form-control-lg"
                        onChange={(e) => setEmail(e.target.value)} />
                      <label class="form-label" for="typeEmailX">Email</label>
                    </div>

                    <div class="form-outline form-white mb-4">
                      <input type="password" id="password" value={userpassword} class="form-control form-control-lg"
                        onChange={(e) => setPassword(e.target.value)} />
                      <label class="form-label" for="typePasswordX">Password</label>
                    </div>

                    <button class="btn btn-outline-light btn-lg px-5" type="submit" onClick={handleSubmit}>Login</button>

                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}

export default Login