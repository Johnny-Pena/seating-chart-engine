import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState(''); // State for alert message
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        login(email, data.user.classes, data.token); // Pass the email, classes, and token to the login function
        navigate('/seatingChartHomePage');
      } else {
        console.error('Login failed:', data.message);
        setAlertMessage(`Login failed: ${data.message}`); // Update alert message
      }
    } catch (error) {
      console.error('Error during login:', error);
      setAlertMessage('Error during login. Please try again later.'); // Update alert message
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center">
        <h1 className="text-xl font-bold mb-16 sm:text-3xl">Seating Chart Ninja</h1>
        <h2 className="text-l font-bold mb-4 sm:text-xl">Enter Login Info:</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="password"
              className="grow"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
        {alertMessage && (
          <div role="alert" className="alert alert-warning mt-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{alertMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;