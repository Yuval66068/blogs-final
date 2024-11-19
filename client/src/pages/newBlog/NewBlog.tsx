import React, { useContext, useState } from 'react';
import { TextField, Button, Container, Typography, Stack } from '@mui/material';
import classes from './NewBlog.module.scss'; // Assuming you're using SCSS for styling
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { IBlogInput } from '../../interfaces/blog';
import { BlogContext, BlogContextType } from '../../context/BlogContext';

const NewBlog: React.FC = () => {
  const [blogInput, setBlogInput] = useState<IBlogInput>({
    title: '',
    subtitle: '',
    body: '',
    image: {
      alt: '',
      url: '',
    },
  });
  const navigate = useNavigate();
  const {addBlog} = useContext(BlogContext) as BlogContextType;

  const handleChange = (field: string, value: string) => {
    if (field.startsWith('image.')) {
      const key = field.split('.')[1];
      setBlogInput((prev) => ({
        ...prev,
        image: {
          ...prev.image,
          [key]: value,
        },
      }));
    } else {
      setBlogInput((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isSuccess =  await addBlog(blogInput);
    if (isSuccess) {
      toast.success('Blog created successfully!');
      navigate('/');
    } else {
      toast.error('Failed to create the blog. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm" className={classes.newBlogContainer}>
      <Typography variant="h4" align="center" gutterBottom>
        Create New Blog
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          {/* Title Field */}
          <TextField
            fullWidth
            label="Title"
            value={blogInput.title}
            onChange={(e) => handleChange('title', e.target.value)}
            required
          />

          {/* Subtitle Field */}
          <TextField
            fullWidth
            label="Subtitle"
            value={blogInput.subtitle}
            onChange={(e) => handleChange('subtitle', e.target.value)}
            required
          />

          {/* Body Field */}
          <TextField
            fullWidth
            label="Body"
            value={blogInput.body}
            onChange={(e) => handleChange('body', e.target.value)}
            multiline
            rows={4}
            required
          />

          {/* Image Alt Field */}
          <TextField
            fullWidth
            label="Image Alt Text"
            value={blogInput.image.alt}
            onChange={(e) => handleChange('image.alt', e.target.value)}
            required
          />

          {/* Image URL Field */}
          <TextField
            fullWidth
            label="Image URL"
            value={blogInput.image.url}
            onChange={(e) => handleChange('image.url', e.target.value)}
            required
          />

          {/* Submit Button */}
          <Button type="submit" fullWidth variant="contained" color="primary">
            Create Blog
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default NewBlog;
