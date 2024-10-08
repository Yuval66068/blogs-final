import { Blog } from "../db/models/blog";
import { Request, Response } from 'express';
import { IUserCustomRequest } from "../types/user";
import { blogValidationSchema } from "../validations/blog";

export const createBlog = async (req:IUserCustomRequest, res:Response) => {
  const blogFormData = {...req.body, userId: req.userId};

    try {
      await blogValidationSchema.validateAsync(blogFormData);

      const blog = await Blog.create(blogFormData);
      res.status(200).json({ message: "blog created successfully", blog });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

export const getAllBlogs = async (req:IUserCustomRequest, res:Response) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({ message: "blogs fetched successfully", blogs });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getMyBlogs = async (req:IUserCustomRequest, res:Response) => {
  const userId = req.userId;
  if (!userId) return res.status(404).json({ message: "User not found" });

  try {
    const blogs = await Blog.find({userId});
    res.status(200).json({ message: "my blogs fetched successfully", blogs });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getBlogById = async (req:IUserCustomRequest, res:Response) => {
  const { id } = req.params;
  if (!id) return res.status(404).json({ message: "Blog not found" });
  try {
    const blog = await Blog.findById(id);
    res.status(200).json({ message: "Blog fetched successfully", blog });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteBlogById = async (req:IUserCustomRequest, res:Response) => {
  const { id } = req.params;
  const userId = req.userId;
  const role = req.role;
  if (!id) return res.status(404).json({ message: "Blog not found" });
  //admin auth
  try {
    const blog = await Blog.findById(id);
    if(userId !== blog?.userId) return res.status(401).json({ message: "Forrbidden access" });

    const deletedBlog = await Blog.findByIdAndDelete(id);
    if(!deletedBlog) return res.status(404).json({ message: "Blog not found" });

    const blogs = await Blog.find();
    res.status(200).json({ message: "Blog deleted successfully", deletedBlog, blogs });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updatedBlogById = async (req:IUserCustomRequest, res:Response) => {
  const { id } = req.params;
  const userId = req.userId;
  const role = req.role;
  if (!id) return res.status(404).json({ message: "Blog not found" });
  //admin auth
  try {
    const blog = await Blog.findById(id);
    if(userId !== blog?.userId) return res.status(401).json({ message: "Forrbidden access" });

    const updatedBlog = await Blog.findByIdAndUpdate(id, {...req.body});
    if(!updatedBlog) return res.status(404).json({ message: "Blog not found" });
    
    res.status(200).json({ message: "Blog updated successfully", updatedBlog });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const toggleLike = async (req:IUserCustomRequest, res:Response) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    
    const isAlreadyLiked = blog.likes.includes(userId as string);
    const update = isAlreadyLiked ? {$pull: {likes: userId}} : {$push: {likes: userId}};
    const updatedBlog = await Blog.findByIdAndUpdate(id, update, {new: true});
    if(!updatedBlog) return res.status(404).json({ message: "Blog not found" });

    const blogs = await Blog.find();

    res.status(200).json({ message: "Blog like toggled successfully", blogs });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};