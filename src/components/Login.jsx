import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, setError } from '../redux/slices/userSlice';
import { setSession } from '../redux/slices/sessionSlice';
import { saveSessionToLocalStorage } from '../utils/sessionStorage';
import { resetBoards } from '../redux/slices/boardSlice';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.user.error);

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(u => u.username === username && u.password === password);

      if (user && user.id) {
        dispatch(loginUser(user));

        const defaultBoardId = user.lastBoardId || 0;
        const sessionData = {
          userId: user.id,
          username: user.username,
          activeBoard: defaultBoardId,
        };

        dispatch(setSession(sessionData));
        saveSessionToLocalStorage(sessionData);
        dispatch(resetBoards());

        navigate('/');
      } else {
        dispatch(setError('Invalid credentials'));
      }
    } catch (err) {
      console.error('Login error:', err);
      dispatch(setError('Login failed due to unexpected error'));
    }
  };

  const handleNavigateToSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="mb-4 text-xl font-bold">Login</h2>
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
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          Login
        </button>
        <button
          type="button"
          onClick={handleNavigateToSignup}
          className="mt-2 bg-green-500 text-white px-4 py-2 rounded w-full"
        >
          Go to Signup
        </button>
      </form>
    </div>
  );
};

export default Login;
