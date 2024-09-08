import { Request, Response, NextFunction } from 'express';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../db/models/user";
import { userValidationSchema } from '../validations/user';
dotenv.config();

export const signupUser = async (req: Request, res: Response) => {
  const userFormData = req.body;
  try {
    await userValidationSchema.validateAsync(userFormData);
    const isEmailExist = await User.findOne({ email: userFormData.email });
    if (isEmailExist) return res.status(400).json({message:"email already exist"});

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(userFormData.password, salt);

    const newUser = await User.create({ ...userFormData, password: hash });
    res.status(201).json({ message: "user signuped successfully", newUser });
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export const loginUser = async (req:Request, res:Response) => {
  const { email, password } = req.body;
  if (!email || !password) throw Error("All fields must be filled");

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({message: "user does not exist"});

    const isPasswordCorrect = await bcrypt.compare(password, user.password as string);
    if (!isPasswordCorrect) throw Error("Incorrect password");

    const token = jwt.sign({ _id: user._id, role: "basic" },process.env.JWT_SECRET,{expiresIn: "24h",});

    res.status(200).json({ message: "user logged in successfully", token });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const getUsers = async (req:Request, res:Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const getUserById = async (req:Request, res:Response) => {
  const { id } = req.params;
//   const {_id, isAdmin} = req.user;

//   if(!isAdmin && _id !== id)return  res.status(401).json({ message: "Unauthorized access, admin or same user only" });

  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const editUser = async (req:Request, res:Response) => {
  const { id } = req.params;
  const updatedData = req.body;
//   const userId = req.user._id;

//   if(_id !== id)return  res.status(401).json({ message: "Unauthorized access, same user only" });

  try {
    const existingUser = await User.findById(id);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // if (existingUser._id.toString() !== userId.toString()) {
    //   return res
    //     .status(403)
    //     .json({ message: "You are not authorized to edit this user" });
    // }

    const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export const deleteUser = async (req:Request, res:Response) => {
  const { id } = req.params;
//   const {_id,isAdmin} = req.user;

//   if(!isAdmin && _id !== id)return  res.status(401).json({ message: "Unauthorized access, admin or same user only" });

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) throw Error("User does not exist");
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};
