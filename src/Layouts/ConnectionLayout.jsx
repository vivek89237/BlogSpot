import React, {useMemo, useState} from 'react'
import Connection from '../Pages/Connection.jsx';
import { getCurrentUser } from '../api/FireStoreAPI.jsx';
import Topbar from '../components/common/Topbar/Topbar.jsx'
function ConnectionLayout() {
  const [currentUser, setCurrentUser] = useState({});
  useMemo(() =>{
    getCurrentUser(setCurrentUser)
  }, [])
  return (
    <div>
      <Topbar currentUser={currentUser}/>
      <Connection currentUser={currentUser} />
    </div>
  )
}

export default ConnectionLayout;