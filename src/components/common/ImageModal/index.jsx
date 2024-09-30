import React, { useState } from 'react'
import { Button, Modal } from 'antd';
import "./index.scss";
import {Progress } from 'antd';

function ImageModal({modalOpen, setModalOpen, uploadImage, getImage,currentImage, progress}) {
  
  return (
    <div>
        <Modal
        title="Browse Image"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={[
            <Button 
            key="submit" 
            type='primary' 
            disabled = {!currentImage.name}
            onClick={uploadImage}
            >
                Upload
            </Button>
        ]}
      >
       <div className='input-container'>
        
        <label className='input-label' htmlFor="input-userimage">Add an Image</label>
        <p>{currentImage.name}</p>
          <input hidden id="input-userimage"
              type="file" 
              name="userimage" 
              onChange={getImage}
          />
          <div className='progress-bar' >
            {progress>0 && <Progress type="circle" size={70} percent={progress} />}
          </div>
       </div>
       
      </Modal>
    </div>
  )
}

export default ImageModal;