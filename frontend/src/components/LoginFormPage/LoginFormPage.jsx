import { useState } from 'react';
import * as sessionActions from '../../store/session';
import './LoginFormPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, NavLink } from 'react-router-dom';

const setCookie = (name, value, days) => {
  const date = new Date()
  date.setTime(date.getTime() + (days*24*60*60*1000));
  const expires = 'expires=' + date.toUTCString()
  document.cookie = `${name}=${value};${expires}`
}

const getCookie = (name) => {
  const cookies = document.cookie.split('; ')
  for (let c of cookies){
    const [key, val] = c.split("=")
    if (key === name) return val
  }
  return "";
}

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const rememberName = getCookie('username')
  const [credential, setCredential] = useState(rememberName || "");
  const [remember, setRemember] = useState(false)
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/" replace={true} />;


  const handleSubmit = (e) => {
    e.preventDefault();
    if(remember){
      setCookie('username', credential, 7)
    }
    setErrors({});
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data?.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <>
    <div className='sign-in-body'>
      <div className='sign-in-header'>
      <h1 id="sign-in-title">Sign In</h1>
      </div>
      <div className='sign-in-window'>
      <form className='divider' onSubmit={handleSubmit}>
        <div className='user-creds'>
        <label>
          SIGN IN WITH ACCOUNT NAME
          <div>
          <input
            className='sign-in-input'
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            />
          </div>
        </label>
        <label>
          PASSWORD
          <div>
          <input
          className='sign-in-input'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          />
          </div>
        </label>
        {errors.credential && <p>{errors.credential}</p>}
        <div>
        <label className='remember-me'>
        <input type='checkbox' value={remember} onClick={() => setRemember(!remember)}></input>
        Remember Me
        </label>
        </div>
        <button type="submit" className='form-login'>Log In</button>
        </div>
      </form>
        <div className='demo-user-sign-in'>
          DEMO USERS SIGN IN
          <button className='demo-login' onClick={() => {
            setCredential("demo@user.io")
            setPassword("password")
          }}>Demo-lition</button>
          <button className='demo-login' onClick={() => {
            setCredential("user1@user.io")
            setPassword("password2")
          }}>FakeUser1</button>
          <button className='demo-login' onClick={() => {
            setCredential("user2@user.io")
            setPassword("password3")
          }}>FakeUser2</button>
        </div>
        </div>
    </div>
    <footer className='sign-in-footer'>
          <div className='new-user'>
          New to Gleam?
          <button className="new-user-button"><NavLink to="/signup">Create an Account</NavLink></button>
          </div>
          <div className='learn-more'>It&apos;s free and easy. Discover thousands of games to play with millions of new friends. <NavLink to='/about'>Learn more about Gleam and it&apos;s developers.</NavLink></div>
    </footer>
          </>
  );
}

export default LoginFormPage;
