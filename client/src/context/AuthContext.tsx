import React, { createContext, useState } from 'react';
import { IUser } from '../interfaces/auth';

interface AuthContextType {
    auth: IUser | null
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [auth, setAuth] = useState(null);
    
    return <AuthContext.Provider value={{ auth }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;