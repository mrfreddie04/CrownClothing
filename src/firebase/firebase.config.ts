//import firebase CORE
import { initializeApp } from "firebase/app";  

// import services we want to use
import { getAuth } from "firebase/auth";       //firestore authentication services

import { getFirestore } from "firebase/firestore";  //firestore database

// import { getStorage } from "firebase/storage";    //firebase storage

// connection credentials for Dojo app (configured as an app in DOjo backend project)
const firebaseConfig = {
  apiKey: "AIzaSyBlkyOJJIHWrXA_8ezJkV_cY2ajaREd7as",
  authDomain: "crown-clothing-5e7cb.firebaseapp.com",
  projectId: "crown-clothing-5e7cb",
  storageBucket: "crown-clothing-5e7cb.appspot.com",
  messagingSenderId: "188541522635",
  appId: "1:188541522635:web:6d1ade0dcb8e0aeac3814e"
};

// Initialize Firebase App - connects to firebase backend (in the cloud)
const app = initializeApp(firebaseConfig);

// Initialize Firebase services that we want to use
//Authentication
const auth = getAuth(app);
//Firestore Database
const db = getFirestore(app); 
// //Storage
// const storage = getStorage(app);

export {db, auth };