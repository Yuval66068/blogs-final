import { Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";
import { IUserCustomRequest } from '../types/user';

export const requireAuth = async (req:IUserCustomRequest, res:Response, next:NextFunction) => {
    const {authorization} = req.headers;
    if(!authorization) return res.status(400).json({message:"Authorization token required"});

    const token = authorization.split(" ")[1];

    try {
        const {_id, role} = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = _id;
        req.role = role;

        next();
    } catch (error) {
        res.status(401).json({error: error.message});
    }
}