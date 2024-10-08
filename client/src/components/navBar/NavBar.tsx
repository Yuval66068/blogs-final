import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import classes from "./NavBar.module.scss";
import Box from "@mui/material/Box";
import { useContext } from "react";
import { AuthContext, AuthContextType } from "../../context/AuthContext";
import Avatar from "@mui/material/Avatar";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const {auth, logout} = useContext(AuthContext) as AuthContextType;
  

  return (
    <AppBar position="static" className={classes.navBarContainer}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        {auth && 
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        }
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          MyApp
        </Typography>
        <Box className={classes.mainNav}>
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending ? `${classes.pending} ${classes.navLink}` : isActive ? `${classes.active} ${classes.navLink}` : classes.navLink
          }
        >
          Home
        </NavLink>
       
        {auth ? 
        <>
        <NavLink
          to="/myBlogs"
          className={({ isActive, isPending }) =>
            isPending ? `${classes.pending} ${classes.navLink}` : isActive ? `${classes.active} ${classes.navLink}` : classes.navLink
          }
        >
          My Blogs
        </NavLink>
        <NavLink
          to="/favorites"
          className={({ isActive, isPending }) =>
            isPending ? `${classes.pending} ${classes.navLink}` : isActive ? `${classes.active} ${classes.navLink}` : classes.navLink
          }
        >
          Favorites
        </NavLink>
        <NavLink
          to="/newBlog"
          className={({ isActive, isPending }) =>
            isPending ? `${classes.pending} ${classes.navLink}` : isActive ? `${classes.active} ${classes.navLink}` : classes.navLink
          }
        >
          New Blog
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive, isPending }) =>
            isPending ? `${classes.pending} ${classes.navLink}` : isActive ? `${classes.active} ${classes.navLink}` : classes.navLink
          }
          onClick={logout}
        >
          Logout
        </NavLink>
        </>
        : 
        <>
         <NavLink
          to="/login"
          className={({ isActive, isPending }) =>
            isPending ? `${classes.pending} ${classes.navLink}` : isActive ? `${classes.active} ${classes.navLink}` : classes.navLink
          }
        >
          Login
        </NavLink>
        <NavLink
          to="/signup"
          className={({ isActive, isPending }) =>
            isPending ? `${classes.pending} ${classes.navLink}` : isActive ? `${classes.active} ${classes.navLink}` : classes.navLink
          }
        >
          Signup
        </NavLink>
        </>
        }
        
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
