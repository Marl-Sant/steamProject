import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './ProfileButton.css';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const ulClassName = showMenu ? "profile-dropdown" : "hidden";

  return (
    <div className="profile-button-wrapper">
      <button className="user-details" onClick={() => setShowMenu(!showMenu)}>
        {user.username} <span className="arrow">▼</span>
      </button>
      <ul className={ulClassName}>
        <li><NavLink to={`/users/${user.id}`}>View my profile</NavLink></li>
        <li><NavLink to="/users/:userId/wallet">View my Wallet</NavLink></li>
        <li><button className="logout-button" onClick={logout}>Sign out of account...</button></li>
      </ul>
    </div>
  );
}

export default ProfileButton;
