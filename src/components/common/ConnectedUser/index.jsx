import React, {useEffect, useState} from 'react';
import "./index.scss";
import {  getConnections } from '../../../api/FireStoreAPI';
import { IoMdPersonAdd } from "react-icons/io";


function ConnectedUser({user, getCurrentUsers, currentUser}) {
  const [isConnected, setConnection] = useState(false);
  useEffect(()=>{
    getConnections(currentUser.userID, user.userID, setConnection);
}, [currentUser.userID, user.userID]);

  return (
    <>
    {   (currentUser.userID !== user.userID && !isConnected) &&
        <div className='grid-child' >
            <img className='connection-img' src={user.imgURL} alt="connection-image" />
            <p className='connection-name'>{user.name}</p>
            <p className='connection-headline' >{user.headline}</p>
            <button className='connect-btn' onClick={()=>{
              getCurrentUsers(user.userID)
              }} 
            >
             <IoMdPersonAdd /> Connect
            </button>
        </div>
    }
    </>
  )
}

export default ConnectedUser;