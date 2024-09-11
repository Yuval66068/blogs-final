import mongoose from "mongoose";
import { blogSchema } from "../schemas/blog";

export const Blog = mongoose.model("Blog", blogSchema);