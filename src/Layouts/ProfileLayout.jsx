import { useMemo, useState } from "react";
import {getCurrentUser} from "../api/FireStoreAPI";
import Topbar from "../components/common/Topbar/Topbar";
import Profile from "../Pages/Profile";

export default function ProfileLayout(){
    const [currentUser, setCurrentUser] = useState({});

    useMemo(()=>{
        getCurrentUser(setCurrentUser);
    }, []);
    // console.log(currentUser);
    return (
        <div>
            <Topbar currentUser={currentUser} />
            <Profile currentUser={currentUser} />
        </div>
    );
}