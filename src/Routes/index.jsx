import {createBrowserRouter} from 'react-router-dom';
import Register from '../Pages/Register';
import Login from '../Pages/Login';
import Home from '../Pages/Home';
import HomeLayout from '../Layouts/HomeLayout';
import ProfileLayout from '../Layouts/ProfileLayout';
import ConnectionLayout from '../Layouts/ConnectionLayout';

export const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path:"/register",
      element: <Register />
    },
    {
      path:"/",
      element: <HomeLayout />
    },
    {
      path: "/profile",
      element: <ProfileLayout />,
    },
    {
      path: "/connections",
      element: <ConnectionLayout />,
    }

]);