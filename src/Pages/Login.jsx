// import React from 'react'
import LoginComponent from '../components/LoginComponent'
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/common/Loader';
export default function Login() {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if (user?.accessToken) {
            //console.log(user);
            navigate("/");
        } else {
            setLoading(false);
        }
    });
});
  return loading?<Loader /> : <LoginComponent />;
}

 