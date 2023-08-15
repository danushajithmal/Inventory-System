
import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';
import './regform.css';

function UserManage() {

    const [iu_id, setId] = useState('');
    const [iname, setName] = useState('');
    const [iemail, setEmail] = useState('');
    const [ipassword, setPassword] = useState('');
    const [idepartment, setDepartment] = useState('');
    const [irole, setRole] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        alert("Are you Sure?");
        try{
          const response = await axios.post("http://localhost:5000/users/userRegister", { 
            u_id: iu_id, 
            name: iname, 
            email: iemail, 
            password: ipassword, 
            department: idepartment, 
            role: irole,
        });
        if (response){
            alert("User account created successfully!");
        }
           
        } catch (e) {
          alert("Error Occured");
          console.log(e);
        }
      };
      
    return (
        <>
            <section class="bg-image">
                <div class="mask d-flex align-items-center h-100 gradient-custom-3">
                    <div class="container h-100">
                        <div class="row d-flex justify-content-center align-items-center h-100">
                            <div class="col-12 col-md-9 col-lg-7 col-xl-6">
                                <div class="card" style={{ borderradius: '15px' }}>
                                    <div class="card-body p-5">
                                        <h2 class="text-uppercase text-center mb-5">Create user account</h2>

                                        <form onSubmit={handleSubmit}>

                                            <div class="form-outline mb-4">
                                                <input type="text" id="uid" value={iu_id} class="form-control form-control-lg"
                                                    onChange={(e) => setId(e.target.value)} />
                                                <label class="form-label" for="form3Example1cg">User Id</label>
                                            </div>

                                            <div class="form-outline mb-4">
                                                <input type="text" id="name" value={iname} class="form-control form-control-lg"
                                                    onChange={(e) => setName(e.target.value)} />
                                                <label class="form-label" for="form3Example1cg">Name</label>
                                            </div>

                                            <div class="form-outline mb-4">
                                                <input type="email" id="email" value={iemail} class="form-control form-control-lg"
                                                    onChange={(e) => setEmail(e.target.value)} />
                                                <label class="form-label" for="form3Example3cg">User Email</label>
                                            </div>

                                            <div class="form-outline mb-4">
                                                <input type="text" id="password" value={ipassword} class="form-control form-control-lg"
                                                    onChange={(e) => setPassword(e.target.value)} />
                                                <label class="form-label" for="form3Example4cg">Default Password</label>
                                            </div>


                                            <div class="form-outline mb-4">
                                                <select type="text" id="department" value={idepartment} class="form-control form-control-lg" required
                                                    onChange={(e) => setDepartment(e.target.value)}>
                                                        <option value="">Select Department</option>
                                                        <option value="Inventory Department">Inventory Department</option>
                                                        <option value="Sales Department">Sales Department</option>
                                                        <option value="Production Department">Production Department</option>
                                                        <option value="Purchase Department">Purchase Department</option>
                                                </select>
                                                <label class="form-label" for="form3Example1cg">User Department</label>
                                            </div>

                                            <div class="form-outline mb-4">
                                            <select type="text" id="role" value={irole} class="form-control form-control-lg" required
                                                    onChange={(e) => setRole(e.target.value)}>
                                                        <option value="">Select Role</option>
                                                        <option value="Inventory Manager">Inventory Manager</option>
                                                        <option value="Sales Manager">Sales Manager</option>
                                                        <option value="Production Manager">Production Manager</option>
                                                        <option value="Purchase Manager">Purchase Manager</option>
                                                </select>
                                                <label class="form-label" for="form3Example1cg">User Role</label>
                                            </div>

                                            <div class="d-flex justify-content-center">
                                                <input type="submit" value="Submit"
                                                    class="btn btn-success btn-block btn-lg gradient-custom-4 text-body"/>
                                            </div>


                                        </form>

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

export default UserManage;