import React, { useContext, useEffect } from 'react';
import { Container, Card, CardMedia, CardContent, Typography, CardActions, Button, Box } from '@mui/material';
import { BlogContext, BlogContextType } from '../../context/BlogContext';
import { FaInfoCircle } from 'react-icons/fa';
import { AiOutlineLike } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import classes from './MyBlogs.module.scss';

const MyBlogs: React.FC = () => {
  const { blogs: myBlogs, getMyBlogs } = useContext(BlogContext) as BlogContextType;
  const navigate = useNavigate();

  useEffect(() => {
    getMyBlogs();
  }, []);

  const handleLike = (id: string) => {
    console.log(`Liked blog with ID: ${id}`);
    // Implement like logic here
  };

  return (
    <Container maxWidth="lg" className={classes.myBlogsContainer}>
      <Typography variant="h3" align="center" gutterBottom>
        My Blogs
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 2,
          marginTop: 4,
        }}
      >
        {myBlogs && myBlogs.map((blog) => (
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

            <CardActions>
              <Button
                size="small"
                color="primary"
                onClick={() => navigate(`/singleBlog/${blog._id}`)}
              >
                <FaInfoCircle size={24} />
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default MyBlogs;
