import "./index.scss";
import React, {useState} from 'react'
import { editProfile } from "../../../api/FireStoreAPI";
function ProfileEdit({onEdit, currentUser}) {
  const [editInputs, setInputs] = useState(currentUser);
  const getInput =(event) =>{
    let {name, value} = event.target;
    let input = {[name] : value}
    setInputs({...editInputs, ...input});
  }

  const updateProfileData=async()=>{
    await editProfile(currentUser?.userID, editInputs);
    await onEdit();
  }
  return (
    <div className="profile-card">
      <div className='edit-btn'>
        <button onClick={onEdit}>Go Back</button>
      </div>
      <div className="profile-edit-inputs">
        <label>Name</label>
        <input 
          onChange={getInput} 
          className="common-input" 
          type="text" 
          placeholder="Name" 
          name="name" 
          value={editInputs.name}
        />
        <label>Headline</label>
        <input  
          value={editInputs.headline}
          onChange={getInput} 
          className="common-input" 
          type="text" 
          placeholder="Headline" 
          name="headline" />
        <label>Location</label>
        <input 
          value={editInputs.location}
          onChange={getInput} 
          className="common-input" 
          type="text" 
          placeholder="Location" 
          name="location" />
          <label>Company</label>
        <input 
          value={editInputs.company}
          onChange={getInput} 
          className="common-input" 
          type="text" 
          placeholder="Company" 
          name="company" />
          <label>College</label>
        <input 
          value={editInputs.college}
          onChange={getInput} 
          className="common-input" 
          type="text" 
          placeholder="College" 
          name="college" />    

        <label>About Me</label>
        <textarea 
        name="aboutme" 
        className="aboutme" 
        value={editInputs.aboutme}
        onChange={getInput} 
        placeholder="About Me..." 
        ></textarea>
        <label>Skills</label>
        <input 
          value={editInputs.skills}
          onChange={getInput} 
          className="common-input" 
          type="text" 
          placeholder="Skills" 
          name="skills" />    

        <label>Website</label>
        <input 
          value={editInputs.website}
          onChange={getInput} 
          className="common-input" 
          type="text" 
          placeholder="Website" 
          name="website" />    
      </div>
      <div className="save-container">
        <button className="login-btn" onClick={updateProfileData}>Save</button>
      </div>
      
    </div>
  )
}

export default ProfileEdit;