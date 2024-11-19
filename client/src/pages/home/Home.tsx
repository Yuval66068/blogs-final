import React, { useContext, useEffect } from 'react';
import { Container, Card, CardMedia, CardContent, Typography, CardActions, Button, Box } from '@mui/material';
import classes from './Home.module.scss';
import { BlogContext, BlogContextType } from '../../context/BlogContext';
import { FaInfoCircle } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';


const Home: React.FC = () => {
  const { blogs, getAllBlogs } = useContext(BlogContext) as BlogContextType;
  const navigate = useNavigate();

  useEffect(() => {
    getAllBlogs();
  }, []);

  const handleLike = (id: string) => {
    console.log(`Liked blog with ID: ${id}`);
    // Implement like logic here
  };

  return (
    <Container maxWidth="lg" className={classes.homeContainer}>
      <Typography variant="h3" align="center" gutterBottom>
        Blog Home
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 2,
          marginTop: 4,
        }}
      >
        {blogs && blogs.map((blog) => (
          <Card key={blog._id} className={classes.card}>
            {/* Blog Image */}
            <CardMedia
              component="img"
              height="140"
              image={blog.image.url}
              alt={blog.image.alt}
            />

            {/* Blog Title */}
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                {blog.title}
              </Typography>
            </CardContent>

            {/* Actions */}
            <CardActions>
              <Button
                size="small"
                color="primary"
                // onClick={() => handleLike(blog._id)}
              >
                <AiOutlineLike size={24}/>
              </Button>
              <Button
                size="small"
                color="primary"
                // onClick={() => handleLike(blog._id)}
              >
                <FaInfoCircle size={24} onClick={() => navigate(`/singleBlog/${blog._id}`)}/>
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default Home;
