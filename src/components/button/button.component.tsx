import React from 'react'
import { KVP } from '../../models/general.model';

import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
  ButtonSpinner,
} from './button.styles';

export enum ButtonTypes {
  Inverted = "inverted",
  Google = "google",
  Base = "base"
}

const getButton = (buttonType:ButtonTypes = ButtonTypes.Base): typeof BaseButton =>
  ({
    [ButtonTypes.Base]: BaseButton,
    [ButtonTypes.Google]: GoogleSignInButton,
    [ButtonTypes.Inverted]: InvertedButton,
  }[buttonType]);

type Props = {
  children: React.ReactNode;
  buttonType?: ButtonTypes;
  isLoading?: boolean;
} & KVP;

const Button = ({children, buttonType, isLoading,...buttonOptions}: Props) => {
  const CustomButton = getButton(buttonType);
  return (
    <CustomButton disabled={isLoading} {...buttonOptions}>
      {isLoading ? <ButtonSpinner /> : children}
    </CustomButton>
  )
}

Button.defaultProps = {
  buttonType: ButtonTypes.Base,
  isLoading: false
};

export default Button;