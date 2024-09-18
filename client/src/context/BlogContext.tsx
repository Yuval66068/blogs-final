import React, { createContext, useState } from 'react';
import { IBlog } from '../interfaces/blog';

interface BlogContextType {
    blogs: IBlog[] | null
}

export const BlogContext = createContext<BlogContextType | null>(null);

const BlogProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [blogs, setBlogs] = useState(null);
  
  return <BlogContext.Provider value={{ blogs }}>{children}</BlogContext.Provider>;
};

export default BlogProvider;