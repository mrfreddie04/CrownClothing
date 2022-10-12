import { User } from "firebase/auth";
import { KVP } from "../../models/general.model";
import { UserData } from "../../models/user.model";
import { ActionWithPayload, createAction } from './../../utils/reducer.utils';
import { EmailSignInCredentials, EmailSignUpCredentials } from "./user.reducer";
import { UserActionType } from './user.types';

export type EmailSignInStart = ActionWithPayload<
  UserActionType.EMAIL_SIGN_IN_START,
  EmailSignInCredentials
>;

export type EmailSignUpStart = ActionWithPayload<
  UserActionType.EMAIL_SIGN_UP_START,
  EmailSignUpCredentials
>;

export type SignUpSuccess = ActionWithPayload<
  UserActionType.SIGN_UP_SUCCESS,
  {user: User, extra: KVP}
>;

// export type EmailSignInStart = {
//   type: UserActionType.EMAIL_SIGN_IN_START,
//   payload: { email: string; password: string }
// };

export const setCurrentUser = (user: UserData | null) => createAction(UserActionType.SET_CURRENT_USER, user);

export const checkUserSession = () => createAction(UserActionType.CHECK_USER_SESSION);

export const googleSignInStart = () => createAction(UserActionType.GOOGLE_SIGN_IN_START);

export const emailSignInStart = (email: string, password: string) => 
  createAction(UserActionType.EMAIL_SIGN_IN_START, {email, password});

export const emailSignUpStart = (email: string, password: string, displayName: string) => 
  createAction(UserActionType.EMAIL_SIGN_UP_START, {email, password, displayName});  

export const signInSuccess = (user: UserData ) => createAction(UserActionType.SIGN_IN_SUCCESS, user);

export const signInFailure = (error: any) => createAction(UserActionType.SIGN_IN_FAILURE, error);

export const signUpSuccess = (user: User, extra: KVP) => 
  createAction(UserActionType.SIGN_UP_SUCCESS, {user, extra});

export const signUpFailure = (error: any) => createAction(UserActionType.SIGN_UP_FAILURE, error);

export const signOutStart = () => createAction(UserActionType.SIGN_OUT_START);

export const signOutSuccess = () => createAction(UserActionType.SIGN_OUT_SUCCESS);

export const signOutFailure = (error: any) => createAction(UserActionType.SIGN_OUT_FAILURE, error);
