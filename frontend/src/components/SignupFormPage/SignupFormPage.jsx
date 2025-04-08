import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import './SignupFormPage.css';
import * as sessionActions from '../../store/session';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [confirmedEmail, setConfirmedEmail] = useState("")
  const [username, setUsername] = useState("");
  const [country, setCountry] = useState("")
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          username,
          email,
          password,
          country
        })
      ).catch(async (res) => {
        const data = await res.json();
        if (data?.errors) {
          setErrors(data.errors);
        }
      });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  return (
    <>
    <div className='sign-up-body'>
    <h1 id='sign-up-header'>CREATE YOUR ACCOUNT</h1>
      <form onSubmit={handleSubmit} className='sign-up-form'>
        <label>
          Email Address
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
        </label>
        {errors.email && <p>{errors.email}</p>}

        <label>
          Confirm your Address
          <input
            type="text"
            value={confirmedEmail}
            onChange={(e) => setConfirmedEmail(e.target.value)}
            />
        </label>

        <label>Country of Residence</label>
        <select id="country" value={country} onChange={(e) => setCountry(e.target.value)}>
          <option value="United States">United States</option>
          <option value="Canada">Canada</option>
          <option value="United Kingdom">United Kingdom</option>
          <option value="Australia">Australia</option>
          <option value="Brazil">Brazil</option>
        </select>

        <label>
          Steam Account Name
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
        </label>
        {errors.username && <p>{errors.username}</p>}

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // required
            />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            // required
            />
        </label>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <button type="submit" id='sign-up-button'>Done</button>
      </form>
    </div>
    </>
  );
}

export default SignupFormPage;
