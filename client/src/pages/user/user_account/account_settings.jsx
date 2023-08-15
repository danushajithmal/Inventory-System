import React, {useState} from "react";
import axios from "axios";

function User_Account_Settings () {   

    const _id = sessionStorage.getItem('_id');
    const u_id = sessionStorage.getItem('u_id');
    const name = sessionStorage.getItem('name');
    const email = sessionStorage.getItem('email');
    const password = sessionStorage.getItem('userpassword');
    const department = sessionStorage.getItem('department');
    const role = sessionStorage.getItem('role');

    const [uname, setName] = useState(name);
    const [uemail, setEmail] = useState(email);
    const [upassword, setPassword] = useState(password);   


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try{
          const response = await axios.put(`http://localhost:5000/users/userUpdate/${_id}`, { 
            u_id : u_id,
            name : uname, 
            email : uemail, 
            password : upassword, 
            department : department,
            role : role,

        });
        if(response){
            alert("Updated Successfully!");
        }
    
        } catch (e) {
          alert("Error Occured");
          console.log(e);
        }
      };

    return(
        <>
        <section class="bg-image">
                <div class="mask d-flex align-items-center h-100 gradient-custom-3">
                    <div class="container h-100">
                        <div class="row d-flex justify-content-center align-items-center h-100">
                            <div class="col-12 col-md-9 col-lg-7 col-xl-6">
                                <div class="card" style={{ borderradius: '15px' }}>
                                    <div class="card-body p-5">
                                        <h2 class="text-uppercase text-center mb-5">Update Account Detailes</h2>

                                        <form onSubmit={handleSubmit}>                                       

                                            <div class="form-outline mb-4">
                                                <input type="text" id="name" value={uname} class="form-control form-control-lg"
                                                    onChange={(e) => setName(e.target.value)} />
                                                <label class="form-label" for="form3Example1cg">Name</label>
                                            </div>

                                            <div class="form-outline mb-4">
                                                <input type="email" id="email" value={uemail} class="form-control form-control-lg"
                                                    onChange={(e) => setEmail(e.target.value)} />
                                                <label class="form-label" for="form3Example3cg">Your Email</label>
                                            </div>

                                            <div class="form-outline mb-4">
                                                <input type="text" id="password" value={upassword} class="form-control form-control-lg"
                                                    onChange={(e) => setPassword(e.target.value)} />
                                                <label class="form-label" for="form3Example4cg">Password</label>
                                            </div>                                                                       

                                            <div class="d-flex justify-content-center">
                                                <input type="submit" value="Update"
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

export default User_Account_Settings