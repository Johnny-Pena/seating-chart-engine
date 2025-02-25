import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userClasses, setUserClasses] = useState([]);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Restore authentication state from cookies
    const storedAuthState = Cookies.get('isAuthenticated');
    const storedUserClasses = Cookies.get('userClasses');
    const storedUserEmail = Cookies.get('userEmail');
    if (storedAuthState === 'true') {
      setIsAuthenticated(true);
      setUserClasses(storedUserClasses ? JSON.parse(storedUserClasses) : []);
      setUserEmail(storedUserEmail || '');
    }
  }, []);

  const login = (email, classes) => {
    setIsAuthenticated(true);
    setUserClasses(classes);
    setUserEmail(email);
    // Save authentication state to cookies
    Cookies.set('isAuthenticated', 'true', { expires: 5 / 24 }); // 5 hours
    Cookies.set('userClasses', JSON.stringify(classes), { expires: 5 / 24 }); // 5 hours
    Cookies.set('userEmail', email, { expires: 5 / 24 }); // 5 hours
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserClasses([]);
    setUserEmail('');
    // Remove authentication state from cookies
    Cookies.remove('isAuthenticated');
    Cookies.remove('userClasses');
    Cookies.remove('userEmail');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userClasses, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);