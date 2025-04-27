
import React, { createContext, useState, useContext, ReactNode } from 'react';

type Role = 'admin' | 'user' | null;

interface AuthContextType {
  isAuthenticated: boolean;
  role: Role;
  username: string | null;
  login: (username: string, password: string, role: Role) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<Role>(null);
  const [username, setUsername] = useState<string | null>(null);

  // Mock authentication for demonstration
  // In a real app, this would connect to a backend service
  const login = async (username: string, password: string, role: Role): Promise<boolean> => {
    // Simple validation - in a real app this would be much more secure
    if (username.length > 0 && password.length > 0) {
      setIsAuthenticated(true);
      setRole(role);
      setUsername(username);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setRole(null);
    setUsername(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
