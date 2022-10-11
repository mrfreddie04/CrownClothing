import { User } from 'firebase/auth';
import React, { createContext, Reducer, useEffect, useReducer } from 'react'
import { onAuthUserStateChanged } from '../firebase/firebase.utils';

interface Props {
  children: React.ReactNode;
}

enum AuthActions {
  SET_CURRENT_USER = 'SET_CURRENT_USER'
};

type Action =  
  {type: AuthActions.SET_CURRENT_USER; payload: User |null;}

interface State {
  user: User | null;
  isReady: boolean;
}

const initial_state: State = {user: null, isReady: false};

const authReducer: Reducer<State,Action> = (state: State, action: Action): State => {
  //console.log("dispatch", action);
  switch(action.type) {
    case AuthActions.SET_CURRENT_USER:
      return {...state, user: action.payload, isReady: true};  
    default:
      throw new Error('Unhandled Auth action type');
      //return state; //or throw an error
  }
}

export interface AuthContextInterface {
  user: User | null;
  isReady: boolean;
  //dispatch: React.Dispatch<Action>
}

export const AuthContext = createContext<AuthContextInterface>(
  {user: null, isReady: false }
);

const AuthContextProvider = ({children}: Props) => {
  const [state, dispatch] = useReducer(authReducer, initial_state);

  useEffect(() => {
    //console.log("Register Observer")
    const unsub = onAuthUserStateChanged((user) =>{
      if(user) {
        dispatch({type: AuthActions.SET_CURRENT_USER, payload: user});
      } 
      else if(!user) {
        dispatch({type: AuthActions.SET_CURRENT_USER, payload: null});
      } 
    });

    return unsub;
  },[]);

  //{{...state, dispatch}}    
  //console.log("AuthContextProvider")  
  return (
    <AuthContext.Provider value = {state}> 
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider;
