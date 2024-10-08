import express from "express";
import { createBlog, deleteBlogById, getAllBlogs, getBlogById, getMyBlogs, toggleLike, updatedBlogById } from "../controllers/blog";
import { requireAuth } from "../middlewares/requireAuth";

 export const blogsRouter = express.Router();

 blogsRouter.post("/",requireAuth, createBlog);
 blogsRouter.get("/myBlogs",requireAuth,getMyBlogs);
 blogsRouter.get("/", getAllBlogs);
 blogsRouter.get("/:id",requireAuth, getBlogById);
 blogsRouter.delete("/:id",requireAuth, deleteBlogById);
 blogsRouter.put("/:id", requireAuth,updatedBlogById);
 blogsRouter.patch("/:id", requireAuth,toggleLike);