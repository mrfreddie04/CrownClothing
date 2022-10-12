import { useState } from "react";
import { useDispatch } from 'react-redux';
import { useAppSelector } from "../../hooks/useAppSelector";
//import { createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword, signInWithGooglePopup } from "../../firebase/firebase.utils";
import { SignInData } from "../../models/signin.model";
import { emailSignInStart, googleSignInStart } from "../../store/user/user.action";
import { selectUser } from "../../store/user/user.selector";
import Button, { ButtonTypes } from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import "./sign-in-form.styles.scss";

const defaultFormFields: SignInData = {
  email: "",
  password: ""
};

const errorMessage: {[key:string]:string} = {
  "auth/user-not-found": "User not found",
  "auth/invalid-email": "Invalid credentials",
  "auth/user-disabled": "User is disabled",
  "auth/wrong-password": "Invalid credentials"
}

const getError = (err: any) => {
  const errMsg = typeof err.code === "string" && err.code in errorMessage
    ? errorMessage[err.code as string]
    : err.message;      
  return `Login failed: ${errMsg}`;    
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState<SignInData>(defaultFormFields);
  const { email, password } = formFields;
  const dispatch = useDispatch();
  const { error } = useAppSelector(selectUser);

  //const resetFormFields = () => setFormFields(defaultFormFields);

  const signInWithGoogle = () => {
    dispatch(googleSignInStart());
    // try {
    //   //setError("");
    //   //await signInWithGooglePopup();
    //   const userCredential = await signInWithGooglePopup();
    //   const { user } = userCredential;
    //   await createUserDocumentFromAuth(user); //moved to the auth state change callback (observer)
    // } catch(err: any) {
    //   //setError(err.message);
    //   console.log("Login failed: ", err.message);
    // }
  }  

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //console.log({ email, password} );
    dispatch(emailSignInStart(email, password));
    //resetFormFields();  
    // try {
    //   const userCredential = await signInAuthUserWithEmailAndPassword(email, password);
      
    //   if(!userCredential) throw new Error("Could not complete login");

    //   //const { user } = userCredential;

    //   //setUser(user);

    //   //console.log(user);
     
    //   resetFormFields();  

    // } catch(err: any) {
    //   const errMsg = typeof err.code === "string" && err.code in errorMessage
    //     ? errorMessage[err.code as string]
    //     : err.message;      
    //   console.log("Login failed: ", errMsg);
    // }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormFields({...formFields, [name]: value});
  }

  //console.log("Sign In render");

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with email and password</span>
      <form onSubmit={handleSignIn}>   
        <FormInput         
          label="Email"
          onChange={handleChange}
          value={email}
          name="email"
          type="email"
        />        
        <FormInput         
          label="Password"
          onChange={handleChange}
          value={password}
          name="password"
          type="password"
        />   
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>     
          <Button type="button" buttonType={ButtonTypes.Google} onClick={signInWithGoogle}>Google Sign In</Button>       
        </div>                   
      </form>
      {error && <p>{getError(error)}</p>}
    </div>
  )
}

export default SignInForm;

// useEffect(() => {
//   const getLoginResult = async () => {
//     try {
//       const response = await getRedirectResult(auth);
//       if(response) {
//         const userDoc = await createUserDocumentFromAuth(response.user);
//         console.log("Signed In", userDoc);        
//       }
//     } catch(err) {
//       console.log("GoogleRedirect Error", err);
//     }
//   }
  
//   getLoginResult();
// },[])

// const logGoogleRedirect = () => {
//   signInWithGoogleRedirect();
// }