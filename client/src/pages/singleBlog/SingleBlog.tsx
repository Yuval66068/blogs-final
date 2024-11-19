import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Container } from '@mui/material';
import classes from './SingleBlog.module.scss';
import { BlogContext, BlogContextType } from '../../context/BlogContext';

const SingleBlog: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getBlogById, blog } = useContext(BlogContext) as BlogContextType;


  useEffect(() => {
     if(id) getBlogById(id);
  }, [id]);

  console.log(blog)

  if (!blog) return <Typography variant="h6">Loading blog...</Typography>;

  return (
    <Container maxWidth="md" className={classes.singleBlogContainer}>
      <Card className={classes.card}>
        {/* Blog Image */}
        <CardMedia
          component="img"
          height="300"
          image={blog.image.url}
          alt={blog.image.alt}
        />

        {/* Blog Content */}
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {blog.title}
          </Typography>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            {blog.subtitle}
          </Typography>
          <Typography variant="body1" paragraph>
            {blog.body}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            Created on: {new Date(blog.createdAt).toLocaleDateString()}
          </Typography>
        </CardContent>

        {/* Actions */}
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => console.log('Like feature not implemented yet!')}
          >
            Like ({blog.likes.length})
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default SingleBlog;
