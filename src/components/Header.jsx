import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { logoutUser } from '../redux/slices/userSlice';
import React from 'react';

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
        src="https://www.pngitem.com/pimgs/m/421-4212617_person-placeholder-image-transparent-hd-png-download.png"
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
      <div className="flex items-center gap-6">
        <h3 className="text-slate-50 font-semibold">TeamBoard</h3>
        <Link to="/" className="text-blue-300 hover:underline text-base">Board</Link>
        <Link to="/dashboard" className="text-blue-300 hover:underline text-base">Dashboard</Link>
      </div>
      {user && <UserInfo user={user} />}
    </div>
  );
};

export default Header;