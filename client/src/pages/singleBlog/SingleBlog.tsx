import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Container } from '@mui/material';
import classes from './SingleBlog.module.scss';
import { BlogContext, BlogContextType } from '../../context/BlogContext';
import { AuthContext, AuthContextType } from '../../context/AuthContext';

const SingleBlog: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getBlogById, blog } = useContext(BlogContext) as BlogContextType;
  const { getUserByID } = useContext(AuthContext) as AuthContextType;
  const [likeUsernames, setLikeUsernames] = useState<string[]>([]);
  const [showLikes, setShowLikes] = useState<boolean>(false);

  useEffect(() => {
    if (id) getBlogById(id);
  }, [id]);

  useEffect(() => {
    const fetchUsernames = async () => {
      if (blog?.likes?.length) {
        const usernames = await Promise.all(
          blog.likes.map(async (userId: string) => {
            const user = await getUserByID(userId);
            return user?.name?.first + ' ' + user?.name?.last;
          })
        );
        setLikeUsernames(usernames);
      }
    };

    if (blog) fetchUsernames();
  }, [blog, getUserByID]);

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
            onClick={() => setShowLikes((prevState) => !prevState)}
          >
            {showLikes ? 'Hide Likes' : `Show Likes (${likeUsernames.length})`}
          </Button>
        </CardActions>

        {/* Likes List */}
        {showLikes && (
          <CardContent>
            <Typography variant="subtitle1">Liked by:</Typography>
            {likeUsernames.length > 0 ? (
              likeUsernames.map((likeUsernames, index) => (
                <Typography key={index} variant="body2">
                  {likeUsernames}
                </Typography>
              ))
            ) : (
              <Typography variant="body2">No likes yet.</Typography>
            )}
          </CardContent>
        )}
      </Card>
    </Container>
  );
};

export default SingleBlog;
