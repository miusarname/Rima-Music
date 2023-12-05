import { Router } from "express";
import { deleteUser,getAllUser,getUser,postUser,putUser } from "../Users.controller.js";
import { validateUser,validateUserput } from "../storage/User.DTO.js";

export const user:Router = Router();

user.get('/',getAllUser);
user.get('/search/',getUser);
user.post('/',validateUser,postUser);
user.put('/',validateUserput,putUser);
user.delete('/',deleteUser);