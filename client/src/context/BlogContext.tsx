import React, { createContext, useContext, useState } from "react";
import { IBlog, IBlogInput } from "../interfaces/blog";
import axios from "axios";
import { AuthContext, AuthContextType } from "./AuthContext";

export interface BlogContextType {
  blogs: IBlog[] | null;
  blog: IBlog | null;
  getAllBlogs: () => Promise<void>;
  getBlogById: (blogId: string) => Promise<void>;
  addBlog: (blogFormData: IBlogInput) => Promise<boolean>
  deleteBlogById: (blogId: string) => Promise<void>;
  editBlogById: (blogId: string, blogFormData: IBlogInput) => Promise<void>;
  toggleBlogLike: (blogId: string) => Promise<void>;
  getMyBlogs: () => Promise<void>;
}

const BASE_URL = "http://localhost:8080/api/blogs";

export const BlogContext = createContext<BlogContextType | null>(null);

const BlogProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [blogs, setBlogs] = useState<IBlog[] | null>(null);
  const [blog, setBlog] = useState<IBlog | null>(null);
  const { auth } = useContext(AuthContext) as AuthContextType;

  const getAllBlogs = async () => {
    try {
      const response = await axios.get(`${BASE_URL}`);
      setBlogs(response.data.blogs);
    } catch (error) {
      console.log(error);
    }
  };
  const getBlogById = async (blogId: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/${blogId}`, {
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      });
      setBlog(response.data.blog);
    } catch (error) {
      console.log(error);
    }
  };

  const getMyBlogs = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/myBlogs`, {
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      });
      setBlogs(response.data.blogs);
    } catch (error) {
      console.log(error);
    }
  };
  const addBlog = async (blogFormData: IBlogInput) => {
    try {
      await axios.post(`${BASE_URL}`, blogFormData, {
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  //   const getMyBlogs = async () => {};
  const deleteBlogById = async (blogId: string) => {
    try {
      const response = await axios.delete(`${BASE_URL}/${blogId}`, {
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      });
      setBlogs(response.data.blogs);
    } catch (error) {
      console.log(error);
    }
  };
  const editBlogById = async (blogId: string, blogFormData: IBlogInput) => {
    try {
      await axios.put(`${BASE_URL}/${blogId}`, blogFormData, {
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const toggleBlogLike = async (blogId: string) => {
    try {
      const response = await axios.patch(`${BASE_URL}/${blogId}`, {
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      });
      setBlogs(response.data.blogs);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BlogContext.Provider
      value={{
        blogs,
        blog,
        getAllBlogs,
        getBlogById,
        addBlog,
        deleteBlogById,
        editBlogById,
        toggleBlogLike,
        getMyBlogs,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export default BlogProvider;
