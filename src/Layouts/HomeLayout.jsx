import React, {useMemo, useState} from 'react'
import Home from '../Pages/Home.jsx';
import { getCurrentUser } from '../api/FireStoreAPI.jsx';
import Topbar from '../components/common/Topbar/Topbar.jsx'
function HomeLayout() {
  const [currentUser, setCurrentUser] = useState({});
  useMemo(() =>{
    getCurrentUser(setCurrentUser)
  }, [])
  return (
    <div>
      <Topbar currentUser={currentUser}/>
      <Home currentUser={currentUser} />
    </div>
  )
}

export default HomeLayout;