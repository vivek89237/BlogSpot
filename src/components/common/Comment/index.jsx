import React, { useState } from 'react';
import "./index.scss";
import userImg from "../../../assets/userimage.png";
import { FaLocationArrow } from "react-icons/fa";
import { Modal, Button } from 'antd';
import {uploadReply} from "../../../api/FireStoreAPI.jsx";

function CommentCard({comment, timeStamp, userName, imgURL}) {
  const [input, setInput] = useState("");
  const [show, setModalOpen] = useState(false);
  
  const hadleReply=()=>{
    uploadReply({input: input, imgURL:imgURL, })
  }

  return (
    <div className='comment-container'>
        <img className='userimg' src={imgURL || userImg} alt="userimage" />
        <h5 className='username'>{userName}</h5>
        <p className='timeStamp'>{timeStamp}</p>
       
        <div className='comment'>
          <p className='comment' >{comment}</p>
          <FaLocationArrow className='reply-btn' size={"20px"} onClick={()=>setModalOpen(!show)} style={{cursor:"pointer"}} />
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
                  onClick={hadleReply}
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
        </div>
    </div>
  )
}

export default CommentCard;

