import { User } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react'
import { onAuthUserStateChanged } from '../firebase/firebase.utils';

interface Props {
  children: React.ReactNode;
}

export interface AuthContextInterface {
  user: User | null;
  isReady: boolean;
  setUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContextInterface>(
  {user: null, isReady: false, setUser: (user: User | null) => {} }
);

const AuthContextProvider = ({children}: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    const unsub = onAuthUserStateChanged((user) =>{
      setUser(user);
      if(!isReady) setIsReady(true);
      //if(user) createUserDocumentFromAuth(user);
    });

    return unsub;
  },[isReady]);

  return (
    <AuthContext.Provider value = {{user, isReady, setUser}}>      
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider;
