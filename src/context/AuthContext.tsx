import React, { useState, createContext, useContext } from 'react';
import { User, mockUser } from '../data/mockData';
interface AuthContextType {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
  isGuest: boolean;
  setGuestMode: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider = ({ children }: {children: ReactNode;}) => {
  const [user, setUser] = useState<User | null>(null);
  const login = (email: string) => {
    // Mock login
    setUser({
      ...mockUser,
      email
    });
  };
  const logout = () => {
    setUser(null);
  };
  const setGuestMode = () => {
    setUser({
      id: 'guest',
      name: 'Guest User',
      email: '',
      role: 'guest'
    });
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isGuest: user?.role === 'guest',
        setGuestMode
      }}>
      
      {children}
    </AuthContext.Provider>);

};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};