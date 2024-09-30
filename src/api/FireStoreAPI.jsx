import {firestore} from '../firebaseConfig';
import { 
    addDoc, 
    collection, 
    onSnapshot, 
    doc, 
    updateDoc,
    query, 
    where, 
    setDoc, 
    deleteDoc 
} from 'firebase/firestore';
import {toast} from "react-toastify";


let postRef = collection(firestore, "posts");
let userRef = collection(firestore, "users");
let likeRef = collection(firestore, "like");
let commentsRef = collection(firestore, "comments");
let connectionsRef = collection(firestore, "connections");
let notifRef = collection(firestore, "notifications");
let replyRef = collection(firestore, "reply");


export const uploadStatus =(object)=>{
    // let object = {
    //     status:status,
    // }
    addDoc(postRef, object)
    .then((res) => {
        toast.success('Document has been uploaded.');
    })
    .catch((err) =>{
        toast.error(err);
    })
}

export const getPosts = (setAllStatus) =>{
    onSnapshot(postRef, response =>{
        setAllStatus(response.docs.map((docs)=>{
            return {...docs.data(), id: docs.id}
        }))
        // console.log(response.docs.map((docs)=>{
        //     return {...docs.data(), id: docs.id}
        // }));
    })
}

export const getCurrentUser = (setCurrentUser) => {
    let currEmail = localStorage.getItem('userEmail');
    onSnapshot(userRef, response =>{
        setCurrentUser(response.docs.map((doc) =>{
            return {...doc.data(), userID: doc.id};
        }).filter((item) =>{
            return item.email === currEmail;
        })[0]
    );
    })
}

export const postUserData = (object) =>{
    addDoc(userRef, object)
        .then(() => {})
        .catch((err) =>{
            console.log(err);
        });
}

export const editProfile = (userID, payload) =>{
    let userToEdit = doc(userRef, userID);
    updateDoc(userToEdit, payload)
    .then((res) => {
        toast.success('Profile has been updated.');
    })
    .catch((err) =>{
        toast.error(err);
    })
}

export const getSingleStatus =(setAllStatus, id) =>{
    const singlePostQuery = query(postRef, where("userID", "==", id));
    onSnapshot(singlePostQuery, (response) =>{
        setAllStatus(response.docs.map((docs)=>{
            return {...docs.data(), id: docs.id}
        }))
    })
}

export const getSingleUser =(setCurrentUser, email) =>{
    const singlePostQuery = query(userRef, where("email", "==", email));
    onSnapshot(singlePostQuery, (response) =>{
        setCurrentUser(response.docs.map((docs)=>{
            return {...docs.data(), id: docs.id}
        }))
    })
}

export const likePost = (userID, postID, isLiked)=>{
    try{
        let key = `${userID}_${postID}`;
        let docToLike = doc(likeRef, key );
        if(isLiked){
            deleteDoc(docToLike);
        }else{
            setDoc(docToLike, {userID, postID});
        }
    }catch(e){
        return e;
    }
}

export const getLikePost =(userID, postID, setLiked, setLikedUsers)=>{
    try{
        let key = `${userID}_${postID}`;
        let likedQuery = query(likeRef, where('postID', '==', postID));
        onSnapshot(likedQuery, (response) =>{
            
            let likes = response.docs.map((docs)=>docs.data());
            let likeCnt = likes.length;
            const isLiked = likes.some((like)=>{
                return like.userID === userID;
            })
            setLikedUsers(likeCnt);
            setLiked(isLiked);
        })
    }catch(e){
        return e;
    }
}

export const postComment=(postID, comment, timeStamp, userName, imgURL)=>{
    try{
        addDoc(commentsRef, {postID, comment, timeStamp, userName, imgURL});
    }catch(e){
        return e;
    }
}

export const getComment=(postID, setComments)=>{
    try{
        let commentQuery = query(commentsRef, where('postID', '==', postID));
        onSnapshot(commentQuery, (response) =>{   
            let comments = response.docs.map((docs)=>docs.data());
            // console.log(comments)
            setComments(comments)
        })
    }catch(e){
        return e;
    }
}


export const getAllUsers = (setAllUsers)=>{
    onSnapshot(userRef, response =>{
        setAllUsers(response.docs.map((docs)=>{
            return {...docs.data(), id: docs.id}
        }))
    })
}

export const updatePosts =(id, status, postImgURL)=>{
    let postToEdit = doc(postRef, id);
    updateDoc(postToEdit, {status, postImgURL})
    .then((res) => {
        toast.success('Post has been updated.');
    })
    .catch((err) =>{
        toast.error(err);
    })
}

export const deletePost =(id)=>{
        let docToLike = doc(postRef, id);
        deleteDoc(docToLike)
        .then((res) => {
            toast.success('Post has been deleted.');
        })
        .catch((err) =>{
            toast.error(err);
        })
}

export const addConnection = (userID, targetID)=>{
    try{
        let key = `${userID}_${targetID}`;
        let docToConnection = doc(connectionsRef, key );
            setDoc(docToConnection, {userID, targetID});
            toast.success('Connection Added.');
    }catch(e){
        return e;
    }
}

export const getConnections =(userID, targetID, setConnection)=>{
    try{
        let key = `${userID}_${targetID}`;
        let connectionQuery = query(connectionsRef, where('targetID', '==', targetID));
        onSnapshot(connectionQuery, (response) =>{
            let connection = response.docs.map((docs)=>docs.data());
            // console.log(connection);
            let connectionCnt = connection.length;
            const isConnected = connection.some((connection)=>connection.userID === userID)
            // setConnection(connectionCnt);
            setConnection(isConnected);
        })
    }catch(e){
        return e;
    }
}

export const getUserImage =(userID, setImage)=>{
    try{
        let userQuery = query(userRef, where('userID', '==', userID));
        onSnapshot(userQuery, (response) =>{
            let data = response.docs.map((docs)=>docs.data());
            // console.log(connection);
           
            // setConnection(connectionCnt);
            setImage(isConnected);
        })
    }catch(e){
        return e;
    }
}

export const uploadReply =(object)=>{
    addDoc(replyRef, object)
    .then((res) => {
        toast.success('Replied...');
    })
    .catch((err) =>{
        toast.error(err);
    })
}

export const uploadNotif =(object)=>{
    // let object = {
    //     status:status,
    // }
    addDoc(notifRef, object)
    .then((res) => {
        toast.success('Notified...');
    })
    .catch((err) =>{
        toast.error(err);
    })
}

export const getNotif =(userID, setNotif)=>{
    try{
        let notifQuery = query(notifRef, where('userID', '==', userID));
        onSnapshot(notifQuery, (response) =>{
            let data = response.docs.map((docs)=>docs.data());
            setNotif(data);
        })
    }catch(e){
        return e;
    }
}