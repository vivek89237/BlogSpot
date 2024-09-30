import React, { useMemo, useState } from 'react';
import "./index.scss";
import { AiOutlineLike } from "react-icons/ai";
import { BsChatTextFill } from "react-icons/bs";
import { AiFillLike } from "react-icons/ai";
import { getLikePost, likePost } from '../../../api/FireStoreAPI';
import { Modal, Button } from 'antd';
import { postComment, getComment } from '../../../api/FireStoreAPI';
import {getCurrentTimeStamp} from "../../../helpers/useMoment"
import CommentCard from '../Comment';
import { toast } from 'react-toastify';
import {Badge} from 'antd';

const color = "#0073b1"
function LikeBtn({userID, userName, postID, imgURL, handleNotif}) {
    const [likedUsers, setLikedUsers] = useState();
    const [isLiked, setLiked] = useState(false);
    const [input, setInput] = useState("");
    const [show, setModalOpen] = useState(false);
    const [comments, setComments] = useState([]);
    
    const handleLikes = () =>{
        {!isLiked && handleNotif("Liked your post")};
        likePost(userID, postID, isLiked);
    }
    const addComment = async()=>{
      handleNotif("Commented on your post");
      await postComment(postID, input, getCurrentTimeStamp('LLL'), userName, imgURL)
      toast.success("Comment has been posted.");
      await setInput("")
      await setModalOpen(false)
    }

    useMemo(()=>{
        getComment(postID, setComments);
        getLikePost(userID, postID, setLiked, setLikedUsers);
    }, [userID, postID])
  return (
    <div className='like-container'>
      {likedUsers > 0 ? <p className='user-count'> {likedUsers} {likedUsers==1? "user" : "users" } liked this post</p>: <div className='empty'></div>}
      <div className='hr-line'>
        <hr />
      </div>
      <div className='inner-liked-container'>
       <div className='like-btn'>
       {isLiked ? <AiFillLike  color={color} size="25px" onClick={handleLikes} />
         : <AiOutlineLike size="25px" color={color} onClick={handleLikes} />}
         <label>Like</label>
       </div>
       <div className='like-btn'>
        <Badge count={comments.length} overflowCount={10} >
          <BsChatTextFill size="25px" color={color}  className='comment-box'
            onClick={()=>setModalOpen(!show)}
          />
        </Badge>
        <label>Comments</label>
       </div>
      </div>
      {show && <Modal
              title="Create a Comment"
              centered
              open={show}
              onOk={() => setModalOpen(false)}
              onCancel={() => setModalOpen(false)}
              footer={[
                  <Button 
                  key="submit" 
                  type='primary' 
                  disabled = {!input}
                  onClick={addComment}
                  >
                      Add Comment
                  </Button>
              ]}
            >
              <textarea className='modal-input' type="text"
                  placeholder='comment...' 
                  value={input}
                  onChange={(e) => (setInput(e.target.value))}
                  />
            </Modal>
      }

      {comments.length>0 && 
      <div className='comments-main-container'>
        {comments.map((doc, i)=>{
          //console.log(doc)
          return (
          <CommentCard key={i} userID={userID} name={userName} comment={doc.comment} timeStamp={doc.timeStamp} userName={doc.userName} imgURL={imgURL} />
          
        )})}
      </div>}
      
    </div>
  )
}

export default LikeBtn