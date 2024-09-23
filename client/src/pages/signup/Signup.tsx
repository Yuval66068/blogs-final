import React, { useContext, useState } from 'react';
import { TextField, Button, Container, Typography, Stack } from '@mui/material';
import { IUserInput } from '../../interfaces/auth';
import { AuthContext, AuthContextType } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
  const {signup} = useContext(AuthContext) as AuthContextType;
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState<IUserInput>({
    name: {
      first: '',
      last: '',
    },
    image: {
      alt: '',
      url: '',
    },
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  };

  const handleNestedInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const [parent, child] = name.split('.');
    setUserInput((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof IUserInput],
        [child]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(userInput);
    const success = await signup(userInput);
    if(success){
      toast.success("Signup Successful");
      navigate("/login");

    }else toast.error("Signup Failed");
      
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Signup
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
         <Stack spacing={2} direction={"row"}>
           {/* First Name */}
           <TextField
            fullWidth
            label="First Name"
            name="name.first"
            value={userInput.name.first}
            onChange={handleNestedInputChange}
            required
          />

          {/* Last Name */}
          <TextField
            fullWidth
            label="Last Name"
            name="name.last"
            value={userInput.name.last}
            onChange={handleNestedInputChange}
            required
          />
         </Stack>

          {/* Email */}
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={userInput.email}
            onChange={handleInputChange}
            required
          />

          {/* Password */}
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={userInput.password}
            onChange={handleInputChange}
            required
          />

          {/* Image URL */}
          <TextField
            fullWidth
            label="Image URL"
            name="image.url"
            value={userInput.image.url}
            onChange={handleNestedInputChange}
            required
          />

          {/* Image Alt Text */}
          <TextField
            fullWidth
            label="Image Alt Text"
            name="image.alt"
            value={userInput.image.alt}
            onChange={handleNestedInputChange}
            required
          />

          {/* Submit Button */}
          <Button type="submit" fullWidth variant="contained" color="primary">
            Sign Up
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default Signup;