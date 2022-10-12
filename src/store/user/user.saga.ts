import { takeLatest, all, call, put } from "redux-saga/effects";
import { UserActionType } from "./user.types";
import { signInSuccess, signInFailure, EmailSignInStart, EmailSignUpStart, SignUpSuccess, signOutSuccess, 
        signUpFailure, signOutFailure, signUpSuccess } from "./user.action"
import { getCurrentUser, createUserDocumentFromAuth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword, signUpAuthUserWithEmailAndPassword, updateAuthUserProfile, signOutAuthUser } from "../../firebase/firebase.utils";
import { User, UserCredential } from "firebase/auth";
import { UserData } from "../../models/user.model";

export function* getSnapshotFromUserAuth(userAuth: User, extra: {[key:string]:any} = {}): 
  Generator<any,void,UserData> 
{
  try {
    const userData = yield call(createUserDocumentFromAuth, userAuth, extra);
    console.log("User Data", userData);
    //if(!userData) return;
    yield put(signInSuccess(userData));    
  } catch(err) {
    yield put(signInFailure(err));
  }  
}

export function* fetchUserAuthStateAsync(): Generator<any,void,User | null> 
{
  try {
    const user = yield call(getCurrentUser);
    //console.log("Fetch Data", user);
    if(!user) {
      yield put(signOutSuccess());
    } else {
      yield call(getSnapshotFromUserAuth, user);        
    }
  } catch(err) {
    yield put(signInFailure(err));
  }
}

export function* signInWithGoogleAsync(): Generator<any,void,UserCredential>  {
  try {
    const { user } = yield call(signInWithGooglePopup);
    //console.log("Google", user);
    yield call(getSnapshotFromUserAuth,user);    
  } catch(err) {
    yield put(signInFailure(err));
  }
}

export function* signInWithEmailAsync({payload: {email, password}}: EmailSignInStart): 
  Generator<any,void,UserCredential>  {
  try {
    const userCredential = yield call(signInAuthUserWithEmailAndPassword, email, password);
    if(userCredential) {
      const { user } = userCredential;
      //console.log("Email", user);
      yield call(getSnapshotFromUserAuth,user);    
    }
  } catch(err) {
    yield put(signInFailure(err));
  }
}

export function* signUpWithEmailAsync({payload: {email, password, displayName}}: EmailSignUpStart): 
  Generator<any,void,UserCredential>  {
  try {
    const userCredential = yield call(signUpAuthUserWithEmailAndPassword, email, password);
    if(userCredential) {
      const { user } = userCredential;
      console.log("SignUp", user);
      yield call(updateAuthUserProfile,user,{displayName});
      yield put(signUpSuccess(user,{displayName}));
      // yield call(getSnapshotFromUserAuth,user);    
    }
  } catch(err) {
    yield put(signUpFailure(err));
  }
}

export function* signInAfterSignUpAsync({payload: {user, extra}}: SignUpSuccess) {
  try {
    yield call(getSnapshotFromUserAuth,user);        
  } catch(err) {
    yield put(signUpFailure(err));
  }
}

export function* signOutAsync() {
  try {
    yield call(signOutAuthUser);
    yield put(signOutSuccess());
  } catch(err) {
    yield put(signOutFailure(err));
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(UserActionType.GOOGLE_SIGN_IN_START, signInWithGoogleAsync); 
}

export function* onEmailSignInStart() {
  yield takeLatest(UserActionType.EMAIL_SIGN_IN_START, signInWithEmailAsync); 
}

export function* onEmailSignUpStart() {
  yield takeLatest(UserActionType.EMAIL_SIGN_UP_START, signUpWithEmailAsync); 
}

export function* onSignUpSuccess() {
  yield takeLatest(UserActionType.SIGN_UP_SUCCESS, signInAfterSignUpAsync); 
}

export function* onSignOutStart() {
  yield takeLatest(UserActionType.SIGN_OUT_START, signOutAsync); 
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionType.CHECK_USER_SESSION, fetchUserAuthStateAsync); 
}

export function* userSagas() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onEmailSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart)
  ]); 
}