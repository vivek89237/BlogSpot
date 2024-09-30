import React from 'react'
import "./index.scss"
function Profile({user}) {
  return (
    <div className='user-details' >
        <div className='backgroung-img'></div>
        <img className='img' src={user.imgURL} alt="user-name" />
        <h3 className='user-name'>{user.name}</h3>
        <p className='user-headline'>{user.headline}</p>
    </div>
  )
}

export default Profile