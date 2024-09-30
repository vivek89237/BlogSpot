import React from "react";
import ProfileComponent from "../components/ProfileComponent";
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/common/Loader';

export default function Profile({currentUser}){
    let navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        onAuthStateChanged(auth, (res) => {
            if (!res?.accessToken) {
                navigate('/login');
            } else {
                setLoading(false);
            }
        });
    });
    return loading? <Loader /> :<ProfileComponent currentUser={currentUser}/>;
}