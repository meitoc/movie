import * as React from 'react';
import { ContextStatus } from "../App";
import { createBrowserHistory } from "history";
import axios from 'axios';

export default function Logout() {
    const { loginStatus,setLoginStatus, setLoginSession} = React.useContext(ContextStatus);
    const noticeLogout ="Wait....";
    const history = createBrowserHistory();
    const requestLogout = async (session) => {
        axios({
            method: 'get',
            baseURL: 'https://fakeapi.meitoc.net',
            url: `/api/logout?token=${session}`,
          }).then(response => {
            const data =  response.data;
            console.log(data);
            if(data.status==="loggedout"){
                localStorage.setItem('loginSession',"");
                setLoginStatus(false);
                setLoginSession("");
                history.push("/");
                history.back();
            } else{
                setLoginStatus(false);//new
                setLoginSession("");
                history.push("/");
                history.back();
            }
        })
        .catch(error => {
            console.log(error)
            setLoginStatus(false);//new
        });       
    }
    
    requestLogout(localStorage.getItem('loginSession'));
    if(loginStatus!==true){
        history.push("/");
        history.back();
    }
    return(<p>{noticeLogout}</p>);
    //Need fetching request that create new session code to server
    
}