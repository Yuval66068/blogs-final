import React, { useContext, useState } from 'react';
import { TextField, Button, Container, Typography, Stack } from '@mui/material';
import classes from './Login.module.scss'; // Assuming you're using SCSS for styling
import { toast } from 'react-toastify';
import { AuthContext, AuthContextType } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const {login} = useContext(AuthContext) as AuthContextType;
  const navigate = useNavigate();
  


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
    const success = await login({ password, email });
    if (success) {
      toast.success("Login Successful");
      navigate("/");
    }else toast.error("Login Failed");
  };

  return (
    <Container maxWidth="sm" className={classes.loginContainer}>
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          {/* Email Field */}
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password Field */}
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Submit Button */}
          <Button type="submit" fullWidth variant="contained" color="primary">
            Log In
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default Login;