import { Request } from 'express';

export interface IBlogInput {
  title: string
  subtitle: string
  body: string  
  image: {
    alt: string;
    url: string;
  };
  userId: string
}

export interface IBlog extends IBlogInput {
  likes: string[]
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface  IBlogCustomRequest extends Request {
    // user: IUser
}