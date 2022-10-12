import { User } from 'firebase/auth';
import { KVP } from '../../models/general.model';
import { UserData } from '../../models/user.model';
import { UserActionType } from './user.types';

export type EmailSignInCredentials = {
  email: string;
  password: string;
}

export type EmailSignUpCredentials = {
  email: string;
  password: string;
  displayName: string;
}

export type UserAction = 
  {type: UserActionType.SET_CURRENT_USER; payload: UserData;} |
  {type: UserActionType.CHECK_USER_SESSION;} |
  {type: UserActionType.GOOGLE_SIGN_IN_START;} |
  {type: UserActionType.EMAIL_SIGN_IN_START; payload: EmailSignInCredentials;} |
  {type: UserActionType.EMAIL_SIGN_UP_START; payload: EmailSignUpCredentials;} |
  {type: UserActionType.SIGN_IN_SUCCESS; payload: UserData;} |
  {type: UserActionType.SIGN_IN_FAILURE; payload: any;} |
  {type: UserActionType.SIGN_UP_SUCCESS; payload: {user: User, extra: KVP};} |
  {type: UserActionType.SIGN_UP_FAILURE; payload: any;} |  
  {type: UserActionType.SIGN_OUT_SUCCESS;} |
  {type: UserActionType.SIGN_OUT_FAILURE; payload: any;} ;

export type UserState = {
  user: UserData | null;
  isReady: boolean;
  isLoading: boolean;
  error: any;
}

const USER_INITIAL_STATE: UserState = {
  user: null, 
  isReady: false,
  isLoading: false,
  error: null
};

export const userReducer //: (state: UserState, action: UserAction) => UserState
      = (state: UserState = USER_INITIAL_STATE, action: UserAction): UserState => {
  //console.log("dispatch user", action);
  switch(action.type) {
    case UserActionType.SIGN_IN_SUCCESS:
      return {...state, user: action.payload, isReady: true, isLoading: false, error: null};  
    case UserActionType.SIGN_OUT_SUCCESS:
      return {...state, user: null, isReady: true, isLoading: false, error: null};        
    case UserActionType.SIGN_IN_FAILURE:
    case UserActionType.SIGN_UP_FAILURE:
    case UserActionType.SIGN_OUT_FAILURE:
      //console.log("FAIL", action.payload);
      return {...state, user: null, isReady: true, isLoading: false, error: action.payload};       
    default:
      return state;
  }
}