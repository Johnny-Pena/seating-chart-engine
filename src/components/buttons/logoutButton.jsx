import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <button className="btn btn-secondary text-sm btn-sm sm:text-xl btn-md" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;