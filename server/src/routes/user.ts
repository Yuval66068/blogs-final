import express from "express";
import { deleteUser, editUser, getUserById, getUsers, loginUser, signupUser } from "../controllers/user";

 export const usersRouter = express.Router();

 usersRouter.post("/signup", signupUser);
 usersRouter.post("/login", loginUser);
 usersRouter.get("/", getUsers);
 usersRouter.get("/:id", getUserById);
 usersRouter.put("/:id", editUser);
 usersRouter.delete("/:id", deleteUser);