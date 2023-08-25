import * as React from 'react';
import { Link } from 'react-router-dom';
import { ContextStatus } from "../App";
import { createBrowserHistory } from "history";

export default function Logout() {
    const { setLoginStatus, setLoginSession, setFavoriteData} = React.useContext(ContextStatus);
    const history = createBrowserHistory();
    React.useEffect(()=>{
        const requestLogout = async (session) => {
            const options = {
              method: 'GET',
              headers: {
                accept: 'application/json',
                'content-type': 'application/json',
              },
            };
            fetch(`https://movie.meitoc.net/redirect/9La81A3m223aawsQ/3/authentication/token/logout?token=${session}`, options)
            .then(response => response.json())
            .then(response => {
            console.log(response);
            if(response.status===true){
                localStorage.setItem('loginSession',undefined);
                console.log("Logged out.");
                // setServiceInfo(null);
                setLoginStatus(false);
                setLoginSession("");
                setFavoriteData([]);
            }
            })
            .catch(error => {
            console.log(error)
            console.log("Movie.meitoc.net: Check your internet connection!");
            })
          }
        
        requestLogout(localStorage.getItem('loginSession'));
        localStorage.setItem('loginSession',"");
        history.push("/");
        // history.back();
        window.location.reload();
    }
    ,[history,setLoginStatus,setLoginSession, setFavoriteData])
    
    return(<Link to={"/"}><p>Goto Home page</p></Link>);
    
}