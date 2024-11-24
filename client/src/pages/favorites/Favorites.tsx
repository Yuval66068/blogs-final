import { Box, Container, Typography } from "@mui/material";
import classes from "./Favorites.module.scss";
import { useContext, useEffect } from "react";
import { AuthContext, AuthContextType } from "../../context/AuthContext";
import { BlogContext, BlogContextType } from "../../context/BlogContext";
import HomeBlog from "../home/HomeBlog";


const Favorites = () => {
  const {blogs, getAllBlogs} = useContext(BlogContext) as BlogContextType;
  const {currentUser} = useContext(AuthContext) as AuthContextType;
  
  const favorites = blogs?.filter((blog) => blog.likes.includes(currentUser?._id as string));
  
  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <Container maxWidth="lg" className={classes.favoritesContainer}>
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
        {favorites?.map((blog) => (
         <HomeBlog key={blog._id} blog={blog}/>
        ))}
      </Box>
    </Container>
  )
}

export default Favorites