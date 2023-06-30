import * as React from 'react';
import { ContextStatus } from "../App";
import { createBrowserHistory } from "history";
export default function Logout() {
    const {setLoginStatus} = React.useContext(ContextStatus);
    const history = createBrowserHistory();
    localStorage.setItem('loginStatus',"false");
    setLoginStatus(false);
    //Need fetching request that create new session code to server
    history.push("/");
    history.back();
}