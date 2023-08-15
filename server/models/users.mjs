//usersmodel.mjs

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    u_id: String,
    name: String,
    email: { type: String, unique: true }, 
    password: { type: String, unique: true },
    department: String,
    role: String,
    regdate: Date,
});

const userDetails = mongoose.model("User", userSchema);

export default userDetails;