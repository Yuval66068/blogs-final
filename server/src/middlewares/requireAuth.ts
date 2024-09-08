import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";
import { IUserCustomRequest } from '../types/user';

export const requireAuth = async (req:IUserCustomRequest, res:Response, next:NextFunction) => {
    const {authorization} = req.headers;
    if(!authorization) return res.status(400).json({message:"Authorization token required"});
    
    const token = authorization.split(" ")[1];

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;

        next();

    } catch (error) {
        res.status(401).json({error: error.message});
    }
}