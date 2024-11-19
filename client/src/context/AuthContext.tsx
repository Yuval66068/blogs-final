import React, { createContext, useEffect, useState } from "react";
import { IUserInput } from "../interfaces/auth";
import axios from "axios";

export interface AuthContextType {
  auth: string | null;
  signup: (userFormData: IUserInput) => Promise<boolean>;
  login: ({
    password,
    email,
  }: {
    password: string;
    email: string;
  }) => Promise<boolean>;
  logout: () => void;
}

const BASE_URL = "http://localhost:8080/api/users";

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [auth, setAuth] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setAuth(token);
  }, []);

  const signup = async (userFormData: IUserInput) => {
    try {
      const response = await axios.post(`${BASE_URL}/signup`, userFormData);
      console.log(response);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const login = async ({
    password,
    email,
  }: {
    password: string;
    email: string;
  }) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        password,
        email,
      });
      console.log(response);
      setAuth(response.data.token);
      localStorage.setItem("token", response.data.token);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const logout = () => {
    try {
        setAuth(null);
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ auth, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
