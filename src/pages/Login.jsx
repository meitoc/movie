import * as React from 'react';
import { Link } from 'react-router-dom';
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
    // history.back();
    window.location.reload();
    return(<Link to={"/"}><p>Goto Home page</p></Link>);
  }
}