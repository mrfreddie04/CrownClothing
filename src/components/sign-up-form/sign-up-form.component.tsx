import { useState } from "react";
import { createUserDocumentFromAuth, signUpAuthUserWithEmailAndPassword } from "../../firebase/firebase.utils";
import { SignUpData } from "../../models/signup.model";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-up-form.styles.scss";

const defaultFormFields: SignUpData = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: ""
}

const errorMessage: {[key:string]:string} = {
  "auth/email-already-in-use": "Email aready in use by another user",
  "auth/invalid-email": "Email address is invalid",
  "auth/weak-password": "Password is not strong enough"
}

const SignUpForm = () =>{
  const [formFields, setFormFields] = useState<SignUpData>(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  //const [error, setError] = useState<string>("");

  const resetFormFields = () => setFormFields(defaultFormFields);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //console.log({ displayName, email, password, confirmPassword } );
    if(password !== confirmPassword) {
      console.log("password & passwordConfirm do not match");
      return;
    }

    try {
      const userCredential = await signUpAuthUserWithEmailAndPassword(email, password);
      
      if(!userCredential) throw new Error("Failed to Register the user");
    
      const userDoc = await createUserDocumentFromAuth(userCredential.user, {displayName});
      console.log("User registered", userDoc);     
      resetFormFields();  
    } catch(err: any) {
      const errMsg = typeof err.code === "string" && err.code in errorMessage
        ? errorMessage[err.code as string]
        : err.message;      
      console.log("Failed to Register the user: ", errMsg);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormFields({...formFields, [name]: value});
  }

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput         
          label="Display Name"
          onChange={handleChange}
          value={displayName}
          name="displayName"
          type="text"
        />    
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
        <FormInput         
          label="Confirm Password"
          onChange={handleChange}
          value={confirmPassword}
          name="confirmPassword"
          type="password"
        />                      
        <Button type="submit">Sign Up</Button>          
      </form>
    </div>
  )
}

export default SignUpForm;