//user router.mjs

import express from "express";
import { userRegister, deleteUser, userUpdate, userLogin, fetchUsers, userLogout } from "../controllers/users_con.mjs";

const usersrouter = express.Router();


usersrouter.post('/userRegister', userRegister);
usersrouter.post('/usersLogin', userLogin);
usersrouter.post('/usersLogout', userLogout);
usersrouter.get('/userData', fetchUsers);
usersrouter.delete('/userDelete/:id', deleteUser);
usersrouter.put('/userUpdate/:id', userUpdate);

export default usersrouter;