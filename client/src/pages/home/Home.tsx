import React, { useContext, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
} from "@mui/material";
import classes from "./Home.module.scss";
import { BlogContext, BlogContextType } from "../../context/BlogContext";
import HomeBlog from "./HomeBlog";

const Home: React.FC = () => {
  const { blogs, getAllBlogs } = useContext(
    BlogContext
  ) as BlogContextType;

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <Container maxWidth="lg" className={classes.homeContainer}>
      <Typography variant="h3" align="center" gutterBottom>
        Blog Home
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 2,
          marginTop: 4,
        }}
      >
        {blogs &&
          blogs.map((blog) => (
            <HomeBlog key={blog._id} blog={blog}/>
          ))}
      </Box>
    </Container>
  );
};

export default Home;