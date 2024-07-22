import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../redux/userSlice';

const Header = () => {
  const { isLoggedIn, isAdmin } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        {isAdmin && <Link to="/admin/conferences">Manage Conferences</Link>}
        {isAdmin && <Link to="/admin/users">Manage Users</Link>}
        {isLoggedIn ? (
          <>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
