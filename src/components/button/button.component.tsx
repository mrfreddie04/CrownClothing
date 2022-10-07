import React from 'react'
import "./button.style.scss";

type Props = {
  children: React.ReactNode;
  buttonType?: "google" | "default" | "inverted";
} & {[key:string]:any};

const button_type_classes = {
  google: "google-sign-in",
  default: "",
  inverted: "inverted"
}

const Button = ({children, buttonType,...buttonOptions}: Props) => {
  return (
    <button 
      {...buttonOptions}
      className={`button-container ${button_type_classes[buttonType!]}`}
    >
      {children}
    </button>
  )
}

Button.defaultProps = {
  buttonType: "default"
};

export default Button;