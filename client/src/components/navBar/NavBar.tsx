import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import classes from "./NavBar.module.scss";
import Box from "@mui/material/Box";
import { useContext, useState } from "react";
import { AuthContext, AuthContextType } from "../../context/AuthContext";
import Avatar from "@mui/material/Avatar";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const Navbar = () => {
  const { auth, logout, currentUser } = useContext(AuthContext) as AuthContextType;
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/myBlogs", label: "My Blogs", authRequired: true },
    { to: "/favorites", label: "Favorites", authRequired: true },
    { to: "/newBlog", label: "New Blog", authRequired: true },
    { to: "/login", label: "Logout", onClick: logout, authRequired: true },
    { to: "/login", label: "Login", authRequired: false },
    { to: "/signup", label: "Signup", authRequired: false },
  ];

  const renderNavLinks = (isDrawer = false) =>
    navLinks
      .filter(link => (auth ? true : !link.authRequired))
      .map(({ to, label, onClick }, index) => (
        <NavLink
          key={index}
          to={to}
          className={({ isActive }) =>
            `${classes.navLink} ${isActive ? classes.active : ""}`
          }
          onClick={onClick}
          style={isDrawer ? { textDecoration: "none", color: "inherit" } : {}}
        >
          {isDrawer ? (
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary={label} />
              </ListItemButton>
            </ListItem>
          ) : (
            label
          )}
        </NavLink>
      ));

  return (
    <AppBar position="static" className={classes.navBarContainer}>
      <Toolbar>
        {isSmallScreen ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="left"
              open={isDrawerOpen}
              onClose={() => setDrawerOpen(false)}
            >
              <Box sx={{ width: 250 }}>
                <List>{renderNavLinks(true)}</List>
              </Box>
            </Drawer>
          </>
        ) : (
          <>
            {auth && currentUser && (
              <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
                <Avatar alt="User Avatar" src={currentUser.image.url} />
                <Typography variant="h6" sx={{ ml: 1 }}>
                  {`Welcome ${currentUser.name.first} ${currentUser.name.last}`}
                </Typography>
              </Box>
            )}
            <Box className={classes.mainNav} sx={{ display: "flex", flexGrow: 1 }}>
              {renderNavLinks()}
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;