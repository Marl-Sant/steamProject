import { useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import * as sessionActions from "../../store/session";
import { IoCartSharp } from "react-icons/io5";
import "./ProfileButton.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const dropdownRef = useRef(null);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  const ulClassName = showMenu ? "profile-dropdown" : "hidden";

  return (
    <div ref={dropdownRef} className="profile-button-wrapper">
      <NavLink to={"/cart"} className="cart-icon">
        <IoCartSharp />
      </NavLink>
      <button className="user-details" onClick={() => setShowMenu(!showMenu)}>
        {user.username}
        <span className="arrow">▼</span>
      </button>
      <ul className={ulClassName}>
        <li>
          <NavLink to={`/users/${user.id}`}>View my profile</NavLink>
        </li>
        <li>
          <button className="logout-button" onClick={logout}>
            Sign out of account...
          </button>
        </li>
      </ul>
    </div>
  );
}

export default ProfileButton;
