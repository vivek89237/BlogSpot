import { useState } from 'react';
import { RegisterAPI, GoogleSignInAPI } from '../api/AuthApi';
import '../Sass/LoginComponent.scss'
import linkedLogo from '../assets/linkedLogo.png';
import GoogleButton from 'react-google-button';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {postUserData} from "../api/FireStoreAPI";

function RegisterComponent() {
    let navigate = useNavigate();

    const [credentials, setCredentials] = useState({});

    const register = async () => {
        try {
          let res = await RegisterAPI(credentials.email, credentials.password);
          console.log(res);
          toast.success("Account is created successfully");
          localStorage.setItem('userEmail', res.user.email);
          postUserData({name : credentials.name, email : credentials.email});
          navigate('/');
        } catch (e) {
          console.log('registerapi');
          toast.error("Email already registered");
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
      <h1 className='heading'>Make the most of your professional life</h1>

      <div className='auth-inputs'>
      <input
          onChange={(event) =>
            setCredentials({
              ...credentials, name: event.target.value,
            })
          }
          className='common-input'
          placeholder='name'
          type='email'
        />
        <input
          onChange={(event) =>
            setCredentials({
              ...credentials, email: event.target.value,
            })
          }
          className='common-input'
          placeholder='Email or Phone number'
          type='email'
        />
        <input
          onChange={(event) =>
            setCredentials({
              ...credentials, password: event.target.value,
            })
          }
          className='common-input'
          placeholder='Password (8 or more character)'
          type='password'
        />
        <button onClick={()=> register()} className='login-btn'>Agree & join</button>
        <hr className="hr-text" data-content="OR" />
        <div className="google-btn-container">
          <GoogleButton
            className='google-btn'
            type="light" // can be light or dark
            onClick={() => googleSignIn()}
          />
          <p>Already on linkedin ?  <span onClick={() => navigate("/")}> Sign in</span></p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default RegisterComponent;