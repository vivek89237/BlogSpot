import './index.scss';
import { useEffect, useState } from 'react';
import { useMemo } from 'react';
import PostCard from '../PostCard/PostCard';
import { useLocation } from 'react-router-dom';
import {
  getPosts,
  editProfile,
  getSingleUser,
  getSingleStatus
} from '../../../api/FireStoreAPI';
import { RiPencilFill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { uploadImageAPI } from '../../../api/ImageUpload';
import ImageModal from "../ImageModal/index";


function index({ currentUser, onEdit }) {
  let location = useLocation();
  const [allStatus, setAllStatus] = useState([]);
  const [currentProfile, setCurrentProfile] = useState({});
  const [currentImage, setCurrentImage] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  const getImage = (e) => {
    setCurrentImage(e.target.files[0]);
  }

  const uploadImage = async () => {
    await uploadImageAPI(currentImage, currentUser?.userID, setProgress, setModalOpen, setCurrentImage);
    await setCurrentImage({})
  }
  // console.log(currentUser?.userID)
  useMemo(() => {
    if (location?.state?.id) {
      getSingleStatus(setAllStatus, location?.state?.id);
    }
    if (location?.state?.email) {
      getSingleUser(setCurrentProfile, location?.state?.email);
    }
    getPosts(setAllStatus);
  }, [])

  return (
    <>
      <div className='profile-card'>
      {modalOpen&&<ImageModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          uploadImage={uploadImage}
          getImage={getImage}
          currentImage={currentImage}
          progress={progress}
        />}
          <div className='image-container grid-item item1'>
            <div className='upload-icon'>
              <RiPencilFill size="30px" 
                onClick={() => setModalOpen(!modalOpen)} />
            </div>
            <img className='user-image' src={currentUser?.imgURL} alt="userimg" />
          </div>
          
          

          <div className='grid-item'>
            <h3 className='username'>
              {Object.values(currentProfile).length === 0 ?
                currentUser.name : currentProfile?.name}
            </h3>
          </div>

          <div className='grid-item'>
          <div className='edit-btn'>
            <FaEdit size={30} className="edit-icon" onClick={onEdit} />
          </div>
          </div>

          <div className='grid-item'>
            <p className='headline'>
              {Object.values(currentProfile).length === 0 ?
                currentUser.headline : currentProfile?.headline}
            </p>
          </div>
          <div className='grid-item'>
            <p className='skills'>
              {Object.values(currentProfile).length === 0 ?
                currentUser.skills : currentProfile?.skills}
            </p>
          </div>
          <div className='grid-item'>
            <p className='Country'>
              {Object.values(currentProfile).length === 0 ?
                currentUser.location : currentProfile?.location}
            </p>
          </div>
          <div className='grid-item'>
          <p className='company'>
            {Object.values(currentProfile).length === 0 ?
              currentUser.company : currentProfile?.company}
          </p>
        </div>

          <div className='grid-item'>
            <p className='aboutmecontainer'>
              {Object.values(currentProfile).length === 0 ?
                currentUser.aboutme : currentProfile?.aboutme}
            </p>
          </div>

        <div className='grid-item'>
          <p className='college'>
            {Object.values(currentProfile).length === 0 ?
              currentUser.college : currentProfile?.college}
          </p>
        </div>

        <div className='grid-item'>
            <a className="website" href={Object.values(currentProfile).length === 0 ?
              currentUser.website : currentProfile?.website}>Check my website here
            </a>
        </div>
      </div>
      <div className='main-post-container'>
        <div className='post-card-container'>
          {allStatus && allStatus.filter((item) => {
            return item.userEmail === localStorage.getItem("userEmail")
          }).map((p, index) => {
            return (
              <div key={index} >
                <PostCard post={p} />
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default index;