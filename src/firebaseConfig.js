// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAElDHHc6LIf-ZqhTXzsEijQ1KspDddyE4",
  authDomain: "linkedinclone-351ed.firebaseapp.com",
  projectId: "linkedinclone-351ed",
  storageBucket: "linkedinclone-351ed.appspot.com",
  messagingSenderId: "724138616225",
  appId: "1:724138616225:web:cd3a97d7ad3d1cc47817e0",
  measurementId: "G-RFLLZES1D7"
};

// Initialize Firebase
// const analytics = getAnalytics(app);

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
export {auth, app, firestore, storage};