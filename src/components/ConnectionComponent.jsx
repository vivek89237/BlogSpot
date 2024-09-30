import React, { useEffect, useState } from 'react'
import '../Sass/ConnectionComponent.scss';
import {getAllUsers, addConnection} from '../api/FireStoreAPI';
import ConnectedUser from "../components/common/ConnectedUser/index.jsx";


export default function ConnectionComponent({currentUser}) {
    const [users, setUsers] = useState([]);
    
    const getCurrentUsers =(id)=>{
        addConnection(currentUser.userID, id);
    }

    useEffect(()=>{
        getAllUsers(setUsers);
    }, []);

    
  return (
    <div className='main-container'>
        <div className='connections-main'>
        {users.map((user, id)=>{
            return(
                <ConnectedUser key={id} user={user} getCurrentUsers={getCurrentUsers} currentUser={currentUser} />
            )
        })}
        </div>
    </div>
  )
}

