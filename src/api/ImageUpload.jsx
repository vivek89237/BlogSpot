import { storage } from "../firebaseConfig";
import {ref, getDownloadURL, uploadBytesResumable} from "firebase/storage";
import { editProfile } from "./FireStoreAPI";

export const uploadImageAPI=(file, id, setProgress,setModalOpen, setCurrentImage)=>{
    const userProfileRef = ref(storage, `profileImages/${file.name}`);
    const uploadTask = uploadBytesResumable(userProfileRef, file);

    uploadTask.on(
        "state_changed", 
        (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes)*100)
            setProgress(progress);
        }, 
        (err) =>{
                console.error(err);
        }, 
        () =>{
            getDownloadURL(uploadTask.snapshot.ref)
            .then((response)=>{
                editProfile(id, {imgURL:response});
                setModalOpen(false);
                setProgress(0);
                setCurrentImage({});
            })
        }
    )
}

export const uploadPostImage=(file, setUploadedImage, setProgress)=>{
    const postImagesRef = ref(storage, `postImages/${file.name}`);
    const uploadTask = uploadBytesResumable(postImagesRef, file);

    uploadTask.on(
        "state_changed", 
        (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes)*100);
            setProgress(progress);
        }, 
        (err) =>{
                console.error(err);
        }, 
        () =>{
            getDownloadURL(uploadTask.snapshot.ref)
            .then((response)=>{
               //console.log(response);
               setUploadedImage(response);
               setProgress(0);
            })
        }
    )
}