import React, { useState, useMemo } from 'react';
import './index.scss';
import ModalComponent from '../../ModalComponent';
import { getPosts, uploadStatus, updatePosts } from '../../../api/FireStoreAPI';
import PostCard from '../PostCard/PostCard';
import { getCurrentTimeStamp } from '../../../helpers/useMoment';
import getUID from "../../../helpers/getUID";
import Profile from "../Profile/index";
import {uploadPostImage} from "../../../api/ImageUpload";

function PostStatus({currentUser}) {
  // console.log(getUID());
  // console.log("currentUser " + currentUser);
  let userEmail = localStorage.getItem("userEmail");
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [allStatus, setAllStatus] = useState([]);
  const [isEdit, setEdit] = useState(false);
  const [currentPost, setCurrentPost] = useState({});
  const [postImgURL, setUploadedImage] = useState("");
  
  const sendStatus = async() =>{
    let object = {
      status: status,
      timeStamp : getCurrentTimeStamp('LLL'),
      userEmail : userEmail,
      userName : currentUser.name,
      postID : getUID(),
      userID : currentUser.userID,
      postImgURL : postImgURL
    }

    await uploadStatus(object)
    await setModalOpen(false);
    await setStatus("");
    setUploadedImage("");
    await setEdit(false);
  }
  const updateStatus=()=>{
    updatePosts(currentPost?.id, status, postImgURL);
    setModalOpen(false);
    setStatus("");
    setUploadedImage("");
    setEdit(false);
  };
 
  const getEditPost=async(post)=>{
    setCurrentPost(post);
    setModalOpen(true);
    setStatus(post?.status);
    setEdit(true);
  }

  useMemo(() =>{
    getPosts(setAllStatus); 
  }, []);

  
 // console.log(currentUser)
  return (
    <div className='post-status-main'>
      <div className='user-profile-container'>
        <Profile user={currentUser} />
      </div>
      <div className='post-status'>
        <img className='user-image-onpost' src={currentUser.imgURL} alt="user-image" />
        <button 
          className='open-post-modal' 
          onClick={() => {
            setModalOpen(true);
            setEdit(false);
          }}>
          Start a Post
        </button>
      </div> 
      <ModalComponent 
        status={status} 
        setStatus={setStatus} 
        modalOpen={modalOpen} 
        setModalOpen={setModalOpen} 
        sendStatus={sendStatus} 
        isEdit={isEdit}
        updateStatus={updateStatus}
        uploadPostImage={uploadPostImage}
        setUploadedImage={setUploadedImage}
        postImgURL={postImgURL}
        currentPost={currentPost}
        setCurrentPost={setCurrentPost}
      />
      <div className='post-card-container'>
        {allStatus&&allStatus.map((p, index) =>{
          return (
            <div key={index} >
              <PostCard  post={p} getEditPost={getEditPost} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PostStatus;