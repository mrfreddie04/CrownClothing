import { auth, db } from "./firebase.config";

// import services we want to use
import { 
  signInWithPopup, 
  signInWithRedirect,
  GoogleAuthProvider, 
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged
} from "firebase/auth";       //firestore authentication services

import { 
  doc, getDoc, setDoc,
  collection, writeBatch,
  query, getDocs,
  Timestamp
} from "firebase/firestore";  //firestore database
import { UserData } from "../models/user.model";

//Custom functionality encapsulatin Firebase interface
//Authentication - via google
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account" //force user to select an account every time he logs in
});


//create a function that preconfigures signInWithPopup() with the closed on auth & provider
const signInWithGooglePopup = () => signInWithPopup(auth, provider);

const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

const signUpAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if(!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
}  

const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if(!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
}  

const signOutAuthUser = () => signOut(auth);

const updateAuthUserProfile = updateProfile;

const onAuthUserStateChanged = (callback: (user:User | null)=>void) => onAuthStateChanged(auth, callback);

const getCurrentUser = () => {
  return new Promise<User|null>((resolve,reject)=>{
    const unsub = onAuthStateChanged(auth,
      (user) => {
        unsub();
        //console.log("Get Current Data", user);
        resolve(user);
      },
      (err) => {
        unsub();
        reject(err);
      }
    )
  })
}

//create user document
const createUserDocumentFromAuth = async (user: User | null, extra: {[key:string]:any} = {}) => {
  if(!user) return null;

  const docRef = doc(db, "users", user.uid);
  let userSnapshot = await getDoc(docRef);
  
  if(!userSnapshot.exists()) {
    const userDocument = {
      displayName: user.displayName,
      email: user.email,
      createdAt: Timestamp.fromDate(new Date()),
      ...extra
    }
  
    try {
      await setDoc(docRef, userDocument);  
    } catch(err) {
      //console.log("Error creating the user", err);
      throw new Error("Error creating the user");
    }
    userSnapshot = await getDoc(docRef);
  }

  const userDoc = ({id: userSnapshot.id, ...userSnapshot.data()}) as UserData;

  return userDoc;
}

//bcp json into fb
const addCollectionAndDocuments = async <T extends {[key: string]: any}>(
    collectionKey: string, 
    objects: T[],
    getPath: (object: T) => string
  ) => {
  const colRef = collection(db, collectionKey);
  const batch = writeBatch(db); //instantiate batch class
  objects.forEach( object => {
    const docRef = doc(colRef, getPath(object)); //object.title.toLowerCase()
    batch.set(docRef, object);
  });
  batch.commit();
  console.log("done");
}

// const getCollectionAndDocumentsMap = async <T,K>(
//     collectionKey: string,
//     getPath: (object: T) => string,
//     getData: (object: T) => K
//   ) => {
//   const colRef = collection(db, collectionKey);
//   const q = query(colRef); //we need to convert colection reference to query to get a snapshop
//   const querySnapshot = await getDocs(q);
  
//   //get collection (array) of documents and reduce to object keyed by categories
//   const collectionMap = querySnapshot.docs.reduce<{[key: string]: K}>( (acc, doc) => {
//     const object = doc.data() as T;
//     acc[getPath(object)] = getData(object);
//     return acc;
//   },{});

//   return collectionMap;
// }

const getCollectionAndDocuments = async <T>(collectionKey: string) => 
{
  const colRef = collection(db, collectionKey);
  const q = query(colRef); //we need to convert colection reference to query to get a snapshop
  const querySnapshot = await getDocs(q);

  //await Promise.reject(new Error("Test error"));

  return querySnapshot.docs.map( doc => ({id: doc.id, ...doc.data()}) as T);
}

// const getCategoriesAndDocuments = async () => 
// {
//   const colRef = collection(db, "categories");
//   const q = query(colRef); //we need to convert colection reference to query to get a snapshop
//   const querySnapshot = await getDocs(q);

//   //await Promise.reject(new Error("Test error"));

//   return querySnapshot.docs.map( doc => ({id: doc.id, ...doc.data()}) as CategoryDoc);
// }

export { auth, db, Timestamp, 
  signUpAuthUserWithEmailAndPassword,
  signInAuthUserWithEmailAndPassword, 
  signOutAuthUser,
  updateAuthUserProfile,
  signInWithGooglePopup, 
  createUserDocumentFromAuth, 
  signInWithGoogleRedirect,
  onAuthUserStateChanged,
  addCollectionAndDocuments,
  getCollectionAndDocuments,
  getCurrentUser
  //getCategoriesAndDocuments
};