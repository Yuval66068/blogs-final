import React, { useContext, useEffect, useState } from "react";
import { TextField, Button, Container, Typography, Stack } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import classes from "./EditBlog.module.scss";
import { IBlogInput } from "../../interfaces/blog";
import { BlogContext, BlogContextType } from "../../context/BlogContext";

const EditBlog: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getBlogById, editBlogById, blog } = useContext(
    BlogContext
  ) as BlogContextType;
  const [blogInput, setBlogInput] = useState<IBlogInput>({
    title: "",
    subtitle: "",
    body: "",
    image: {
      alt: "",
      url: "",
    },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handleFetchBlogHistory()
  }, [id]);

  const handleFetchBlogHistory = async () => {
    if (id) {
      await getBlogById(id);
      console.log(blog);
      if(blog) setBlogInput({
        title: blog.title,
        subtitle: blog.subtitle,
        body: blog.body,
        image: {
          alt: blog.image.alt,
          url: blog.image.url,
        }})

      setLoading(false);
    }

  }

  const handleChange = (field: string, value: string) => {
    if (field.startsWith("image.")) {
      const key = field.split(".")[1];
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
    if (!id) return;
    const isSuccess = await editBlogById(id, blogInput);
    if (isSuccess) {
      toast.success("Blog updated successfully!");
      navigate("/myBlogs");
    } else {
      toast.error("Failed to update the blog. Please try again.");
    }
  };

  if (loading) {
    return (
      <Container maxWidth="sm" className={classes.editBlogContainer}>
        <Typography variant="h5" align="center">
          Loading blog details...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" className={classes.editBlogContainer}>
      <Typography variant="h4" align="center" gutterBottom>
        Edit Blog
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          {/* Title Field */}
          <TextField
            fullWidth
            label="Title"
            value={blogInput.title}
            onChange={(e) => handleChange("title", e.target.value)}
            required
          />

          {/* Subtitle Field */}
          <TextField
            fullWidth
            label="Subtitle"
            value={blogInput.subtitle}
            onChange={(e) => handleChange("subtitle", e.target.value)}
            required
          />

          {/* Body Field */}
          <TextField
            fullWidth
            label="Body"
            value={blogInput.body}
            onChange={(e) => handleChange("body", e.target.value)}
            multiline
            rows={4}
            required
          />

          {/* Image Alt Field */}
          <TextField
            fullWidth
            label="Image Alt Text"
            value={blogInput.image.alt}
            onChange={(e) => handleChange("image.alt", e.target.value)}
            required
          />

          {/* Image URL Field */}
          <TextField
            fullWidth
            label="Image URL"
            value={blogInput.image.url}
            onChange={(e) => handleChange("image.url", e.target.value)}
            required
          />

          {/* Submit Button */}
          <Button type="submit" fullWidth variant="contained" color="primary">
            Update Blog
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default EditBlog;
