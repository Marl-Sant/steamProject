import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
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
    <div className="nav-container">
      <div className="login">{isLoaded && sessionLinks}</div>
      <div className="logo-and-links">
        <span className="logo">
          <MdDiamond />
          GLEAM
        </span>
        <span className="links">
          <NavLink to="/">STORE</NavLink>
          <NavLink to="/communities">COMMUNITY</NavLink>
          {sessionUser ? (
            <>
              <NavLink to={`/users/${sessionUser.id}`}>
                {sessionUser.username.toUpperCase()}
              </NavLink>
              <NavLink to="/chat">CHAT</NavLink>
            </>
          ) : (
            <NavLink to="/about">ABOUT</NavLink>
          )}
          <NavLink to="/support">SUPPORT</NavLink>
        </span>
      </div>
    </div>
  );
}

export default Navigation;
