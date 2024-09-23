import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import EditBlog from "./pages/editBlog/EditBlog";
import NewBlog from "./pages/newBlog/NewBlog";
import Favorites from "./pages/favorites/Favorites";
import MyBlogs from "./pages/myBlogs/MyBlogs";
import SingleBlog from "./pages/singleBlog/SingleBlog";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import BlogProvider from "./context/BlogContext";
import AuthProvider from "./context/AuthContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const darkTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/editBlog/:id",
        element: <EditBlog />,
      },
      {
        path: "/newBlog",
        element: <NewBlog />,
      },
      {
        path: "/favorites",
        element: <Favorites />,
      },
      {
        path: "/myBlogs",
        element: <MyBlogs />,
      },
      {
        path: "/singleBlog/:id",
        element: <SingleBlog />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <BlogProvider>
        <ThemeProvider theme={darkTheme}>
          <RouterProvider router={router} />
          <ToastContainer />
        </ThemeProvider>
      </BlogProvider>
    </AuthProvider>
  </StrictMode>
);
