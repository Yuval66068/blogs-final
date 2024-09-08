import { Request } from 'express';

export interface IUserInput {
  name: {
    first: string;
    last: string;
  };
  image: {
    alt: string;
    url: string;
  };
  email: string;
  password: string;
  role?: UserRole;
}

export interface IUser extends IUserInput {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface  IUserCustomRequest extends Request {
    user: IUser
}

type UserRole = "admin" | "basic";
