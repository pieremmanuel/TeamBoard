import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../redux/slices/userSlice';

const Header = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  const UserInfo = ({ user }) => (
    <div className="flex items-center space-x-4 text-slate-200">
      <span>{user?.username || 'Guest'}</span>
      <img
        className="rounded-full w-7 h-7"
        src="https://placehold.co/28x28/png"
        alt={`${user?.username || 'User'} avatar`}
      />
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm"
        aria-label="Logout from account"
      >
        Logout
      </button>
    </div>
  );

  return (
    <div className="bg-[#1d2125] w-full h-12 p-3 border-b border-[#9fadbc29] flex justify-between items-center">
      <h3 className="text-slate-50 font-semibold">TeamBoard</h3>
      {user && <UserInfo user={user} />}
    </div>
  );
};

export default Header;