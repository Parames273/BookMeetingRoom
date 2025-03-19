import { LazyExoticComponent } from "react";

export interface IRoute {
  path: string;
  component: LazyExoticComponent<React.FC>;
  protected: boolean;
}

export interface ErrorResponse {
  status: number;
  response: {
      data: {
          message: string;
      };
  };
}
export interface Credentials {
  email: string;
  password: string;
}

export interface ButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disableDefaultClasses?: boolean;
  disabled?: boolean;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface IRegister{
  name: string,
  email: string,
  phoneNumber: string,
  password: string,
  confirmPassword: string,
  gender: string,
  designation:string
}
 

export interface SearchBarProps {
    value: string;
    onChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
}