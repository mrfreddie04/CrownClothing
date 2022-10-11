import { User } from 'firebase/auth';
import { UserActionType } from './user.types';

export type UserAction = {type: UserActionType.SET_CURRENT_USER; payload: User |null;}

export type UserState = {
  user: User | null;
  isReady: boolean;
}

const INITIAL_STATE: UserState = {user: null, isReady: false};

export const userReducer //: (state: UserState, action: UserAction) => UserState
      = (state: UserState = INITIAL_STATE, action: UserAction): UserState => {
  //console.log("dispatch user", action);
  switch(action.type) {
    case UserActionType.SET_CURRENT_USER:
      return {...state, user: action.payload, isReady: true};  
    default:
      return state;
  }
}