import { User } from 'firebase/auth';
import React, { createContext, Reducer, useEffect, useReducer } from 'react'
import { onAuthUserStateChanged } from '../firebase/firebase.utils';

interface Props {
  children: React.ReactNode;
}

type Action =  
  {type: "LOGIN"; payload: User;} | {type: "LOGOUT";};

interface State {
  user: User | null;
  isReady: boolean;
}

const authReducer: Reducer<State,Action> = (state: State, action: Action): State => {
  //console.log("dispatch", action);
  switch(action.type) {
    case "LOGIN":
      return {...state, user: action.payload, isReady: true};  
    case "LOGOUT":
      return {...state, user: null, isReady: true};  
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
  const [state, dispatch] = useReducer(authReducer, {user: null, isReady: false});

  useEffect(() => {
    //console.log("Register Observer")
    const unsub = onAuthUserStateChanged((user) =>{
      if(user) {
        dispatch({type: "LOGIN", payload: user});
      } 
      else if(!user) {
        dispatch({type: "LOGOUT"});
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
