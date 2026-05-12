import React, { createContext, useContext, useState } from 'react';

type User = {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'student' | string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  signIn: (token: string, userData: User) => void;
  signOut: () => void;
  isLoading: boolean; 
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  
  const isLoading = false; 

  const signIn = (newToken: string, userData: User) => {
    setToken(newToken);
    setUser(userData);
  };

  const signOut = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, signIn, signOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}