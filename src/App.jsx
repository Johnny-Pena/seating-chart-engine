import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import './index.css';
import Navbar from './components/navbar.jsx';
import SeatingChartHomePage from './routes/seatingChartHomePage.jsx';
import LoginPage from './routes/LoginPage.jsx';
import AddClassPage from './routes/AddClassPage.jsx'; // Ensure the correct file name and path
import { AuthProvider, useAuth } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import ProtectedRoute from './context/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <AuthWrapper>
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <LoginPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/login"
                element={
                  <ProtectedRoute>
                    <LoginPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/seatingChartHomePage"
                element={
                  <PrivateRoute>
                    <SeatingChartHomePage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/addClass"
                element={
                  <PrivateRoute>
                    <AddClassPage />
                  </PrivateRoute>
                }
              />
            </Routes>
          </AuthWrapper>
        </div>
      </Router>
    </AuthProvider>
  );
}

const AuthWrapper = ({ children }) => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <>
      {isAuthenticated && <Navbar onLogout={logout} />}
      {children}
    </>
  );
};

export default App;