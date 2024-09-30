import HomeComponent from '../components/HomeComponent';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/common/Loader';


export default function Home({currentUser}) {
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
  return loading? <Loader /> :<HomeComponent currentUser={currentUser}/>;
}