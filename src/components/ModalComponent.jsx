import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import '../Sass/ModalComponent.scss';
import { ImFilePicture } from "react-icons/im";
import {Progress } from 'antd';

const ModalComponent = ({
  status,
  setStatus,
  modalOpen,
  setModalOpen,
  sendStatus, 
  isEdit,
  updateStatus,
  uploadPostImage,
  setUploadedImage,
  postImgURL,
  currentPost,
  setCurrentPost

}) => {
  
  const [progress, setProgress] = useState(0);

  return (
    <>
      <Modal
       styles={{height: 150}}
        title={isEdit?"Update the post":"Create a post"}
        centered
        open={modalOpen}
        onOk={() => {
          setCurrentPost({})
          setModalOpen(false);
          setStatus("");
        }}
        onCancel={() => {
          setCurrentPost({})
          setModalOpen(false);
          setStatus("");
        }}
        footer={[
            <Button 
            key="submit" 
            type='primary' 
            disabled = {!status}
            onClick={isEdit ? updateStatus : sendStatus}
            >
                {isEdit?"Update":"Post"}
            </Button>
        ]}
      >
        <div className='contents-div'>
          <textarea style={{height:"150px"}} className='modal-input' type="text" 
              placeholder='What do u want to talk about' 
              value={status}
              onChange={(e) => (setStatus(e.target.value))}
          />
          {progress>0 && progress!==100  && <div className='progress-bar' >
            <Progress type="circle" size={70} percent={progress} />
          </div>}
          {postImgURL.length>0 || currentPost?.postImgURL && <img src={postImgURL || currentPost?.postImgURL} alt="postedImage" className='preview-image' />}
          <label htmlFor="post-image"><ImFilePicture htmlFor="post-image" className='picture-icon' size={30} /></label>
          <input hidden id="post-image" type="file" name="post-image" onChange={(e)=>uploadPostImage(e.target.files[0], setUploadedImage, setProgress)} />
        </div>
      </Modal>
    </>
  );
};

export default ModalComponent;