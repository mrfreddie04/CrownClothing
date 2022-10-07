import { useState } from "react";
import { createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword, signInWithGooglePopup } from "../../firebase/firebase.utils";
import { SignInData } from "../../models/signin.model";
import Button from "../button/button.component";
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

const SignInForm = () => {
  const [formFields, setFormFields] = useState<SignInData>(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => setFormFields(defaultFormFields);

  const signInWithGoogle = async () => {
    try {
      //setError("");
      const response = await signInWithGooglePopup();
      await createUserDocumentFromAuth(response.user);
      //const userDoc = 
    } catch(err: any) {
      //setError(err.message);
      console.log("Login failed: ", err.message);
    }
  }  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ email, password} );

    try {
      const userCredential = await signInAuthUserWithEmailAndPassword(email, password);
      
      if(!userCredential) throw new Error("Could not complete login");

      console.log(userCredential.user);
     
      resetFormFields();  
    } catch(err: any) {
      const errMsg = typeof err.code === "string" && err.code in errorMessage
        ? errorMessage[err.code as string]
        : err.message;      
      console.log("Login failed: ", errMsg);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormFields({...formFields, [name]: value});
  }

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with email and password</span>
      <form onSubmit={handleSubmit}>   
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
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>Google Sign In</Button>       
        </div>                   
      </form>
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