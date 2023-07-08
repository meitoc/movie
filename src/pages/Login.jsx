import * as React from 'react';
import { ContextStatus } from "../App";
import { createBrowserHistory } from "history";
import { AuthenCheck } from '../features/authentication/AuthenCheck';

export default function Login() {
  const {loginStatus} = React.useContext(ContextStatus);
  const history = createBrowserHistory();
  if(loginStatus!==true){
  return(<AuthenCheck></AuthenCheck>)
  } else{
    history.push("/");
    history.back();
  }
}