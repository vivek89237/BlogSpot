import React, { useState, useMemo } from 'react';
import { onLogout } from '../../../api/AuthApi';
import './index.scss';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/index';
import {getCurrentUser} from '../../../api/FireStoreAPI';
import {Drawer } from 'antd';


const Profile = ({show, setShow}) => {
  
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  useMemo(() =>{
    getCurrentUser(setCurrentUser);
  }, []);
  
  return (
    
      
      <>
        <Drawer
          title="User Profile"
          placement="right"
          width={300}
          onClose={()=>setShow(false)}
          open={show}
        >
          <div className='popup-card'>
          <img className='img' src={currentUser.imgURL} alt="" />
          <p className='name'>{currentUser.name}</p>
          <p className='headline'>{currentUser.headline}</p>
          <div className='btns'>
            <Button title="View Profile"
              onClick ={()=>{
                navigate("/profile", {
                  state:{
                    id: currentUser?.userID
                  }
                })
              }}
            />
            <Button title="Logout" onClick={onLogout} />
          </div>
          </div>
        </Drawer>
      </>
  )
}

export default Profile;