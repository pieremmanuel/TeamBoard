import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.find(u => u.username === username)) {
      setError('Username already exists');
      setSuccess('');
      return;
    }

    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    setSuccess('Signup successful! You can now login.');
    setError('');
    setUsername('');
    setPassword('');
  };

  const handleNavigateToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="mb-4 text-xl font-bold">Signup</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="mb-2 p-2 w-full border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="mb-2 p-2 w-full border rounded"
        />
        {error && <div className="text-red-500 mb-2">{error}</div>}
        {success && <div className="text-green-500 mb-2">{success}</div>}
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded w-full">
          Signup
        </button>
        <button
          type="button"
          onClick={handleNavigateToLogin}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Go to Login
        </button>
      </form>
    </div>
  );
};

export default Signup;