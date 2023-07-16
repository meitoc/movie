import * as React from 'react';
import { Link } from 'react-router-dom';
import { ContextStatus } from "../App";
import { createBrowserHistory } from "history";
import axios from 'axios';

export default function Logout() {
    const { setLoginStatus, setLoginSession} = React.useContext(ContextStatus);
    const history = createBrowserHistory();
    React.useEffect(()=>{
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
                    // history.back();
                    window.location.reload();
                } else{
                    setLoginStatus(false);//new
                    setLoginSession("");
                    history.push("/");
                    // history.back();
                    window.location.reload();
                }
            })
            .catch(error => {
                console.log(error)
                setLoginStatus(false);//new
            });       
        }
        
        requestLogout(localStorage.getItem('loginSession'));
        history.push("/");
        // history.back();
        window.location.reload();
    }
    ,[history,setLoginStatus,setLoginSession])
    
    return(<Link to={"/"}><p>Goto Home page</p></Link>);
    
}