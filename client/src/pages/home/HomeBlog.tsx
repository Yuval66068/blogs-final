import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FaInfoCircle } from "react-icons/fa";
import { IBlog } from "../../interfaces/blog";
import classes from "./Home.module.scss";
import { useContext } from "react";
import { BlogContext, BlogContextType } from "../../context/BlogContext";
import { AuthContext, AuthContextType } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface HomeBlogProps {
  blog: IBlog;
}

const HomeBlog = ({ blog }: HomeBlogProps) => {
  const { toggleBlogLike } = useContext(BlogContext) as BlogContextType;
  const { currentUser } = useContext(AuthContext) as AuthContextType;
  const navigate = useNavigate();
  const isLiked = currentUser && blog.likes.includes(currentUser._id);

  const handleLike = async (blogId: string) => {
    console.log(`Liked blog with blogId: ${blogId}`);
    await toggleBlogLike(blogId);
  };

  return (
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
          onClick={() => handleLike(blog._id)}
        >
          {isLiked ? <AiFillLike size={24} /> : <AiOutlineLike size={24} />}
        </Button>
        <Button size="small" color="primary">
          <FaInfoCircle
            size={24}
            onClick={() => navigate(`/singleBlog/${blog._id}`)}
          />
        </Button>
      </CardActions>
    </Card>
  );
};

export default HomeBlog;