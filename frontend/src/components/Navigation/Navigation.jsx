import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { MdDiamond } from "react-icons/md";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  const sessionLinks = sessionUser ? (
    <ProfileButton user={sessionUser} />
  ) : (
    <div className="login-link">
      <NavLink to="/login">login</NavLink>
    </div>
  );

  return (
    <nav className="nav-bar">
      <div className="nav-wrapper">
        <div className="nav-logo-section">
          <MdDiamond className="diamond-icon" />
          <NavLink to="/" className="nav-title">
            GLEAM
          </NavLink>
        </div>

        <ul className="nav-links">
          <li>
            <NavLink to="/">STORE</NavLink>
          </li>
          <li>
            <NavLink to="/communities">COMMUNITY</NavLink>
          </li>
          {sessionUser ? (
            <>
              <li>
                <NavLink to={`/users/${sessionUser.id}`}>
                  {sessionUser.username.toUpperCase()}
                </NavLink>
              </li>
              {/* <li><NavLink to="/chat">CHAT</NavLink></li> */}
            </>
          ) : (
            <li>
              <NavLink to="/about">ABOUT</NavLink>
            </li>
          )}
          {/* <li><NavLink to="/support">SUPPORT</NavLink></li> */}
        </ul>

        <div className="nav-login-section">{isLoaded && sessionLinks}</div>
      </div>
    </nav>
  );
}

export default Navigation;
