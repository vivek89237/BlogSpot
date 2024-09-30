import { useState } from 'react';
import { LoginAPI, GoogleSignInAPI } from '../api/AuthApi';
import '../Sass/LoginComponent.scss'
import linkedLogo from '../assets/linkedLogo.png';
import GoogleButton from 'react-google-button';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function LoginComponent() {
  const [credentials, setCredentials] = useState({});
  let navigate = useNavigate();

  const login = async () => {
    try {
      let res = await LoginAPI(credentials.email, credentials.password);
      console.log(res);
      toast.success("Signed In to LinkedIn");
      localStorage.setItem('userEmail', res.user.email);
      navigate('/');
    } catch (e) {
      console.log('registerapi');
      toast.error("Please check your credentials");
    }
  }

  const googleSignIn = async () => {
    try {
      let res = await GoogleSignInAPI();
      console.log(res);
      toast.success("Signed In to LinkedIn");
      localStorage.setItem('userEmail', res.user.email);
      navigate('/');
    } catch (e) {
      console.log('registerapi');
      toast.error("Please check your credentials");
    }
  }

  return (
    <div className='login-wrapper'>
      <img src={linkedLogo} className='linkedlogo' />
      <div className="login-wrapper-inner">
        <h1 className='heading'>Sign in</h1>
        <p className='sub-heading'>Stay updated on your professional world</p>

        <div className='auth-inputs'>
          <input
            onChange={(event) =>
              setCredentials({
                ...credentials, email: event.target.value,
              })
            }
            className='common-input'
            placeholder='Email or Phone'
            type='wmail'
          />
          <input
            onChange={(event) =>
              setCredentials({
                ...credentials, password: event.target.value,
              })
            }
            className='common-input'
            placeholder='Password'
            type='password'
          />
          <button onClick={login} className='login-btn'>Sign in</button>
          <hr className="hr-text" data-content="OR" />
          <div className="google-btn-container">
            <GoogleButton
              className='google-btn'
              type="light" // can be light or dark
              onClick={() => googleSignIn()}
            />
            <p>New to LinkedIn?  <span onClick={() => navigate("/register")}> Join now</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginComponent;