//users controller

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userDetails from "../models/users.mjs";
import mongoose from "mongoose";


//User registration
export const userRegister = async (req, res) => {
    try {
        const { u_id, name, email, password, department, role } = req.body;

        //existing user check
        const existingUser = await userDetails.findOne({ email });
        if (existingUser) {
            console.log(error);
            return res.status(400).json({ error: "User already exists with the entered Email" });
            
        }

        //email validation
        const emailval = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailval.test(email)) {
            console.log(error);
            return res.status(400).json({ error: "Invalid email address" });
        }

        //pasword hashing
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        //current date
        const regdate = new Date()

        const newUser = new userDetails({
            u_id, name, email, password: hashedPassword, department, role, regdate,
        });

        const savedUser = await newUser.save();

        res.status(201).json({ message: "User registered successfully", user: savedUser });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to register", details: error.message })
    }
};

//user login
export const userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userDetails.findOne({ email });

        if (!user) {
            console.log("User not found");
            return res.status(404).json({ messeage: "User not found" });
        }

        const isPasswordValid = bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            console.log("Invalid password");
            return res.status(401).json({ messeage: 'Invalid password ' });
        }

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.cookie('token', token, { 
            maxAge: 3600*1000,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
        })

        res.json({
            token,
            role: user.role,
        });       

    } catch (err) {
        res.status(500).json({ messeage: 'Server error' });
    }

};

// handle logout
export const userLogout = async (req, res) => {
    try {
      // You can perform any cleanup or logging out logic here if needed
  
      res.clearCookie('token'); // Clear the token cookie
  
      res.json({ message: 'User logged out successfully' });
      console.log("logged out successfully");
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  };

//user data fetch
export const fetchUsers = async (req, res) => {
    try {
        const users = await userDetails.find();

        if (users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }

        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Error fetching users" });
    }
};

//user delete
export const deleteUser = async (req, res) => {
    try {
        const userid = req.params.id;

        const deletedUser = await userDetails.findByIdAndRemove(userid);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User Deleted Successfully", user: deletedUser });

    } catch (error) {
        res.status(500).json({ error: "Failed to delete user", details: error.message });
    }

};

//user update
export const userUpdate = async (req, res) => {
    try {
        const userid = req.params.id;
        const { name, email, password, department, role } = req.body;


        if (!mongoose.Types.ObjectId.isValid(userid)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }

        const update = { name, department, role, };
        if (email) {
            //email validation
            const emailval = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailval.test(email)) {
                return res.status(400).json({ error: "Invalid email address" });
            }

            update.email = email;
        }
        if (password) {
            //pasword hashing
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            update.password = hashedPassword;
        }

        const updatedUser = await userDetails.findByIdAndUpdate(userid, update, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User updated successfully", user: updatedUser });

    } catch (error) {
        res.status(500).json({ error: "Failed to update user", details: error.message });
    }
};