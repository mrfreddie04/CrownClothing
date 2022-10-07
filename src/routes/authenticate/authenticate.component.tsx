import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";

import "./authenticate.styles.scss";

export default function Authenticate() {
  return (
    <div className="authenticate-container">
      <SignInForm/>
      <SignUpForm/>
    </div>
  )
}
