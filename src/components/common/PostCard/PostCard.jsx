import React , { useState, useMemo, useEffect} from 'react';
import './PostCard.scss';
import { useNavigate } from 'react-router-dom';
import LikeBtn from '../LikeButton';
import { 
  getCurrentUser, 
  getAllUsers, 
  deletePost, 
  getConnections,
  uploadNotif 
} from '../../../api/FireStoreAPI';
import { RiPencilFill } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";

function PostCard({post, getEditPost}) {
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [isConnected, setConnection] = useState(false);
  
  const handleNotif =(type)=>{
    let data = {
      type:type,
      userID:post.userID,
      likedUserName: currentUser.name,
      postID:post.postID
    }
    uploadNotif(data);
  }
  //console.log(post.userID)
  useMemo(()=>{
    getCurrentUser(setCurrentUser)
    getAllUsers(setAllUsers)
  }, []);
  
  const imgURL = allUsers?.filter((user)=> user.userID === post?.userID).map((item)=>item.imgURL)[0];

  useEffect(()=>{
    getConnections(currentUser.userID, post.userID, setConnection);
  }, [currentUser.userID, post.userID]);

  return (
    <>
    {(isConnected || (currentUser.userID === post.userID)) &&
      <div className='post-card'>
      <div className='c1'>
        <img className='post-user-img' src={imgURL} alt="user-image" />
        <div className='c2'>
         <div className='c4'>
         <div  className='c3'>
          <p className='name' onClick={()=>navigate('/profile', {
                state : {id:post?.userID, email: post.userEmail},
              })}>
                {post.userName}
            </p>
            <p className='timestamp'>{post.timeStamp}</p>
          </div>
          {currentUser.userID === post.userID && <div className='c6'>
            <div className='edit'>
            <RiPencilFill  onClick={() => getEditPost(post)} />
            </div>
            <div className='delete'>
            <FaTrash className='delete'  onClick={()=>deletePost(post.id)}/>
            </div>
          </div>}
         </div>
          
        </div>
      </div>
      {post?.postImgURL && <div className='c8'><img src={post.postImgURL} alt="postimage" className='post-image' /></div>}
      <div className='c7'><p className='status'>{post.status}</p></div>
      <div className='c5'><LikeBtn userID={currentUser?.userID} userName={currentUser?.name} postID={post.id} imgURL={currentUser?.imgURL} handleNotif={handleNotif}  /></div>
    </div>
    }
    
    </>
  )
}

export default PostCard;