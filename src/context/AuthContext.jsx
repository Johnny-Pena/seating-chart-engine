import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userClasses, setUserClasses] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    // Restore authentication state from cookies
    const storedAuthState = Cookies.get('isAuthenticated');
    const storedUserClasses = Cookies.get('userClasses');
    const storedUserEmail = Cookies.get('userEmail');
    const storedToken = Cookies.get('token');
    if (storedAuthState === 'true' && storedToken) {
      setIsAuthenticated(true);
      setUserClasses(storedUserClasses ? JSON.parse(storedUserClasses) : []);
      setUserEmail(storedUserEmail || '');
      setToken(storedToken);
    }
  }, []);

  const login = (email, classes, token) => {
    setIsAuthenticated(true);
    setUserClasses(classes);
    setUserEmail(email);
    setToken(token);
    // Save authentication state to cookies
    Cookies.set('isAuthenticated', 'true', { expires: 5 / 24 }); // 5 hours
    Cookies.set('userClasses', JSON.stringify(classes), { expires: 5 / 24 }); // 5 hours
    Cookies.set('userEmail', email, { expires: 5 / 24 }); // 5 hours
    Cookies.set('token', token, { expires: 5 / 24 }); // 5 hours
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserClasses([]);
    setUserEmail('');
    setToken('');
    // Remove authentication state from cookies
    Cookies.remove('isAuthenticated');
    Cookies.remove('userClasses');
    Cookies.remove('userEmail');
    Cookies.remove('token');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userClasses, userEmail, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);